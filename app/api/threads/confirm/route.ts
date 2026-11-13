import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin");
    if (origin && origin !== new URL(req.url).origin) {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });

    const body = await req.json();
    const { threadId, decision } = body as { threadId?: string; decision?: "yes" | "no" };
    if (!threadId || !["yes", "no"].includes(decision ?? "")) {
      return NextResponse.json({ error: "Invalid thread or decision." }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data: thread, error: threadError } = await admin
      .from("threads")
      .select("*")
      .eq("id", threadId)
      .or(`user_a.eq.${user.id},user_b.eq.${user.id}`)
      .maybeSingle();

    if (threadError) throw threadError;
    if (!thread) return NextResponse.json({ error: "Thread not found." }, { status: 404 });
    if (thread.status !== "active") return NextResponse.json({ error: "This conversation has ended." }, { status: 409 });

    if (decision === "no") {
      const { error } = await admin.from("threads").update({ status: "ended" }).eq("id", thread.id);
      if (error) throw error;
      await admin.from("messages").insert({
        thread_id: thread.id,
        sender_id: user.id,
        content: "This connection has been closed.",
      });
      return NextResponse.json({ success: true, status: "ended" });
    }

    const isUserA = thread.user_a === user.id;
    const ownConfirmed = isUserA ? thread.user_a_confirmed : thread.user_b_confirmed;
    if (ownConfirmed) {
      return NextResponse.json({ success: true, day_count: thread.day_count, streak: thread.streak, status: thread.status, milestone: null });
    }

    const otherConfirmed = isUserA ? thread.user_b_confirmed : thread.user_a_confirmed;
    const update = isUserA ? { user_a_confirmed: true } : { user_b_confirmed: true };
    let dayCount = thread.day_count;
    let streak = thread.streak;
    let status = thread.status;
    let milestone: string | null = null;

    if (otherConfirmed) {
      dayCount += 1;
      streak += 1;
      if (dayCount >= 30) { status = "permanent"; milestone = "permanent"; }
      else if (dayCount >= 21) milestone = "social_hint";
      else if (dayCount >= 14) milestone = "full_cv";
      else if (dayCount >= 7) milestone = "first_name";
      Object.assign(update, { day_count: dayCount, streak, status, last_confirmed_date: new Date().toISOString().slice(0, 10) });
    }

    const { error: updateError } = await admin.from("threads").update(update).eq("id", thread.id);
    if (updateError) throw updateError;
    if (milestone) {
      const { error } = await admin.from("reveals").insert({ thread_id: thread.id, day: dayCount, reveal_type: milestone });
      if (error) throw error;
    }

    return NextResponse.json({ success: true, day_count: dayCount, streak, status, milestone });
  } catch (error) {
    console.error("Thread confirmation failed:", error);
    return NextResponse.json({ error: "We could not update this conversation. Please try again." }, { status: 500 });
  }
}
