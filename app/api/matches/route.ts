import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateDailyMatches } from "@/lib/match-engine";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized session." },
        { status: 401 }
      );
    }

    const matches = await generateDailyMatches(userId, createAdminClient());
    return NextResponse.json({ matches });
  } catch (err: unknown) {
    console.error("Could not load introductions:", err);
    return NextResponse.json({ error: "Introductions are temporarily unavailable." }, { status: 503 });
  }
}
