import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateDailyMatches } from "@/lib/match-engine";

export async function GET(req: NextRequest) {
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

    const matches = await generateDailyMatches(userId, supabase);
    return NextResponse.json({ matches });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error loading matches";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
