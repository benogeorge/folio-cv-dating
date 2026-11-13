import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Guide = {
  slug: string
  title: string
  description: string
  h1: string
  intro: string
  sections: [string, string][]
  faq?: [string, string][]
  keywords?: string
}

const guides: Guide[] = [
  {
    slug: 'how-to-start-a-conversation-online',
    title: 'How to Start a Conversation Online (That Actually Gets a Reply) | CV Dating',
    description: 'Practical, tested ways to start an online conversation that feels natural and gets a real reply. No generic openers.',
    h1: 'How to start an online conversation that actually gets a reply.',
    keywords: 'how to start a conversation online, online chat openers, first message dating app',
    intro: 'The hardest part of online chat is the first message. Most people send something generic. The ones who get replies do one thing differently: they notice something specific and ask one easy question about it.',
    sections: [
      ['Reference one specific detail', 'Read their profile before you write anything. Pick one interest, language, goal, or prompt they shared and start there. "You mentioned you\'re learning Japanese — are you going for travel or just the language itself?" beats "Hey" every time.'],
      ['Ask one easy question, not five', 'A single open question is easier to answer than a paragraph with five questions. Give the other person a clear, comfortable entry point. If the conversation goes well, more questions will follow naturally.'],
      ['Don\'t perform — just be curious', 'You don\'t need a clever line. Genuine curiosity is more attractive than wit. If something they said made you think of a question, ask it. That\'s the whole trick.'],
      ['Respect no reply', 'A reply is never owed. Don\'t send follow-ups after one message. Don\'t take silence personally. Move on and trust that the people who do reply are more likely to be a good match.'],
      ['Match their energy', 'If they write three sentences, don\'t write three paragraphs. If they\'re playful, be playful. Mirroring someone\'s communication style makes the conversation feel balanced.'],
    ],
    faq: [
      ['What\'s the best opening message for a dating app?', 'The best opening message references something specific from their profile and ends with one easy question. Avoid "Hey", "How are you?", and compliments on appearance as openers.'],
      ['How do I start a conversation with a stranger online?', 'Start with something you have in common — a shared interest, language, or goal. Keep your first message short and end with a question that\'s easy to answer.'],
    ],
  },
  {
    slug: 'online-dating-without-swiping',
    title: 'Online Dating Without Swiping: Why It Works Better | CV Dating',
    description: 'Why no-swipe dating produces better conversations and more genuine connections. A practical guide to slow, intention-based online dating.',
    h1: 'Online dating without swiping: why it actually works better.',
    keywords: 'online dating without swiping, no swipe dating app, slow dating, intentional dating',
    intro: 'Swipe-based dating was designed to keep you on the app, not to help you find a relationship. No-swipe dating is built around a different goal: fewer introductions, more real conversation, and less time wasted on people who were never going to reply.',
    sections: [
      ['The swipe model is built for engagement, not connection', 'Dating apps that use swipe feeds make money from time spent in the app. The more you swipe, the more ads you see, the more premium features you\'re nudged to buy. The business model is not aligned with finding you a relationship quickly.'],
      ['Fewer introductions means more focus', 'When you receive up to four introductions a day instead of an unlimited feed, you actually read the profile. You think about the person. The conversation starts with more context and more genuine curiosity.'],
      ['Automatic introductions remove the gatekeeping', 'Swipe-based apps create a system where a small number of profiles get almost all the matches. No-swipe apps remove this hierarchy. Everyone receives introductions based on compatibility — not on who has the most attractive photo.'],
      ['The 24-hour window creates urgency and presence', 'When a conversation has a time limit, both people show up. You\'re more likely to ask a real question, get a real answer, and discover quickly whether there\'s something worth continuing.'],
      ['Who benefits most from no-swipe dating', 'People who are tired of swiping, people who don\'t photograph well but are interesting in conversation, people looking for something specific (language exchange, long-term relationship, friendship), and people in new cities who want structured introductions.'],
    ],
    faq: [
      ['What is slow dating?', 'Slow dating is an approach to online dating that prioritises fewer, better introductions over an endless stream of matches. It typically involves intention-setting, conversation-first design, and less gamification.'],
      ['Is CV Dating a no-swipe app?', 'Yes. CV Dating selects up to four introductions for you each day and opens a private chat automatically. There is no swipe feed or yes-or-no gate before the conversation begins.'],
    ],
  },
  {
    slug: 'make-friends-in-a-new-city',
    title: 'How to Make Friends in a New City as an Adult | CV Dating',
    description: 'Practical advice for making new friends after a move. How online introductions, shared interests, and low-pressure first chats can rebuild your social circle.',
    h1: 'How to make friends in a new city as an adult.',
    keywords: 'make friends in a new city, make adult friends online, new city friends, meet people after moving',
    intro: 'Making friends as an adult is genuinely hard. You lose the built-in social infrastructure of school or university, and most apps are designed for dating, not friendship. Here\'s how to actually build a social circle in a new place.',
    sections: [
      ['Be explicit about wanting friendship', 'The biggest barrier to adult friendship is that no one wants to seem desperate. So everyone acts casual and nothing progresses. Be direct: tell people you\'re new, you\'re looking for friends, and you\'d like to stay in touch. Most people respect honesty.'],
      ['Use online introductions to get past cold outreach', 'Walking up to strangers in a new city is hard. Online platforms that match people based on shared goals make the first step smaller. You already know the other person is open to meeting someone new.'],
      ['Start with something specific', 'Don\'t say "we should hang out sometime." Suggest something specific: a walk in a particular park, a coffee at a place you\'ve been meaning to try, a language exchange at a café. Specific plans are more likely to happen.'],
      ['Build consistency before depth', 'Adult friendships are built through repeated small interactions, not one long deep conversation. The goal isn\'t to find a best friend immediately — it\'s to find someone you enjoy talking to and see them regularly.'],
      ['Shared activities beat forced socialising', 'Join something with a recurring schedule: a running club, a language class, a book group, a climbing gym. Regular shared activities create the low-pressure repeated contact that friendships grow from.'],
    ],
    faq: [
      ['How do adults make friends online?', 'The most effective approaches are: using apps or platforms that match based on shared goals (not just location), being direct about wanting friendship, and following up with a specific plan rather than a vague "let\'s hang out."'],
      ['What app is best for making friends in a new city?', 'CV Dating supports friendship as a connection goal alongside dating and language exchange. You can set friendship as your intention and receive up to four daily introductions from adults with compatible goals.'],
    ],
  },
  {
    slug: 'safe-private-online-chat',
    title: 'Private Online Chat Safety: What to Know | CV Dating',
    description: 'Simple, practical advice for safer private online chat. How to protect your personal information, spot pressure, and stay in control.',
    h1: 'How to keep private online chat safer.',
    keywords: 'safe online chat, private chat safety, online dating safety tips, chat with strangers safely',
    intro: 'Online chat is how most relationships start now. But the same privacy that makes it easy to open up also makes it easy for people to misrepresent themselves or pressure you. Here\'s what to know before you share anything personal.',
    sections: [
      ['Keep sensitive details out of early conversations', 'Don\'t share your home address, workplace, full name, financial details, or identity documents in early chats. This applies even if the conversation feels warm. Trust is built over time, not in one chat.'],
      ['Spot the pressure patterns early', 'Be cautious if someone: pushes you to move off the platform quickly, asks for secrecy, escalates sexual content without consent, requests money or gift cards, or becomes hostile when you set a boundary. These are warning signs regardless of how genuine they seemed before.'],
      ['Codenames reduce exposure in early chats', 'Some platforms, including CV Dating, use codenames in introduction chats. This reduces what a stranger can find out about you in the first conversation and gives you more control over what you reveal and when.'],
      ['Meeting in person: basic protocol', 'If you decide to meet someone you met online, choose a public place, tell a friend or family member where you\'re going and who you\'re meeting, arrange your own transport, and keep the first meeting short and low-pressure.'],
      ['Trust your instincts', 'If something feels wrong, it probably is. You don\'t owe anyone a continued conversation. Block, report, and move on without explanation.'],
    ],
    faq: [
      ['What information should I never share in an online chat?', 'Never share: home address, workplace address, financial details, passwords, identity documents, or money with someone you met online, regardless of how well the conversation has gone.'],
      ['Is CV Dating a safe place to chat?', 'CV Dating uses codenames in introductions, requires an account to access chats, and is for adults 18+ only. No online service can guarantee safety — read the privacy information and use the safety tools available.'],
    ],
  },
  {
    slug: 'hellotalk-vs-cv-dating',
    title: 'HelloTalk vs CV Dating: Which Is Better for You? | CV Dating',
    description: 'HelloTalk vs CV Dating: a straight comparison. Language exchange, chat, dating, and friendship — which app does what, and which one is right for you?',
    h1: 'HelloTalk vs CV Dating: which one is right for you?',
    keywords: 'hellotalk alternative, hellotalk vs cv dating, language exchange dating app, chat and date online',
    intro: 'HelloTalk is built for language learning. CV Dating is built for connection — which includes language exchange, but also dating, friendship, and professional networking. Here\'s how they compare.',
    sections: [
      ['What HelloTalk does well', 'HelloTalk has a large user base of language learners, built-in translation tools, correction features, and a feed of posts from native speakers. If your primary goal is language practice and you want community features like moments and voice rooms, HelloTalk is strong.'],
      ['Where HelloTalk falls short', 'HelloTalk is a public platform. Your posts and profile are visible to many users. If you want private one-to-one introductions, dating, or the ability to combine language exchange with romantic connection, HelloTalk doesn\'t have the right design for that.'],
      ['What CV Dating does differently', 'CV Dating gives you automatic daily introductions based on your goals — including language exchange. The first chat is private, goal-based, and built around a 24-hour conversation window. You can set multiple goals: language exchange and dating, or language exchange and friendship. The same introduction can serve both.'],
      ['Who should use HelloTalk', 'People whose primary goal is language practice, who want community features, who don\'t mind a public-facing profile, and who want a large existing user base.'],
      ['Who should use CV Dating', 'People who want private introductions, who want to combine language exchange with dating or friendship, who prefer automatic matching over browsing, and who want a no-swipe experience.'],
    ],
    faq: [
      ['Can I use CV Dating just for language exchange?', 'Yes. Set language exchange as your connection goal and add your spoken and target languages. CV Dating will select introductions from adults with compatible language goals.'],
      ['Is CV Dating free like HelloTalk?', 'CV Dating is free to join and use for daily introductions and 24-hour chats. Some extended features may require a subscription.'],
    ],
  },
  {
    slug: 'best-apps-to-meet-people-online',
    title: 'Best Apps to Meet People Online in 2025 | CV Dating',
    description: 'The best apps to meet people online for dating, friendship, language exchange, and genuine connection. What each app does well and who it\'s right for.',
    h1: 'Best apps to meet people online in 2025.',
    keywords: 'best apps to meet people online, meet people online 2025, online chat apps, dating apps 2025',
    intro: 'There are hundreds of apps that claim to help you meet people. Most are built for engagement, not connection. Here\'s a straight assessment of what actually works, and for whom.',
    sections: [
      ['For dating: Hinge, Bumble, CV Dating', 'Hinge is the best of the mainstream swipe apps — it uses prompts and limits daily likes to reduce mindless swiping. Bumble gives women more control over first contact. CV Dating removes swiping entirely and uses automatic daily introductions with a 24-hour conversation window.'],
      ['For language exchange: HelloTalk, Tandem, CV Dating', 'HelloTalk and Tandem are built specifically for language learning, with correction tools and large communities. CV Dating combines language exchange with dating and friendship in one goal-based profile — useful if you want to combine language practice with genuine connection.'],
      ['For friendship: Bumble BFF, Meetup, CV Dating', 'Bumble BFF is designed for same-gender friendship. Meetup is built around shared activities and events. CV Dating supports friendship as a connection goal and gives you automatic introductions from adults who are also looking for friends.'],
      ['For professional connection: LinkedIn, CV Dating', 'LinkedIn is the standard for professional networking. CV Dating supports collaboration and mentorship as connection goals — useful if you want something between LinkedIn\'s formal tone and a social app.'],
      ['What to look for in any app', 'Goal alignment (does the app support what you\'re looking for?), privacy controls, the quality of the matching system, and whether the user base is active in your area.'],
    ],
    faq: [
      ['What is the best free app to meet people online?', 'CV Dating, Bumble, and HelloTalk all offer free core features. The best free app depends on your goal: dating, friendship, or language exchange.'],
      ['What app is good for meeting people for genuine friendship?', 'Bumble BFF, Meetup, and CV Dating (with friendship as your connection goal) are the strongest options for adult friendship in 2025.'],
    ],
  },
  {
    slug: 'why-swiping-doesnt-work',
    title: 'Why Swiping Doesn\'t Work (And What Does) | CV Dating',
    description: 'Why swipe-based dating apps produce bad outcomes for most users, and what the evidence says about better alternatives.',
    h1: 'Why swiping doesn\'t work, and what actually does.',
    keywords: 'why swiping doesnt work, problems with dating apps, swipe fatigue, slow dating',
    intro: 'Swipe-based dating apps are genuinely bad at their stated goal of helping people form relationships. Here\'s why — and what works better.',
    sections: [
      ['The attention economy problem', 'Dating apps make money by keeping you in the app, not by getting you into a relationship. The swipe mechanic is borrowed from slot machines: variable rewards keep people hooked. Every new face is a potential hit of dopamine, which keeps you swiping rather than committing to a conversation.'],
      ['The paradox of choice kills decisions', 'When you can swipe through hundreds of profiles in an hour, each individual person feels less important. The sense that there\'s always someone better one swipe away makes it harder to invest in any single conversation. This is a well-documented psychological effect called the paradox of choice.'],
      ['The photo problem', 'Swiping is 90% based on the first photo. This filters out huge numbers of interesting, compatible people who don\'t photograph well, and surfaces people who do. It is not a good proxy for compatibility, communication style, humour, or shared values.'],
      ['What actually works', 'Apps that use goal-based matching, limit daily interactions, start conversations automatically, and are designed to get you off the app and into a real relationship tend to produce better outcomes. This is the design philosophy behind CV Dating.'],
      ['The first message matters more than the match', 'Most matches on swipe apps never lead to a conversation. The first message is the real bottleneck. Apps that open conversations automatically — rather than requiring one person to initiate — produce higher conversation rates and better first interactions.'],
    ],
    faq: [
      ['Why do dating apps feel exhausting?', 'Swipe-based dating apps use variable reward mechanics that create compulsive usage patterns. The endless feed, the dopamine of a new match, and the disappointment of no reply create a cycle of exhaustion. Limiting daily introductions and using automatic conversation openers breaks this cycle.'],
      ['Is there a better alternative to Tinder?', 'CV Dating, Hinge, and Bumble all attempt to address different problems with Tinder\'s design. CV Dating goes furthest by removing swiping entirely and using automatic, goal-based daily introductions.'],
    ],
  },
  {
    slug: 'language-exchange-tips',
    title: 'Language Exchange Tips That Actually Work | CV Dating',
    description: 'Practical language exchange tips from people who\'ve actually done it. How to find partners, structure sessions, and make real progress.',
    h1: 'Language exchange tips that actually work.',
    keywords: 'language exchange tips, how to do a language exchange, language partner tips, language exchange online',
    intro: 'A language exchange sounds simple: two people who speak each other\'s target language take turns practising. In reality, most exchanges fall apart within a few sessions. Here\'s how to make them work.',
    sections: [
      ['Be specific about your goals from the start', 'Tell your partner exactly what you want from the exchange: casual conversation, travel vocabulary, formal writing, pronunciation, or cultural knowledge. Vague goals lead to unfocused sessions that don\'t feel useful for either person.'],
      ['Use a 50/50 time split', 'The most common failure of language exchanges is one language dominating. Set a timer. 30 minutes in Language A, 30 minutes in Language B. The person learning speaks more; the native speaker corrects and encourages.'],
      ['Correct kindly and consistently', 'Some partners are afraid to correct mistakes. Agree upfront that correction is welcome and wanted. A gentle correction mid-sentence ("actually, we usually say...") is more helpful than waiting until the end.'],
      ['Meet regularly, not intensively', 'One hour per week for three months beats five hours in one week and then nothing. Consistency beats intensity for language learning.'],
      ['Combine language exchange with friendship or dating', 'The best language practice happens in the context of a genuine relationship. When you care about the other person, you\'re more motivated to communicate well. CV Dating lets you set language exchange and dating or friendship as combined goals.'],
    ],
    faq: [
      ['What is the best way to find a language exchange partner?', 'The most effective methods are: apps that match by language goals (HelloTalk, Tandem, CV Dating), university language exchange programmes, and local conversation groups.'],
      ['How often should I do a language exchange?', 'Once or twice a week is ideal for most learners. Consistency matters more than duration. Even 30-minute weekly sessions produce meaningful progress over three to six months.'],
    ],
  },
  {
    slug: 'alternative-dating-apps-to-tinder',
    title: 'Best Tinder Alternatives in 2025 | CV Dating',
    description: 'The best Tinder alternatives in 2025 for dating, friendship, and language exchange. What each app does differently and who it\'s right for.',
    h1: 'The best Tinder alternatives in 2025.',
    keywords: 'tinder alternative, apps like tinder, dating apps like tinder, no swipe dating app',
    intro: 'Tinder works for some people. For most, it\'s an exhausting loop of swiping, ghosting, and matches that never become conversations. Here are the best alternatives — and what makes each one different.',
    sections: [
      ['Hinge: the best mainstream swipe alternative', 'Hinge limits daily likes, uses prompts instead of bios, and shows you profiles of friends-of-friends. It\'s still swipe-based but with more friction by design. Best for people who want a large user base with slightly better conversation quality.'],
      ['Bumble: women message first', 'Bumble requires women to send the first message in heterosexual matches. This reduces unwanted messages for women and tends to produce higher-quality openers. Also has BFF mode for friendship.'],
      ['Coffee Meets Bagel: quality over quantity', 'Coffee Meets Bagel sends a small number of "bagels" (matches) each day. Similar philosophy to CV Dating — fewer, better introductions. Smaller user base than Tinder.'],
      ['CV Dating: no swiping at all', 'CV Dating removes swiping entirely. You get up to four automatic daily introductions based on your goals — dating, friendship, language exchange — and a private 24-hour chat opens automatically. No photo-first decision, no swipe feed, no cold openers.'],
      ['Tandem/HelloTalk: if you want language exchange', 'If your primary interest is language exchange with a potential romantic connection as a bonus, HelloTalk and Tandem have large language-learning communities. CV Dating combines both in one goal-based profile.'],
    ],
    faq: [
      ['What is the best free Tinder alternative?', 'Bumble, Hinge (free tier), and CV Dating all offer free core features as Tinder alternatives. The best choice depends on what you\'re looking for: swiping with better design (Bumble/Hinge) or no swiping at all (CV Dating).'],
      ['Is there a Tinder alternative without swiping?', 'Yes. CV Dating is a no-swipe dating app that uses automatic daily introductions instead of a swipe feed. Coffee Meets Bagel also limits daily matches, though it still uses a swipe mechanic.'],
    ],
  },
  {
    slug: 'free-chat-apps-for-making-friends',
    title: 'Best Free Chat Apps for Making Friends Online | CV Dating',
    description: 'The best free chat apps for making friends online in 2025. What each app does well and which is right for genuine adult friendship.',
    h1: 'Best free chat apps for making friends online in 2025.',
    keywords: 'free chat apps, apps to make friends online, online chat apps, meet friends online free',
    intro: 'Most chat apps are either random (Omegle, Chatroulette) or social networks (Instagram, Discord). Finding something specifically designed to help adults make genuine friends is harder than it should be. Here\'s what actually works.',
    sections: [
      ['Discord: best for community and shared interests', 'Discord is excellent for finding communities around specific interests — gaming, anime, K-pop, language learning, fitness. The best way to make friends on Discord is to join active servers, participate regularly, and move promising conversations to DMs.'],
      ['Bumble BFF: designed specifically for friendship', 'Bumble BFF uses the same swipe mechanic as the dating version but filters for people explicitly looking for friends. User base skews younger and urban. Same-gender matching by default.'],
      ['Meetup: friendship through shared activities', 'Meetup connects people through local events and activities. If you\'re in a mid-to-large city, there are usually active groups for hiking, language exchange, board games, running, and more. The best way to make friends.'],
      ['CV Dating: for 1-to-1 introductions with shared goals', 'CV Dating supports friendship as a connection goal and gives you automatic daily introductions from adults who are also looking for friends. The private 24-hour chat format is good for 1-to-1 connection.'],
      ['Reddit: underrated for initial connection', 'Local subreddits (r/london, r/nyc) and interest subreddits often have friendship/meetup threads. It\'s unstructured but can lead to genuine connections, especially if you post authentically.'],
    ],
    faq: [
      ['What is the best free app to make friends as an adult?', 'Bumble BFF and Meetup are the strongest dedicated friendship apps. CV Dating is a good option if you want private 1-to-1 introductions rather than group activities.'],
      ['Is there a free chat app that isn\'t random?', 'CV Dating, Bumble BFF, and Hinge are all account-based chat apps that match based on goals or compatibility rather than random connection.'],
    ],
  },
  {
    slug: 'best-language-exchange-apps-2025',
    title: 'Best Language Exchange Apps in 2025 | CV Dating',
    description: 'The best language exchange apps in 2025 compared: HelloTalk, Tandem, Speaky, CV Dating. What each does well, who it\'s right for, and which is free.',
    h1: 'Best language exchange apps in 2025: a straight comparison.',
    keywords: 'best language exchange apps 2025, hellotalk vs tandem, language exchange app, language partner app',
    intro: 'Language exchange apps connect people who speak each other\'s target languages. They vary significantly in size, features, and design. Here\'s a straight comparison of the best options in 2025.',
    sections: [
      ['HelloTalk: largest community, most features', 'HelloTalk has the largest user base of any language exchange app. It includes a social feed (Moments), voice rooms, translation tools, and correction features. Best for people who want a large community and built-in learning tools. Free tier available; premium unlocks unlimited swaps.'],
      ['Tandem: quality partner matching', 'Tandem has a more curated user base than HelloTalk and focuses on 1-to-1 exchange rather than community features. Good for people who want structured language sessions. Paid tutors also available.'],
      ['Speaky: simple and free', 'Speaky is a simpler, free language exchange platform with less community noise than HelloTalk. Good for people who just want to find a conversation partner without a lot of features.'],
      ['CV Dating: language exchange + dating or friendship', 'CV Dating is the only app that combines language exchange with dating and friendship in one goal-based profile. If you want to practise a language and potentially develop a friendship or romantic connection with the same person, CV Dating is designed for that. Free to join.'],
      ['Which is right for you?', 'If you want a large community and learning tools: HelloTalk. If you want curated 1-to-1 exchange: Tandem. If you want simplicity and free: Speaky. If you want to combine language exchange with dating or friendship: CV Dating.'],
    ],
    faq: [
      ['Is HelloTalk free?', 'HelloTalk has a free tier with limited features and a paid premium subscription. Most core features including swapping with language partners are free.'],
      ['What is better than HelloTalk?', 'It depends on your goal. For pure language learning community features, HelloTalk is hard to beat. For combining language exchange with dating or friendship in a private, goal-based setting, CV Dating is a strong alternative.'],
    ],
  },
  {
    slug: 'how-cv-dating-works',
    title: 'How CV Dating Works: Your Complete Guide | CV Dating',
    description: 'A complete guide to how CV Dating works: profiles, daily introductions, 24-hour chats, connection goals, and what happens after the first conversation.',
    h1: 'How CV Dating works: everything you need to know.',
    keywords: 'how cv dating works, cv dating app guide, no swipe dating explained, automatic dating introductions',
    intro: 'CV Dating is a no-swipe introduction app for adults. Here\'s exactly how it works, from creating your profile to what happens after the first conversation.',
    sections: [
      ['Step 1: Create your profile', 'Sign up and build a profile that includes your connection goals (dating, friendship, language exchange, long-term relationship, collaboration, mentorship), your languages, your interests, and optionally your CV. Your CV can include work, education, projects, or anything that tells your story — but only share what you\'re comfortable with.'],
      ['Step 2: Receive daily introductions', 'Each day, CV Dating selects up to four introductions from available members with compatible goals. You don\'t browse or swipe — the introductions come to you. The number may be lower than four when there aren\'t enough compatible members available.'],
      ['Step 3: Chat for 24 hours', 'Your introduction opens a private chat using a codename. The chat is active for 24 hours. Use this time to ask questions, share interests, and get a sense of whether you want to continue. There\'s no swipe-to-match gate before the chat begins.'],
      ['Step 4: Decide what comes next', 'After 24 hours, you both decide whether to move into a longer connection. If you both want to continue, the conversation stays open. If not, it ends — no awkward rejection, just a natural close.'],
      ['Step 5: Build the connection', 'Connections that continue move into a longer chat with more space to share details, plan to meet, or develop a friendship or relationship at whatever pace feels right.'],
    ],
    faq: [
      ['How many matches do you get on CV Dating per day?', 'CV Dating selects up to four introductions per day from available members with compatible goals. The number may be lower depending on available members in your area.'],
      ['Is CV Dating free to use?', 'Yes. Creating a profile, receiving daily introductions, and accessing 24-hour chats are free. Some extended features may require a subscription.'],
      ['Do I have to upload a CV to use CV Dating?', 'No. A CV is optional. You can build a profile using interests, goals, languages, and prompts without uploading a CV document.'],
    ],
  },
  {
    slug: 'anime-dating-tips',
    title: 'Anime Dating Tips: Meet Anime Fans for Real Connection | CV Dating',
    description: 'How to meet anime fans online for dating, friendship, and genuine conversation. Tips for anime fans looking for connection beyond the fandom.',
    h1: 'Anime dating: how to meet anime fans for real connection.',
    keywords: 'anime dating, meet anime fans online, anime dating app, anime fans dating',
    intro: 'Anime is one of the most popular fandoms in the world. But being an anime fan doesn\'t automatically make conversation easy. Here\'s how to use shared interest as a starting point for real connection.',
    sections: [
      ['Shared fandom is a starting point, not a relationship', 'Liking the same anime creates an easy first conversation, but it doesn\'t mean you\'re compatible. Use shared interest to get the conversation started, then explore whether your values, communication styles, and goals are actually compatible.'],
      ['Be specific about what you enjoy', 'Don\'t just say "I like anime." Say which genres, studios, directors, or titles you love — and why. Specificity is more interesting than general enthusiasm and helps the other person understand who you actually are.'],
      ['Anime + language exchange is a natural combination', 'Many anime fans are learning Japanese. If you\'re one of them, combining anime interest with language exchange is a natural way to connect. CV Dating lets you set both as goals in your profile.'],
      ['Find people who match your connection goal', 'Some anime fans want friendship. Some want dating. Some want someone to watch shows with over Discord. Be clear about what you\'re looking for so you connect with people who want the same thing.'],
      ['Look beyond dedicated anime apps', 'Apps built specifically for anime fans are often small and inactive. Broader platforms with interest-based matching — like CV Dating — often have more active users who also happen to be anime fans.'],
    ],
    faq: [
      ['Is there a dating app for anime fans?', 'CV Dating supports anime and manga fans as a community interest in its matching. You can add anime as an interest and find other adults who share it. There\'s no swipe feed — you receive automatic daily introductions based on shared goals.'],
      ['How do I meet anime fans for dating?', 'The most reliable approaches are: interest-based apps (CV Dating, Hinge with detailed prompts), anime Discord servers with friendship/dating channels, and local anime clubs or conventions.'],
    ],
  },
  {
    slug: 'kpop-fan-community-online',
    title: 'K-pop Fan Community Online: Meet, Chat & Connect | CV Dating',
    description: 'How to meet other K-pop fans online for friendship, language exchange, and dating. Where to find the K-pop community and how to build real connections.',
    h1: 'How to meet K-pop fans online for real connection.',
    keywords: 'kpop fans online, meet kpop fans, kpop community online, kpop dating',
    intro: 'The K-pop community is global, passionate, and very online. Finding other fans is easy. Building real friendships or romantic connections is harder. Here\'s how to do it.',
    sections: [
      ['Where the K-pop community lives online', 'Twitter/X (fan accounts, stan Twitter), Reddit (r/kpop and artist-specific subreddits), Discord servers, Weverse (the official fan community platform), and TikTok (fan edits, commentary, dance covers). These are all community spaces — not designed for 1-to-1 connection.'],
      ['K-pop + Korean language exchange', 'Many K-pop fans are learning or want to learn Korean. This is a natural bridge to language exchange — finding a Korean speaker who wants to chat about K-pop and practise Korean together. CV Dating supports both as combined goals.'],
      ['Moving from fan to friendship', 'The gap between being mutuals on Twitter and being actual friends is significant. The step that closes it: moving to DMs, then to a voice/video call or platform where you can have a real conversation. CV Dating\'s private introduction chat is designed for this kind of 1-to-1 connection.'],
      ['K-pop fans and international dating', 'The K-pop community is genuinely international. Korean fans, Japanese fans, Southeast Asian fans, European fans, American fans — there\'s no geographic limit. This makes it a natural community for international dating and friendship.'],
      ['Be clear about what you want', 'Some K-pop fans want friends to share their enthusiasm. Some want to learn Korean. Some want to date someone who shares their interests. CV Dating lets you set your goal specifically so your introductions match what you\'re looking for.'],
    ],
    faq: [
      ['Is there an app for K-pop fans to meet?', 'CV Dating supports K-pop fans as a community interest. You can set K-pop as an interest and find other adults who share it, with automatic daily introductions based on shared connection goals.'],
      ['How do I meet Korean speakers as a K-pop fan?', 'Set Korean language exchange and K-pop as interests in your CV Dating profile. You\'ll be introduced to compatible adults — including Korean speakers who want language exchange.'],
    ],
  },
  {
    slug: 'how-to-make-online-friends-as-an-adult',
    title: 'How to Make Online Friends as an Adult | CV Dating',
    description: 'A practical guide to making real online friends as an adult. Where to find people, how to move from chat to friendship, and what actually works.',
    h1: 'How to make online friends as an adult (that actually stick).',
    keywords: 'make online friends as adult, how to make friends online, online friendship apps, meet people online for friendship',
    intro: 'Making online friends as an adult is different from making friends at school. There\'s no built-in repeated contact, no shared institution, and most adults are too busy to invest in friendships that feel uncertain. Here\'s what actually works.',
    sections: [
      ['Find somewhere with repeated contact built in', 'The secret to adult friendship is repeated contact. Online communities with regular activity — Discord servers with weekly events, online book clubs, language exchange sessions — give you the structure that school used to provide.'],
      ['Start with shared interest, not just location', 'Adult online friendships often cross geography. Start with something you care about — a hobby, a language, a show, a problem you\'re working on — and find others who share it. Interest is a stronger foundation than proximity for online friendships.'],
      ['Don\'t wait for the other person to follow up', 'The most common reason online friendships die is that neither person follows up after a good initial conversation. Set a reminder. Suggest a specific time for a follow-up call or chat. Treat new online friends the same way you\'d treat a new colleague you wanted to build a relationship with.'],
      ['Use 1-to-1 chat rather than groups for depth', 'Group chats and servers are great for community. For genuine friendship, you need 1-to-1 conversation. Move promising connections out of group settings into direct messages or a dedicated channel.'],
      ['Be honest that you\'re looking for friendship', 'Saying you\'re looking for friends feels vulnerable. Do it anyway. Adults who are honest about wanting connection tend to find it more quickly than those who hope friendship will develop organically.'],
    ],
    faq: [
      ['What is the best way to make friends online as an adult?', 'The most reliable approach: find communities built around shared interests with regular activity (Discord, Meetup, language exchange apps), invest in 1-to-1 conversations with people you click with, and follow up consistently.'],
      ['Can you make real friends through dating apps?', 'Yes, though it requires setting a clear friendship goal. CV Dating supports friendship as a connection goal alongside dating. Many users find that the conversation-first design is well suited to making genuine friends.'],
    ],
  },
  {
    slug: 'conversation-starters-for-dating-apps',
    title: 'Conversation Starters for Dating Apps That Actually Work | CV Dating',
    description: '50+ conversation starters for dating apps that get real replies. What to say, what to avoid, and how to keep the conversation going.',
    h1: 'Conversation starters for dating apps that actually get replies.',
    keywords: 'conversation starters dating apps, first message dating app, what to say on dating apps, online dating openers',
    intro: 'The wrong opener kills a conversation before it starts. The right one makes the other person want to respond. Here\'s what works — and what to avoid.',
    sections: [
      ['What works: specific, curious, easy to answer', '"Your photo from [location] — did you live there or just visit?" works. "Hey, how are you?" doesn\'t. The formula is: reference something specific from their profile + ask one easy question.'],
      ['What doesn\'t work: generic, compliment-heavy, long', '"You\'re so beautiful, tell me about yourself" is lazy and uncomfortable. A three-paragraph opener is too much pressure. Generic openers (Hey, What\'s up, How was your weekend?) show no effort and get no response.'],
      ['Starters for shared interests', '"I saw you\'re into [interest] — I\'ve been getting into it recently. What got you started?" / "You mentioned [book/show] — that\'s one of my favourites. What did you think of [specific detail]?"'],
      ['Starters for language exchange', '"I noticed you\'re learning [language] — I\'ve been studying it for [time]. Are you going for fluency or just conversational?" / "Your English is really good — where did you learn it?"'],
      ['Starters for friendship-first', '"I\'m new to [city] and trying to actually meet people rather than just follow accounts. What do you like doing here?" / "I\'m looking for friends with similar interests — your profile mentions [interest], which is something I spend a lot of time on."'],
    ],
    faq: [
      ['What should I say first on a dating app?', 'Reference one specific thing from their profile and ask one easy question. Keep it short — two to three sentences maximum. Don\'t compliment their appearance as your opener.'],
      ['What is the best opening line for online dating?', 'There is no single best opening line. The most effective openers are personalised, specific, and genuinely curious. A template opener copied from a list performs worse than a genuine question about something they actually shared.'],
    ],
  },
  {
    slug: 'online-dating-safety-tips',
    title: 'Online Dating Safety Tips: Protect Yourself | CV Dating',
    description: 'Essential online dating safety tips for 2025. How to protect your personal information, spot scams, and stay safe meeting people online.',
    h1: 'Online dating safety tips for 2025.',
    keywords: 'online dating safety tips, dating app safety, how to stay safe online dating, online dating scams',
    intro: 'Online dating is how most relationships start now. Most experiences are fine. Some are not. Here\'s what to know to protect yourself — without being paranoid about it.',
    sections: [
      ['Never share financial information', 'No legitimate connection will ask for money, gift cards, cryptocurrency, or bank details. Romance scams are sophisticated and common. If someone you met online asks for financial help for any reason — family emergency, travel costs, medical bills — stop the conversation and report them.'],
      ['Keep your first few conversations on the platform', 'Moving off-platform too quickly (to WhatsApp, Telegram, or email) reduces your safety protections and reporting options. Take your time. A genuine person will not pressure you to move quickly.'],
      ['Reverse image search profile photos', 'If something feels off, right-click any profile photo and search by image (or use Google Lens). Scammers often use stolen photos. A photo that appears on multiple profiles or stock image sites is a red flag.'],
      ['Video call before meeting in person', 'A short video call before a first in-person meeting confirms the person looks like their photos and reduces the chance of a catfish scenario. If someone repeatedly avoids video calls, treat that as a warning sign.'],
      ['First meeting: public place, your own transport, tell a friend', 'Meet in a busy public place. Arrange your own way to get there and home. Tell a friend where you\'re going, who you\'re meeting, and check in with them during or after. Keep the first meeting short and low-pressure.'],
    ],
    faq: [
      ['How do I know if someone on a dating app is genuine?', 'Signs of a genuine person: consistent story, willing to video call, doesn\'t rush you off-platform, doesn\'t ask for money or personal details early. Signs of a scammer: too good to be true, escalates quickly, eventually asks for money.'],
      ['What are the most common online dating scams?', 'The most common scams are romance scams (building a connection and then asking for money), catfishing (pretending to be someone else), and sextortion (requesting compromising photos and then threatening to share them).'],
    ],
  },
  {
    slug: 'long-distance-relationship-tips',
    title: 'Long Distance Relationship Tips That Actually Work | CV Dating',
    description: 'Practical long-distance relationship tips from people who\'ve made it work. Communication, visits, managing time zones, and when to close the gap.',
    h1: 'Long-distance relationship tips that actually work.',
    keywords: 'long distance relationship tips, how to make long distance work, long distance dating tips, international relationship',
    intro: 'Long-distance relationships are hard. They\'re also increasingly common, especially for couples who met online or who live across borders. Here\'s what actually makes them work — and what tends to end them.',
    sections: [
      ['Agree on communication frequency early', 'One of the most common sources of LDR tension is mismatched expectations about how often you\'ll talk. Have an explicit conversation: how often, through which channel, for how long. Daily voice notes might work better for one person; weekly video calls for another.'],
      ['Make visits count, not just frequent', 'More visits is not always better. A well-planned visit where you have shared experiences, some downtime, and genuine quality time is more valuable than frequent but rushed visits. Plan activities, but leave space for the ordinary.'],
      ['Have the gap-closing conversation early', 'Long-distance only works if there\'s a plan to eventually close the distance. This doesn\'t have to happen immediately, but you need to know that both people want the same future. Avoid indefinitely postponing this conversation.'],
      ['Build a shared life across distance', 'Watch things together, play games, cook the same recipe on video, send each other physical things. Shared experiences — even remote ones — build a sense of shared life that makes the distance more manageable.'],
      ['Know when it\'s not working', 'LDRs fail when: the gap-closing conversation never happens, one person is more invested than the other, the visits are becoming less frequent rather than more, or the relationship only exists in the online space with no plan to bring it into shared physical life.'],
    ],
    faq: [
      ['How do long-distance relationships start online?', 'Many long-distance relationships start through dating apps, language exchange platforms, or online communities built around shared interests. CV Dating supports international introductions and language exchange alongside dating goals.'],
      ['Can a long-distance relationship work if you\'ve never met?', 'It\'s possible, but significantly harder. The earlier you meet in person, the better. Plan a first meeting as soon as it\'s practical.'],
    ],
  },
  {
    slug: 'how-to-meet-people-in-a-new-country',
    title: 'How to Meet People in a New Country | CV Dating',
    description: 'How to build a social circle, find friendship, and start dating in a new country. Practical advice for expats, students, and international movers.',
    h1: 'How to meet people in a new country.',
    keywords: 'how to meet people in a new country, expat dating, make friends abroad, meet people abroad',
    intro: 'Moving to a new country resets almost everything socially. Language barriers, cultural differences, and not knowing anyone make connection harder. Here\'s how to actually build a life in a new place.',
    sections: [
      ['Language exchange is a social superpower abroad', 'If you\'re learning the local language, language exchange connects you with local people who want to practise your language. This is one of the most effective ways to build genuine local friendships and understand the culture from the inside.'],
      ['Expat communities: easy entry, limited depth', 'Expat bars, Facebook groups, and Internations events are easy entry points and useful for logistics (recommendations, housing, admin). But expat communities can become bubbles. Aim to build friendships with both expats and locals.'],
      ['Online platforms that work across borders', 'CV Dating, HelloTalk, and Meetup all support international users. CV Dating lets you meet people for language exchange, friendship, and dating with one profile — useful when you\'re new and don\'t know what you need yet.'],
      ['Shared activities first, relationships second', 'Join something recurring: a language class, a gym, a volunteer group, a sports team. Repeated contact in a shared activity context is how most adult friendships form across cultures.'],
      ['Be patient with cultural differences in friendship', 'Friendship norms vary significantly across cultures. In some cultures, friendships form slowly and involve a lot of group activity before 1-to-1 connection. In others, one-on-one is the norm from early on. Observe and adapt rather than assuming your norms are universal.'],
    ],
    faq: [
      ['What is the best app for expats to meet people?', 'CV Dating, Meetup, and Bumble BFF are the strongest options for expats. CV Dating is useful because it combines dating, friendship, and language exchange in one goal-based profile.'],
      ['How do I make local friends in a new country?', 'The most reliable approaches: language exchange (you get access to local people who actively want to meet foreigners), regular shared activities (sports, classes, volunteering), and online platforms with goal-based matching.'],
    ],
  },
  {
    slug: 'how-to-write-a-dating-profile',
    title: 'How to Write a Dating Profile That Gets Responses | CV Dating',
    description: 'How to write a dating profile that actually attracts the right people. What to include, what to avoid, and how to show who you really are.',
    h1: 'How to write a dating profile that gets real responses.',
    keywords: 'how to write a dating profile, dating profile tips, dating app bio, good dating profile examples',
    intro: 'Most dating profiles are either generic ("I love travelling, food, and my dog") or trying too hard. The goal is to give someone enough to be genuinely curious — not to appeal to everyone.',
    sections: [
      ['Be specific, not universal', '"I love travelling" tells no one anything. "I spent three months in Oaxaca learning to make mole from scratch and I\'m still thinking about it" tells someone a lot about who you are. Specific details are more memorable and more attractive.'],
      ['Show, don\'t list', 'Don\'t list adjectives: "fun, adventurous, loyal, ambitious." Show one or two things that demonstrate who you are and let the reader draw their own conclusions.'],
      ['Be clear about your connection goal', 'Whether you want dating, a long-term relationship, friendship, or language exchange — say so. This attracts people who want the same thing and filters out those who don\'t, which saves everyone time.'],
      ['Include something easy to respond to', 'End your bio with something that invites a response: a question, a half-finished thought, or a specific detail that someone with a shared interest will immediately want to respond to.'],
      ['On CV Dating: your profile is your story', 'CV Dating profiles include connection goals, interests, languages, and optionally a CV. The CV can include work, education, projects, creative work, or anything that tells your story. Only include what you\'re comfortable sharing.'],
    ],
    faq: [
      ['What should I write in my dating profile?', 'Include: your connection goal (dating, friendship, language exchange), two or three specific interests or experiences that show who you are, what you\'re looking for, and something easy for the other person to respond to. Avoid: generic lists, clichés, and anything that could apply to anyone.'],
      ['How long should a dating profile bio be?', 'Shorter than you think. Three to five sentences is usually enough. The goal is to give someone enough to be curious — not to explain yourself completely.'],
    ],
  },
]

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = guides.find((item) => item.slug === slug)
  if (!guide) return {}
  const url = `https://cvdating.app/guides/${guide.slug}`
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      type: 'article',
      siteName: 'CV Dating',
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = guides.find((item) => item.slug === slug)
  if (!guide) notFound()

  const url = `https://cvdating.app/guides/${guide.slug}`
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    mainEntityOfPage: url,
    dateModified: new Date().toISOString(),
    publisher: { '@type': 'Organization', name: 'CV Dating', url: 'https://cvdating.app' },
  }
  const faqSchema = guide.faq ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  } : null

  return (
    <main className="min-h-screen bg-[#f7f5f1] text-[#252923]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article).replace(/</g, '\\u003c') }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />}
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-lg font-semibold tracking-[-0.04em]">CV Dating<span className="text-[#45634b]">.</span></Link>
        <Link href="/auth" className="rounded-full border border-[#d8d8d0] px-5 py-2.5 text-sm font-medium transition hover:border-[#53745c]">Join free</Link>
      </header>
      <article className="mx-auto max-w-3xl px-6 pb-20 pt-10">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#777b72]">
          <Link href="/" className="underline underline-offset-4">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/guides" className="underline underline-offset-4">Guides</Link>
          <span aria-hidden="true"> / </span>
          <span>{guide.h1}</span>
        </nav>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#45634b]">CV Dating Guide</p>
        <h1 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.05em] sm:text-5xl">{guide.h1}</h1>
        <p className="mt-6 text-lg leading-8 text-[#64685f]">{guide.intro}</p>
        <div className="mt-12 space-y-10">
          {guide.sections.map(([heading, body]) => (
            <section key={heading} className="border-t border-[#e1dfd8] pt-6">
              <h2 className="text-2xl font-medium tracking-[-0.035em]">{heading}</h2>
              <p className="mt-3 text-base leading-7 text-[#64685f]">{body}</p>
            </section>
          ))}
        </div>
        {guide.faq && (
          <section className="mt-14">
            <h2 className="text-xl font-semibold tracking-[-0.03em]">Frequently asked questions</h2>
            <div className="mt-6 space-y-6">
              {guide.faq.map(([q, a]) => (
                <div key={q} className="border-t border-[#e1dfd8] pt-5">
                  <h3 className="font-semibold leading-snug">{q}</h3>
                  <p className="mt-2 leading-7 text-[#64685f]">{a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        <div className="mt-10 flex flex-col gap-4 rounded-3xl bg-[#345b40] p-7 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-medium">Ready for a better first conversation?</h2>
            <p className="mt-2 text-sm text-[#d8e5d9]">Free to join. Up to four introductions a day. No swiping.</p>
          </div>
          <Link href="/auth" className="inline-flex shrink-0 justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#345b40] transition hover:bg-[#edf3ec]">Join CV Dating →</Link>
        </div>
        <nav aria-label="More guides" className="mt-12 border-t border-[#e1dfd8] pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#53745c]">More guides</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {guides.filter((g) => g.slug !== slug).slice(0, 8).map((g) => (
              <li key={g.slug}><Link className="text-sm text-[#42634b] underline underline-offset-4 hover:text-[#284a33]" href={`/guides/${g.slug}`}>{g.h1}</Link></li>
            ))}
          </ul>
        </nav>
      </article>
    </main>
  )
}
