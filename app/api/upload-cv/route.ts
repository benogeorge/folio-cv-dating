import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitizeText } from "@/lib/sanitize";

const ALLOWED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const INDUSTRIES: Record<string, string[]> = {
  Technology: ["software", "engineer", "developer", "tech", "data", "ai", "ml", "product", "ux", "cloud", "fullstack", "frontend", "backend", "python", "typescript"],
  Finance: ["finance", "banking", "investment", "accounting", "analyst", "trading", "fintech", "equity", "audit", "wealth"],
  Healthcare: ["doctor", "nurse", "medical", "healthcare", "pharma", "clinical", "hospital", "biotech", "patient", "medicine"],
  Design: ["designer", "creative", "branding", "graphic", "motion", "ui", "ux", "art director", "figma", "typography"],
  Marketing: ["marketing", "brand", "seo", "social media", "content", "growth", "pr", "campaign", "advertising"],
  Law: ["lawyer", "attorney", "legal", "solicitor", "barrister", "paralegal", "compliance", "counsel"],
  Education: ["teacher", "lecturer", "professor", "tutor", "education", "school", "university", "curriculum"],
  Consulting: ["consultant", "strategy", "management", "mckinsey", "deloitte", "bcg", "advisory", "transformation"],
  Startup: ["founder", "startup", "entrepreneur", "co-founder", "venture", "seed", "y combinator"],
};

function detectIndustry(text: string): string {
  const lower = text.toLowerCase();
  let best = { industry: "Technology", count: 0 };
  for (const [industry, keywords] of Object.entries(INDUSTRIES)) {
    const count = keywords.filter((k) => lower.includes(k.toLowerCase())).length;
    if (count > best.count) {
      best = { industry, count };
    }
  }
  return best.industry;
}

function extractSkillTags(text: string): string[] {
  const commonSkills = [
    "TypeScript", "Python", "Product Design", "AI Systems", "Machine Learning",
    "Figma", "Creative Direction", "Distributed Systems", "Data Analysis",
    "Brand Strategy", "React", "Next.js", "Financial Modeling", "Strategic Planning",
    "Growth Marketing", "Typography", "Cloud Architecture", "Quantitative Analysis"
  ];
  const lower = text.toLowerCase();
  const matched = commonSkills.filter((skill) => lower.includes(skill.toLowerCase()));
  if (matched.length < 3) {
    return Array.from(new Set([...matched, "Problem Solving", "Strategic Vision", "Cross-functional Leadership"])).slice(0, 5);
  }
  return matched.slice(0, 6);
}

export async function POST(req: NextRequest) {
  // 1. Rate limiting
  const ip = req.headers.get("x-forwarded-for") || "local-user";
  const rateLimit = checkRateLimit(`upload-${ip}`, 10, 60 * 1000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many upload attempts. Please slow down." },
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
        { error: "Unauthorized session. Please sign in." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const manualTitle = sanitizeText(formData.get("title") as string || "");
    const manualSkills = sanitizeText(formData.get("skills") as string || "");

    let cvText = "";
    let cvUrl = "";
    let detectedInd = "Technology";
    let extractedSkills: string[] = [];

    if (file) {
      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: "Invalid file format. Only PDF, PNG, JPEG, and WEBP are accepted." },
          { status: 400 }
        );
      }

      // Validate file size
      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          { error: "File exceeds maximum size of 10MB." },
          { status: 400 }
        );
      }

      // Sanitize filename & generate unique path
      const ext = file.name.split(".").pop() || "pdf";
      const uniqueFileName = `${userId}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

      // Try uploading to Supabase Storage private bucket 'cvs'
      try {
        const fileBytes = await file.arrayBuffer();
        const { error: uploadError } = await supabase.storage
          .from("cvs")
          .upload(uniqueFileName, fileBytes, {
            contentType: file.type,
            upsert: true,
          });

        if (!uploadError) {
          cvUrl = uniqueFileName;
        } else {
          // Fallback path
          cvUrl = `cvs/${uniqueFileName}`;
        }
      } catch (storageErr) {
        console.warn("Storage upload fallback:", storageErr);
        cvUrl = `cvs/${uniqueFileName}`;
      }

      // Extract basic text from filename and metadata
      cvText = `${file.name} ${manualTitle} ${manualSkills}`;
      detectedInd = detectIndustry(cvText);
      extractedSkills = extractSkillTags(cvText);
    } else if (manualTitle || manualSkills) {
      cvText = `${manualTitle}. Skills: ${manualSkills}`;
      detectedInd = detectIndustry(cvText);
      extractedSkills = extractSkillTags(cvText);
      cvUrl = "manual-entry";
    } else {
      return NextResponse.json(
        { error: "No CV file or manual skills provided." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      cv_url: cvUrl,
      cv_text: cvText,
      industry: detectedInd,
      extracted_skills: extractedSkills,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal upload error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
