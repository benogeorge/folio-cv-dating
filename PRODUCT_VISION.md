# CV Dating — product vision

This document records the founder's product direction so future work stays aligned with it.

## The core idea

CV Dating is a global, inclusive connection app built around thoughtful introductions rather than swiping through photos. People share a CV and a little about what they want; the matching system uses their profile and intentions to find relevant people.

The product is for more than dating. People may be seeking a romantic relationship or marriage, friendship, community, language exchange, or another meaningful connection. People of every gender should be able to meet people of every gender. Users should be able to state their own intentions and preferences without the product imposing gender assumptions.

## Daily introductions

- The app selects four people for each user each day. Users do not browse a catalogue or choose the four themselves.
- The four introductions are assigned automatically. There is no swipe stack and no yes/no/pass gate before people can talk.
- People should be able to talk during the full 24-hour introduction period before moving into the longer 30-day path.
- The exact post-24-hour transition is still to be defined from the founder's design. Do not add a yes/no choice before the conversation starts.
- The longer-term concept includes a gradual 30-day connection path. Its milestones and consent rules need a coherent implementation before marketing them as live features.
- Never use fabricated sample people as real matches. When the community is too small, tell users honestly and offer an opt-in waitlist or invitation path.

## Matching and launch community

- Matching should consider CV-derived experience and skills, stated connection intent, language, location/time zone, interests, and preferences supplied by both people.
- Be transparent about how matching works. Do not call a rules-based score AI or claim it is scientifically validated without evidence.
- Build an international community across genders, with multiple languages and country-aware preferences, time zones, and reminders.
- Solve the cold-start problem honestly: launch a waitlist and referrals, seed one or a few language/city communities, and only promise daily introductions when there are enough suitable active members. Never pad the queue with fabricated profiles.

## Customizable AI companion

The founder wants an open-source, no-cost-to-users AI chat companion that feels personal. Users should be able to customize its name and avatar/photo, choose its tone and topics, and schedule supportive messages or reminders for chosen days and times. It should help users reflect, feel less alone, practice conversations or languages, and think through relationships.

This is an aspirational feature, not a claim that a model, clinical validation, provider, or operational safeguards are already in place. Market it as a supportive AI companion unless qualified clinical review and evidence justify stronger claims. It must not impersonate a therapist, diagnose, or claim proven medical outcomes. Design privacy controls, clear AI disclosure, user control over scheduled messages, crisis handling, and deletion/export before release. Evaluate open-source models for multilingual quality, safety, cost, latency, and privacy; “open source” does not automatically mean free to operate or safe.

## Business model direction

Keep the four daily introductions and mutual-consent rules fair. Do not sell extra introductions, paid ranking, or access to who passed. Potential revenue to validate: an optional subscription for companion customization and advanced reflection/language tools; paid events or community programs; and clearly optional profile feedback. Validate willingness to pay before presenting prices. Do not make retention or payment depend on loneliness, distress, or romantic outcomes.

## Marketing

Position the product around the core differentiators: CV-informed introductions, no swipe catalogue, four automatic introductions, a 24-hour conversation period, and connection beyond dating. Speak plainly to loneliness and the desire for meaningful connection without shaming users or promising a partner. Treat “therapy,” “medical,” “scientific,” and “clinically proven” as restricted claims requiring suitable evidence, review, and safeguards.

## Current implementation status — 8 November 2026

- The production domain points to Vercel and the custom domain returned HTTP 200 when tested directly against Vercel. Some local DNS resolvers may still cache the former parking address.
- The production sitemap lists the homepage and seven connection guides. Google Search Console accepted the sitemap; the new domain is not indexed yet. Sitemap acceptance is not indexing.
- The homepage and connection guide pages describe automatic introductions and the 24-hour conversation without a pre-chat vote. The matching code no longer inserts fictional fallback people.
- CV upload still does not parse the contents of a CV; matching must not be marketed as full CV understanding.
- Password sign-in and registration are being added. New registrations still need email confirmation, and the Supabase project has no custom SMTP host configured, so public email delivery must be configured before signup works reliably.
- The database still has a broad active-profile read policy. A security migration was prepared to remove public access to CV text, CV storage paths, exact coordinates, and preferences, and to expose limited profiles only to existing matches. **The migration has not been applied to production.**
- Secure server-side matching and thread mutations now require the server-only `SUPABASE_SERVICE_ROLE_KEY`; it is not currently configured in Vercel. Do not put it in a `NEXT_PUBLIC_` variable or share it in chat.
- Vercel Web Analytics code is being added. The project dashboard still needs Web Analytics enabled by an account owner before visitor data appears.
- The old subscription page advertised features and prices that were not implemented. It has been replaced with an honest “not available yet” page. Stripe checkout is not configured.
- Ads are not active. Ad network approval, publisher IDs, and appropriate consent controls are needed before serving ads. Keep ads out of chats and private profile views.
- Search appearance may take days or weeks after crawl requests, and Google does not guarantee indexing. Build useful pages and earn relevant links; do not use keyword stuffing or promise a ranking position.

