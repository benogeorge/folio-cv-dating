import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
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
    const { threadId, decision } = body as {
      threadId: string;
      decision: "yes" | "no";
    };

    if (!threadId || !["yes", "no"].includes(decision)) {
      return NextResponse.json(
        { error: "Invalid threadId or decision." },
        { status: 400 }
      );
    }

    // 1. Fetch thread
    const { data: thread } = await supabase
      .from("threads")
      .select("*")
      .eq("id", threadId)
      .maybeSingle();

    if (!thread && !isDemo) {
      return NextResponse.json({ error: "Thread not found." }, { status: 404 });
    }

    // 2. If decision is 'no', end thread gracefully
    if (decision === "no") {
      if (thread) {
        await supabase
          .from("threads")
          .update({ status: "ended" })
          .eq("id", threadId);

        // System exit message
        await supabase.from("messages").insert({
          thread_id: threadId,
          sender_id: userId,
          content: "Connection gracefully closed. Wishing you the best on your journey.",
        });
      }

      return NextResponse.json({
        success: true,
        status: "ended",
        message: "Thread closed with dignity.",
      });
    }

    // 3. User confirmed 'yes'
    const today = new Date().toISOString().split("T")[0];
    const isUserA = thread ? thread.user_a === userId : true;

    const currentDay = thread ? thread.day_count : 1;
    const newDayCount = currentDay + 1;
    const currentStreak = thread ? thread.streak : 1;
    const newStreak = currentStreak + 1;

    let unlockedMilestone: string | null = null;
    let newStatus: string = "active";

    // Check milestones
    if (newDayCount >= 30) {
      newStatus = "permanent";
      unlockedMilestone = "permanent";
    } else if (newDayCount >= 21) {
      unlockedMilestone = "social_hint";
    } else if (newDayCount >= 14) {
      unlockedMilestone = "full_cv";
    } else if (newDayCount >= 7) {
      unlockedMilestone = "first_name";
    }

    if (thread) {
      await supabase
        .from("threads")
        .update({
          day_count: newDayCount,
          streak: newStreak,
          status: newStatus,
          user_a_confirmed: true,
          user_b_confirmed: true,
          last_confirmed_date: today,
        })
        .eq("id", threadId);

      if (unlockedMilestone) {
        await supabase.from("reveals").insert({
          thread_id: threadId,
          day: newDayCount,
          reveal_type: unlockedMilestone,
        });
      }
    }

    return NextResponse.json({
      success: true,
      day_count: newDayCount,
      streak: newStreak,
      status: newStatus,
      milestone: unlockedMilestone,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error confirming thread";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
