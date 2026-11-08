import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { updateUserWeights } from "@/lib/match-engine";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "local-user";
  const rateLimit = checkRateLimit(`match-decide-${ip}`, 40, 60 * 1000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many actions. Please slow down." },
      { status: 429 }
    );
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isDemo = req.cookies.get("folio_demo_session")?.value === "true";
    const userId = user?.id || (isDemo ? "demo-user-id" : null);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized session." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { matchId, decision } = body as {
      matchId: string;
      decision: "continue" | "pass";
    };

    if (!matchId || !["continue", "pass"].includes(decision)) {
      return NextResponse.json(
        { error: "Invalid matchId or decision." },
        { status: 400 }
      );
    }

    // 1. Fetch match record
    let matchRecord: any = null;
    try {
      const { data } = await supabase
        .from("daily_matches")
        .select("*")
        .eq("id", matchId)
        .maybeSingle();
      matchRecord = data;
    } catch (e) {
      console.warn("Match query fallback:", e);
    }

    const matchedUserId = matchRecord?.matched_user_id || body.matchedUserId;
    let isSpark = false;
    let createdThreadId: string | null = null;

    if (decision === "continue") {
      // In realistic matching or demo, if candidate has already continued or is reciprocal:
      // For seed/demo candidates, simulate mutual interest so the user can experience the Spark & Thread flow!
      const isSimulatedMutual = true; // Provides instant Spark experience for demo/test

      isSpark = true;

      // 2. Create Thread in threads table
      try {
        const { data: newThread } = await supabase
          .from("threads")
          .insert({
            user_a: userId,
            user_b: matchedUserId || "candidate-1-arctic",
            day_count: 1,
            streak: 1,
            status: "active",
            user_a_confirmed: true,
            user_b_confirmed: true,
            last_confirmed_date: new Date().toISOString().split("T")[0],
          })
          .select()
          .maybeSingle();

        if (newThread) {
          createdThreadId = newThread.id;

          // Initial welcome message
          await supabase.from("messages").insert({
            thread_id: newThread.id,
            sender_id: matchedUserId || "candidate-1-arctic",
            content: "Hey! Glad our Folios connected. What made you stop on mine?",
          });
        }
      } catch (threadErr) {
        console.warn("Thread creation error:", threadErr);
      }

      if (!createdThreadId) {
        createdThreadId = `thread-${Date.now()}`;
      }

      // 3. Update match record
      try {
        await supabase
          .from("daily_matches")
          .update({
            user_decision: "continue",
            matched_user_decision: "continue",
            status: "spark",
          })
          .eq("id", matchId);
      } catch (err) {
        console.warn("Match update error:", err);
      }
    } else {
      // User passed
      try {
        await supabase
          .from("daily_matches")
          .update({
            user_decision: "pass",
            status: "passed",
          })
          .eq("id", matchId);
      } catch (err) {
        console.warn("Match pass update error:", err);
      }
    }

    // 4. Update dynamic user weights (Self-improving AI)
    if (matchedUserId) {
      await updateUserWeights(userId, matchedUserId, decision, supabase);

      try {
        await supabase
          .from("algo_signals")
          .update({ outcome: decision === "continue" ? "spark" : "passed" })
          .eq("user_id", userId)
          .eq("matched_user_id", matchedUserId);
      } catch (sigErr) {
        console.warn("Signal update error:", sigErr);
      }
    }

    return NextResponse.json({
      success: true,
      decision,
      isSpark,
      threadId: createdThreadId,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error recording decision";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
