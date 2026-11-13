import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Topic = {
  slug: string
  title: string
  description: string
  eyebrow: string
  h1: string
  intro: string
  sections: { heading: string; body: string }[]
  question: string
  answer: string
}

const baseTopics: Topic[] = [
  {
    slug: 'dating-without-swiping',
    title: 'Dating Without Swiping | CV Dating',
    description: 'A slower way to meet people for dating: automatic daily introductions, shared intentions, and a full 24 hours to talk before deciding what comes next.',
    eyebrow: 'Dating, without the endless feed',
    h1: 'Dating without swiping starts with a real conversation.',
    intro: 'Dating apps often ask you to judge a photo in a second. CV Dating is built around a different first step: a small set of introductions selected for you, followed by a conversation that has time to become more than a first impression.',
    sections: [
      { heading: 'Meet a person, not a stack of profiles', body: 'You share what kind of connection you want and add the parts of your story that matter to you. The service selects up to four daily introductions from available members with compatible intentions. You do not browse through a swipe queue or choose the four people yourself.' },
      { heading: 'Talk before deciding what comes next', body: 'An introduction opens a private chat for a 24-hour first conversation. There is no yes-or-no gate before the chat begins. Use that time to ask questions, notice how the conversation feels, and decide together whether you want to continue.' },
      { heading: 'A better fit is more than a job title', body: 'Work can be one useful part of a profile, but it does not define someone. Interests, values, communication, location, language, and the kind of relationship each person wants all matter too. A profile should help people start talking, not reduce them to a score.' },
    ],
    question: 'Do I have to swipe or pick my daily introductions?',
    answer: 'No. CV Dating selects introductions automatically from members who are available and have compatible connection goals. The number may be lower than four when there are not enough suitable members.',
  },
  {
    slug: 'cv-based-dating',
    title: 'CV Dating: Meet Beyond Job Titles | CV Dating',
    description: 'CV dating is a way to bring more of your story into meeting people. Learn how work, interests, values, and relationship intentions can start a conversation.',
    eyebrow: 'Your CV is one chapter',
    h1: 'CV dating should reveal your story, not turn it into a score.',
    intro: 'A CV can show what you have learned, built, and cared about. It cannot tell the whole story of who you are or whether you will connect with someone. CV Dating uses a profile-first approach to help people meet beyond photos and job titles.',
    sections: [
      { heading: 'Share only what you choose', body: 'Build a profile with your connection goals, interests, languages, and prompts. A CV may contain private details, so review your document before uploading it and do not include information you do not want stored. Other members should get to know you through the profile details you choose to share.' },
      { heading: 'Compatibility is not employability', body: 'CV Dating is a social introduction service, not a jobs board, recruiting platform, or background-check service. Your career is context for a conversation, not a measure of your worth. A title, degree, or employer should never be treated as proof of character or relationship compatibility.' },
      { heading: 'Start with shared direction', body: 'Choose whether you are interested in dating, a long-term relationship, friendship, language exchange, collaboration, or mentorship. Introductions work best when people are open about what they hope to find and take time to listen.' },
    ],
    question: 'Does CV Dating guarantee a match based on my CV?',
    answer: 'No. A CV cannot guarantee compatibility. Introductions depend on available members, profile information, and the connection goals people choose.',
  },
  {
    slug: 'make-friends-online',
    title: 'Make Friends Online Without Swiping | CV Dating',
    description: 'Meet people for friendship through automatic introductions and a real conversation. CV Dating is designed for new friends, shared interests, and life in a new place.',
    eyebrow: 'Friendship deserves a first step too',
    h1: 'Make friends online through conversation, not a popularity contest.',
    intro: 'Making friends as an adult can be harder than it looks, especially after a move, a change in routine, or a new stage of life. CV Dating gives friendship seekers a way to meet people without scrolling through a feed of faces.',
    sections: [
      { heading: 'Set friendship as your intention', body: 'Choose friendship as a connection goal and share a few interests, languages, and prompts that make it easier for someone to start a thoughtful chat. Clear intentions help people avoid confusing a friendship introduction with a date.' },
      { heading: 'A small introduction can lead somewhere', body: 'CV Dating selects up to four introductions a day from available members. Each introduction opens a 24-hour conversation. You can talk about a local neighborhood, a hobby, a book, or what it is like to start over somewhere new.' },
      { heading: 'Keep it comfortable and respectful', body: 'You decide what personal details to share. Start with the topics you feel good discussing. If you later choose to meet in person, choose a public place and tell someone you trust where you will be.' },
    ],
    question: 'Is CV Dating only for romantic relationships?',
    answer: 'No. Friendship is one of the connection goals supported in onboarding, alongside dating, long-term relationships, language exchange, collaboration, and mentorship.',
  },
  {
    slug: 'language-exchange',
    title: 'Find a Language Exchange Partner | CV Dating',
    description: 'Find a language exchange partner through shared language goals and interests. Meet through a thoughtful introduction instead of an endless swipe feed.',
    eyebrow: 'Practice language with a person',
    h1: 'Find a language exchange partner through shared interests.',
    intro: 'A good language exchange is a conversation between people, not a lesson plan downloaded from an app. CV Dating lets members share the languages they speak and choose language exchange as a connection goal, so the first conversation has a clear purpose.',
    sections: [
      { heading: 'Say what you want to practice', body: 'Add the languages you speak and the ones you want to practice in your profile. Share your level and what feels useful to you, such as relaxed conversation, travel vocabulary, or learning about everyday life in another country.' },
      { heading: 'Start with an easy first conversation', body: 'Introductions are selected automatically from available people with compatible intentions. Use the 24-hour conversation to agree on a comfortable language balance and a topic you both enjoy. There is no need to pretend to be fluent.' },
      { heading: 'Be curious across cultures', body: 'Language exchange works best when both people have room to speak, ask questions, and correct each other kindly. A shared language does not mean a shared background, so let your partner describe their own experience rather than making assumptions.' },
    ],
    question: 'Can I choose the country or language of my partner?',
    answer: 'You can add languages and connection preferences to your profile. Introductions depend on available members and compatible goals; CV Dating does not promise a specific country or fluency level.',
  },
  {
    slug: 'long-term-relationships',
    title: 'Meet for a Long-Term Relationship | CV Dating',
    description: 'Looking for a lasting relationship or marriage? Set a clear intention, meet through an automatic introduction, and take time to talk before deciding what comes next.',
    eyebrow: 'For people looking beyond a first date',
    h1: 'Meet people who are open to a long-term relationship.',
    intro: 'Wanting commitment is a valid way to date. CV Dating gives members a way to say they are looking for a long-term relationship, then meet through a conversation instead of judging a rapid stream of profiles.',
    sections: [
      { heading: 'Be clear about your intention', body: 'Choose long-term relationship as a connection goal and use your prompts to describe what partnership means to you. People may have different timelines, family plans, and cultural expectations; a clear opening makes those conversations easier to have.' },
      { heading: 'Take the time to learn about each other', body: 'Your introduction opens a 24-hour conversation with no pre-chat yes-or-no decision. Treat that first day as a chance to ask genuine questions and see whether you want to continue. No algorithm can promise a spouse or guarantee that two people will be compatible.' },
      { heading: 'Marriage is a personal decision', body: 'Some members hope to marry; others want a committed relationship without marriage. Be honest, listen without pressure, and discuss major life decisions in your own time. CV Dating introduces people; it does not make promises about outcomes.' },
    ],
    question: 'Can CV Dating guarantee I will meet someone to marry?',
    answer: 'No dating service can guarantee marriage. CV Dating can help people with compatible intentions start a conversation, but each person decides whether a relationship is right for them.',
  },
  {
    slug: 'anonymous-online-chat',
    title: 'Private Online Chat with Codenames | CV Dating',
    description: 'Start a private introduction chat using a codename. Learn what anonymous chat can and cannot mean, and how to protect your personal information online.',
    eyebrow: 'Privacy starts with honest expectations',
    h1: 'A private first chat, with room to choose what you share.',
    intro: 'People searching for anonymous chat often want a low-pressure way to talk before sharing personal details. CV Dating uses codenames in introductions so a first conversation can begin without a public profile feed.',
    sections: [
      { heading: 'A codename is not complete anonymity', body: 'CV Dating is an account-based service. A codename can reduce what appears in a conversation, but it does not make a person untraceable or guarantee that information shared in a chat stays secret. Do not share passwords, financial details, home addresses, or documents in a conversation.' },
      { heading: 'Share at your own pace', body: 'Start with interests, everyday topics, and the kind of connection you want. Decide for yourself when you are comfortable sharing a name, social account, or other contact information. You can end a chat and use safety tools if you need to.' },
      { heading: 'Privacy depends on careful product design', body: 'Online services need clear privacy controls, secure storage, and straightforward ways to report abuse or remove an account. Read the privacy information before uploading a CV, and only provide details you are comfortable entrusting to the service.' },
    ],
    question: 'Is CV Dating fully anonymous?',
    answer: 'No. CV Dating is an account-based service that uses codenames in introductions. A codename is a privacy feature, not a guarantee of anonymity.',
  },
  {
    slug: 'career-connections',
    title: 'Career Connections, Mentors and Collaborators | CV Dating',
    description: 'Meet people for professional collaboration or mentorship through shared interests and goals. CV Dating is for introductions, not job listings or recruiting.',
    eyebrow: 'People before professional networking',
    h1: 'Find a collaborator or mentor through a real conversation.',
    intro: 'Professional networking can feel transactional. CV Dating includes collaboration and mentorship as connection goals for people who want to talk about ideas, learn from one another, or explore a project together.',
    sections: [
      { heading: 'Choose collaboration or mentorship', body: 'Say whether you want a peer to build with, a mentor to learn from, or someone to exchange ideas with. Add a few skills and interests so an introduction can begin with something concrete.' },
      { heading: 'This is not a jobs marketplace', body: 'CV Dating does not list vacancies or guarantee employment, referrals, or mentorship outcomes. Do not share confidential employer information or private business documents in a first chat. Agree on expectations before beginning any project or professional arrangement.' },
      { heading: 'Make the first conversation useful', body: 'A short introduction is enough to learn what the other person is working on and what kind of help they are looking for. Be specific about your availability, experience, and boundaries. Good professional relationships grow through trust over time.' },
    ],
    question: 'Can CV Dating help me get a job?',
    answer: 'CV Dating is not a job board or recruiting service. Members can choose collaboration or mentorship introductions, but no job or referral is promised.',
  },
]

const languageGuides = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
  'Arabic', 'Hindi', 'Japanese', 'Korean', 'Mandarin Chinese', 'Turkish',
]

const languageTopics: Topic[] = languageGuides.map((language) => {
  const slug = `${language.toLowerCase().replace(/\s+/g, '-')}-language-exchange`
  return {
    slug,
    title: `Find a ${language} Language Exchange Partner | CV Dating`,
    description: `Find an ${language} language exchange partner for adult conversation, friendship, travel and cultural exchange. Meet through a thoughtful introduction instead of swiping.`,
    eyebrow: `${language} conversation for adults`,
    h1: `Find a ${language} language exchange partner.`,
    intro: `Practice ${language} with an adult who also wants a real conversation. Add your spoken languages and language-exchange goal, then start with a private 24-hour introduction when a compatible member is available.`,
    sections: [
      { heading: `Practice ${language} through real conversation`, body: `Good language practice starts with curiosity. Share whether you want relaxed conversation, travel vocabulary, cultural exchange, or help building confidence in ${language}. You decide the pace and topics together.` },
      { heading: 'Start with shared expectations', body: 'Say which languages you speak, which one you want to practise, and whether you are looking for friendship, dating, or language exchange. Clear intentions help both people feel comfortable from the first message.' },
      { heading: 'Keep your first chat private and respectful', body: 'Introductions begin with a private chat and codenames. Do not share passwords, money, home addresses, or identity documents. You can stop any conversation that does not feel right.' },
    ],
    question: `Can I use CV Dating to practise ${language}?`,
    answer: `Yes. Add ${language} to your languages and select language exchange as an intention. Introductions depend on available adults with compatible goals, so a specific partner or fluency level is not guaranteed.`,
  }
})

const adultGuides: Topic[] = [
  ['online-chat-for-adults', 'Online Chat for Adults | CV Dating', 'Private online chat for adults of all backgrounds', 'Start a private conversation with a thoughtful introduction. CV Dating is for adults 18+ of all genders and backgrounds who want to talk, date, make friends, or practise a language.'],
  ['meet-new-people-online', 'Meet New People Online | CV Dating', 'Meet new people online', 'Meet adults online for dating, friendship, language exchange, collaboration, or long-term relationships through a conversation-first introduction.'],
  ['international-dating', 'International Dating and Global Connections | CV Dating', 'Date across borders', 'Meet adults across countries who are open to international dating, friendship, cultural exchange, and real conversations.'],
  ['safe-online-dating', 'Safer Online Dating and Chat | CV Dating', 'Date and chat more safely', 'Learn practical ways to keep online dating and private chats safer: protect personal details, spot pressure, and choose your pace.'],
].map(([slug, title, h1, intro]) => ({
  slug, title, description: intro, eyebrow: 'Connection, with intention', h1, intro,
  sections: [
    { heading: 'Start with a real conversation', body: 'CV Dating introduces adults with compatible intentions and opens a private 24-hour conversation. It is built for people who want to talk before deciding whether to continue.' },
    { heading: 'Be clear and respectful', body: 'Choose the kind of connection you want, respect boundaries, and never pressure someone to share personal information, photos, money, or off-platform contact details.' },
    { heading: 'Keep control of your information', body: 'Use a codename in early conversations and share personal details only when you are comfortable. Stop a chat if it feels wrong and meet in public if you later decide to meet.' },
  ],
  question: 'Who can use CV Dating?', answer: 'CV Dating is for adults aged 18 and over. Introductions depend on available members with compatible intentions and are not guaranteed.',
}))

const communityTopics: Topic[] = [
  ['kpop-fans-online', 'Meet K-pop Fans Online | MeetByStory', 'Meet adult K-pop fans through conversation', 'Find adult K-pop fans for friendship, language exchange, dating, or a thoughtful conversation. Share the artists, songs, and communities you enjoy, then start with a private 24-hour introduction.'],
  ['anime-manga-fans-online', 'Meet Anime and Manga Fans Online | MeetByStory', 'Meet adult anime and manga fans online', 'Meet adults who enjoy anime and manga for friendship, dating, language exchange, and shared fandom conversations. A common interest can make a first message easier.'],
  ['goth-alternative-community', 'Meet Goth and Alternative People Online | MeetByStory', 'Meet adults in Goth and alternative communities', 'Meet adults who enjoy Goth and alternative music, fashion, art, and culture. Start with shared interests and clear intentions for friendship, dating, or conversation.'],
  ['gaming-friends-online', 'Meet Gaming Friends Online | MeetByStory', 'Meet adult gaming friends online', 'Meet adults who enjoy gaming, co-op play, esports, or game stories. Start a private conversation before deciding whether you want to play, chat, or stay in touch.'],
].map(([slug, title, h1, intro]) => ({
  slug, title, description: intro, eyebrow: 'Find your people', h1, intro,
  sections: [
    { heading: 'Share the interests that matter to you', body: 'Add interests to your profile so a first introduction has something real to build on. Fandom and style are invitations to conversation, not a reason to make assumptions about someone.' },
    { heading: 'Keep the first chat comfortable', body: 'A private 24-hour first conversation gives both people room to talk before they decide whether to continue. Be clear about whether you are looking for friendship, dating, language exchange, or another type of connection.' },
    { heading: 'Respect the person behind the interest', body: 'Shared taste can start a conversation, but consent, boundaries, and kindness keep it worthwhile. Never pressure anyone for photos, money, personal details, or off-platform contact.' },
  ],
  question: 'Can I join this community if I am new to it?',
  answer: 'Yes. Add the interests you enjoy and be honest about what you want to learn or talk about. Introductions depend on available adults with compatible goals.',
}))

const extraLanguageTopics: Topic[] = [
  'Dutch', 'Polish', 'Russian', 'Swedish',
].map((language) => {
  const slug = `${language.toLowerCase().replace(/\s+/g, '-')}-language-exchange`
  return {
    slug,
    title: `Find a ${language} Language Exchange Partner | CV Dating`,
    description: `Find a ${language} language exchange partner for adult conversation, friendship, and cultural exchange. Meet through a thoughtful introduction.`,
    eyebrow: `${language} conversation for adults`,
    h1: `Find a ${language} language exchange partner.`,
    intro: `Practice ${language} with an adult who also wants a real conversation. Add your spoken languages and choose language exchange as your goal, then start with a private 24-hour introduction.`,
    sections: [
      { heading: `Practice ${language} through real conversation`, body: `Good language practice starts with curiosity. Share whether you want relaxed conversation, travel vocabulary, or cultural exchange. You decide the pace and topics together.` },
      { heading: 'Start with shared expectations', body: 'Say which languages you speak and which you want to practise. Clear intentions help both people feel comfortable from the first message.' },
      { heading: 'Keep your first chat private and respectful', body: 'Introductions begin with a private chat. Do not share passwords, money, or home addresses. You can stop any conversation that does not feel right.' },
    ],
    question: `Can I use CV Dating to practise ${language}?`,
    answer: `Yes. Add ${language} to your profile and select language exchange as your intention. Introductions depend on available adults with compatible goals.`,
  }
})

const highTrafficTopics: Topic[] = [
  {
    slug: 'hellotalk-alternative',
    title: 'HelloTalk Alternative: Chat, Date & Language Exchange | CV Dating',
    description: 'Looking for a HelloTalk alternative for chat, dating and language exchange? CV Dating gives you automatic introductions for language practice, friendship and dating — no swiping.',
    eyebrow: 'A better way to chat and connect',
    h1: 'The HelloTalk alternative built for real conversation.',
    intro: 'HelloTalk is great for language learning. But what if you also want friendship, dating, or deeper connection — not just a language partner? CV Dating gives you automatic daily introductions for chat, language exchange, dating, and friendship with one profile.',
    sections: [
      { heading: 'Language exchange and dating in one place', body: 'HelloTalk focuses on language learning. CV Dating combines language exchange with dating, friendship, and professional connections. Set your goal and get matched with adults who want the same thing — from language practice to a long-term relationship.' },
      { heading: 'No feed, no swiping, no endless scrolling', body: 'Unlike HelloTalk\'s feed or Tinder\'s swipe stack, CV Dating selects up to four people for you each day based on your goals. You get a private 24-hour conversation — no swiping required.' },
      { heading: 'Private, automatic, and goal-based', body: 'Share your languages, interests, and connection goals. CV Dating handles the matching. Your first chat opens automatically so you can focus on conversation, not curation.' },
    ],
    question: 'Is CV Dating a replacement for HelloTalk?',
    answer: 'CV Dating is different: it combines language exchange with dating and friendship in one app, using automatic introductions instead of a public feed. If you want to chat, date, and practise a language with the same person, CV Dating is built for that.',
  },
  {
    slug: 'meet-girls-online',
    title: 'Meet Girls Online for Chat, Dating & Friendship | CV Dating',
    description: 'Meet women online for real chat, dating, friendship and language exchange. CV Dating selects up to four introductions for you daily — no swiping, no cold messages.',
    eyebrow: 'Real connections, not random chats',
    h1: 'Meet women online through real conversation.',
    intro: 'Most apps make you swipe through hundreds of profiles or send cold messages that go nowhere. CV Dating works differently: it selects up to four women for you each day based on shared goals, then opens a private 24-hour chat automatically.',
    sections: [
      { heading: 'No cold messages or swiping required', body: 'CV Dating opens your first conversation automatically. You do not have to guess whether someone is interested — if you are both matched, the chat begins. Use the full 24 hours to get to know each other.' },
      { heading: 'Set your intention from the start', body: 'Choose whether you want dating, friendship, language exchange, or a long-term relationship. Women on CV Dating can see your goals before the chat begins, which means less confusion and more honest conversations.' },
      { heading: 'Privacy built in from the first message', body: 'Introductions use codenames. No one sees your real name, photos, or social media until you choose to share them. This gives everyone — especially women — more control over the first conversation.' },
    ],
    question: 'Is CV Dating only for men looking to meet women?',
    answer: 'No. CV Dating is for adults of all genders and backgrounds. Women, men, and non-binary people all use CV Dating for dating, friendship, language exchange, and professional connections.',
  },
  {
    slug: 'meet-women-online',
    title: 'Meet Women Online: Chat, Dating & Language Exchange | CV Dating',
    description: 'Meet women online for chat, dating, language exchange, and friendship. CV Dating gives automatic daily introductions — no swiping, no cold openers.',
    eyebrow: 'Connection on your terms',
    h1: 'Meet women online for chat, dating, and language exchange.',
    intro: 'Whether you are looking for a date, a language partner, or a genuine friend, CV Dating selects up to four introductions daily based on shared goals. The first chat opens automatically — no swiping, no cold openers.',
    sections: [
      { heading: 'Automatic introductions based on shared goals', body: 'You set your connection goals — dating, friendship, language exchange, long-term relationship — and CV Dating selects compatible people from available members. No browsing required.' },
      { heading: 'Chat privately from the first message', body: 'Your introduction chat is private and uses codenames. Share personal details at your own pace. The 24-hour conversation window gives you time to decide if you want to continue.' },
      { heading: 'All genders, all backgrounds', body: 'CV Dating is for adults 18+ of all genders, backgrounds, and locations. Introductions depend on available members with compatible goals.' },
    ],
    question: 'Can women use CV Dating to meet other women?',
    answer: 'Yes. Set your connection preferences in your profile. CV Dating matches based on mutual goals and preferences from available members.',
  },
  {
    slug: 'chat-with-strangers',
    title: 'Chat with Strangers Online Safely | CV Dating',
    description: 'Chat with strangers online in a safer, goal-based way. CV Dating gives you automatic introductions with adults who share your connection goals — no random strangers.',
    eyebrow: 'Not random — goal-based',
    h1: 'A safer way to chat with new people online.',
    intro: 'Random chat apps connect you with anyone. CV Dating is different: it matches you with adults who share your connection goals — dating, friendship, language exchange — and opens a private 24-hour chat automatically.',
    sections: [
      { heading: 'Goal-based, not random', body: 'CV Dating selects introductions from adults who want the same type of connection as you. This makes the first conversation easier and reduces unwanted messages.' },
      { heading: 'Private from the start', body: 'Introductions use codenames. Your real name, photos, and social media are hidden until you choose to share them. You control what information you reveal and when.' },
      { heading: 'Adults only, 18+', body: 'CV Dating is for adults aged 18 and over. The service does not connect minors.' },
    ],
    question: 'Is CV Dating like Omegle or Chatroulette?',
    answer: 'No. CV Dating is an account-based service for adults 18+. It uses profile information and connection goals to select introductions — it does not randomly connect strangers.',
  },
  {
    slug: 'slow-dating-app',
    title: 'Slow Dating App: Take Your Time, Find Real Connection | CV Dating',
    description: 'Tired of fast swipes and instant decisions? CV Dating is a slow dating app that gives you up to four introductions a day and 24 hours to have a real conversation.',
    eyebrow: 'Dating without the rush',
    h1: 'Slow dating: fewer introductions, better conversations.',
    intro: 'Most dating apps optimise for speed — fast swipes, quick decisions, endless new faces. Slow dating is the opposite: fewer introductions, more time to talk, and a focus on the conversation rather than the profile photo.',
    sections: [
      { heading: 'Up to four introductions a day', body: 'CV Dating selects up to four people for you from available members each day. You do not browse through hundreds of profiles. Each introduction comes with a full 24-hour conversation window.' },
      { heading: 'No swiping, no yes-or-no gate', body: 'Your introduction chat opens automatically. There is no swipe-to-match step before you can talk. This removes the pressure of instant decisions and gives both people room to be curious.' },
      { heading: 'Quality over quantity', body: 'A smaller number of introductions can lead to more thoughtful conversations. CV Dating is built for people who want fewer, better first conversations — not an endless stream of new faces.' },
    ],
    question: 'What makes CV Dating a slow dating app?',
    answer: 'CV Dating limits daily introductions to up to four, opens conversations automatically, and gives you a full 24 hours to chat before deciding what comes next. There is no swipe feed or endless browsing.',
  },
  {
    slug: 'serious-dating-app',
    title: 'Serious Dating App for Real Relationships | CV Dating',
    description: 'Looking for a serious dating app? CV Dating matches adults based on shared connection goals — dating, long-term relationships, friendship — with automatic daily introductions.',
    eyebrow: 'For people who mean it',
    h1: 'A serious dating app built around real conversation.',
    intro: 'Serious dating starts with knowing what you want and finding people who want the same thing. CV Dating asks for your connection goals upfront and uses them to select daily introductions from compatible adults.',
    sections: [
      { heading: 'Set a clear intention from day one', body: 'Choose whether you are looking for dating, a long-term relationship, friendship, or language exchange. This helps CV Dating select introductions from people with compatible goals — not just the nearest available face.' },
      { heading: 'Conversation first, photos later', body: 'Your introduction opens a private 24-hour chat using a codename. Getting to know someone through conversation before photos can lead to a more honest and comfortable start.' },
      { heading: 'No gamification', body: 'CV Dating does not use streak rewards, coins, or fake engagement prompts. It is built for people who want introductions that have a chance of going somewhere.' },
    ],
    question: 'Is CV Dating for people looking for long-term relationships?',
    answer: 'Yes. Long-term relationship is one of the connection goals you can choose in onboarding. Introductions are selected from adults with compatible intentions.',
  },
  {
    slug: 'dating-app-uk',
    title: 'Online Dating App UK: Chat, Meet & Connect | CV Dating',
    description: 'Looking for a UK dating app? CV Dating gives adults in the UK automatic daily introductions for dating, friendship, and language exchange — no swiping.',
    eyebrow: 'Dating in the UK, done differently',
    h1: 'Online dating in the UK with real introductions.',
    intro: 'CV Dating is available to adults across the UK, Europe, and worldwide. Set your location preferences, choose your connection goals, and get up to four introductions daily from compatible members.',
    sections: [
      { heading: 'Available across the UK', body: 'Members in London, Manchester, Birmingham, Edinburgh, and across the UK can join CV Dating. Location is one factor in introductions; you can also choose open-to-distance if you want to meet people further away.' },
      { heading: 'Dating, friends, and language exchange', body: 'Whether you want to date, make friends in a new city, or practise a language with someone in the UK, CV Dating uses the same introduction system for all connection types.' },
      { heading: 'Private and account-based', body: 'CV Dating is an account-based service for UK adults 18+. It complies with UK data protection law. You control what information you share and when.' },
    ],
    question: 'Is CV Dating available in the UK?',
    answer: 'Yes. CV Dating is available to adults 18+ in the UK and worldwide. Introductions depend on available members with compatible goals in your area or open to distance.',
  },
  {
    slug: 'dating-app-usa',
    title: 'Online Dating App USA: Chat, Meet & Connect | CV Dating',
    description: 'Looking for a US dating app? CV Dating gives adults in the USA automatic daily introductions for dating, friendship, and language exchange. No swiping.',
    eyebrow: 'Dating in the US, done differently',
    h1: 'Online dating in the USA with real introductions.',
    intro: 'CV Dating is available to adults across the United States. Set your location, choose your connection goals, and get up to four introductions daily from compatible members — no swiping required.',
    sections: [
      { heading: 'Available across the United States', body: 'Members in New York, Los Angeles, Chicago, Houston, and across the US can join CV Dating. Choose your location preferences to meet people nearby or open to long-distance.' },
      { heading: 'Dating, friends, and language exchange', body: 'Whether you want to date, make friends after a move, or practise English or another language with someone in the US, CV Dating uses the same goal-based introduction system.' },
      { heading: 'Private, secure, adults only', body: 'CV Dating is for adults 18+ in the US. Personal details are kept private during introductions.' },
    ],
    question: 'Is CV Dating available in the United States?',
    answer: 'Yes. CV Dating is available to adults 18+ in the US and worldwide. Introductions depend on available members with compatible goals.',
  },
  {
    slug: 'dating-for-professionals',
    title: 'Dating App for Professionals: Meet Ambitious Adults | CV Dating',
    description: 'A dating app for professionals who want real conversation. CV Dating uses your story — career, interests, goals — to introduce you to compatible adults daily.',
    eyebrow: 'Dating for driven adults',
    h1: 'A dating app for professionals who want more than a photo.',
    intro: 'Professionals often want a dating app that reflects the same thoughtfulness they bring to their work. CV Dating uses a CV-informed profile — career, interests, goals, values — to select daily introductions instead of relying on a photo swipe.',
    sections: [
      { heading: 'Your career is context, not a score', body: 'CV Dating uses career context as one part of a broader profile that includes interests, values, languages, and connection goals. It is not a job-matching service or a prestige ranking.' },
      { heading: 'Automatic introductions, no endless browsing', body: 'Busy professionals often do not have time to scroll through hundreds of profiles. CV Dating selects up to four introductions daily from compatible adults and opens a private 24-hour chat automatically.' },
      { heading: 'Dating, networking, mentorship', body: 'Choose the type of connection you want: dating, long-term relationship, friendship, collaboration, or mentorship. CV Dating uses your goal to find compatible introductions.' },
    ],
    question: 'Is CV Dating only for high earners or elite professionals?',
    answer: 'No. CV Dating is for adults 18+ of all career levels, industries, and backgrounds. Career context is part of a profile — it is not a filter or ranking system.',
  },
  {
    slug: 'free-online-chat',
    title: 'Free Online Chat for Adults: Meet, Date & Make Friends | CV Dating',
    description: 'Free online chat for adults. CV Dating gives you daily introductions for dating, friendship, and language exchange — your first conversations are always free.',
    eyebrow: 'Start chatting for free',
    h1: 'Free online chat with goal-based introductions.',
    intro: 'CV Dating gives every adult a way to start chatting for free. Your first daily introductions and 24-hour conversations are free to access — no credit card required to start a conversation.',
    sections: [
      { heading: 'Free introductions every day', body: 'CV Dating selects up to four daily introductions and opens a private 24-hour chat at no cost. You can join, set your goals, and start talking without paying.' },
      { heading: 'Chat for dating, friendship, or language exchange', body: 'Your first free chats can be for any connection type: dating, friendship, language exchange, or professional connection. Set your goal in your profile.' },
      { heading: 'Optional premium features', body: 'Some features — such as extended conversations beyond 24 hours — may require a subscription. The core introduction and chat experience is free.' },
    ],
    question: 'Is CV Dating free to use?',
    answer: 'Yes. Joining CV Dating, setting up your profile, and accessing daily introductions and 24-hour chats are free. Some extended features may require a subscription.',
  },
  {
    slug: 'meet-people-online-free',
    title: 'Meet People Online Free: Chat, Date & Make Friends | CV Dating',
    description: 'Meet people online for free. CV Dating gives you automatic daily introductions for dating, friendship, and language exchange — no payment needed to start.',
    eyebrow: 'Free introductions every day',
    h1: 'Meet people online for free, with real conversation.',
    intro: 'CV Dating is free to join and use for daily introductions. Meet adults online for dating, friendship, language exchange, or professional connections — no payment required to get started.',
    sections: [
      { heading: 'No payment required to start', body: 'Create your profile, set your goals, and start receiving daily introductions for free. Your first 24-hour conversations with new people are always included.' },
      { heading: 'Goal-based matching, not random chat', body: 'CV Dating matches based on shared connection goals — not random connections. This means your free chats are more likely to go somewhere.' },
      { heading: 'All genders, all backgrounds', body: 'CV Dating is free and open to adults 18+ of all genders, backgrounds, and locations worldwide.' },
    ],
    question: 'Can I meet people on CV Dating without paying?',
    answer: 'Yes. Joining and accessing daily introductions and 24-hour chats are free. Some premium features may require a subscription.',
  },
]

const topics: Topic[] = [...baseTopics, ...languageTopics, ...extraLanguageTopics, ...adultGuides, ...communityTopics, ...highTrafficTopics]

export function generateStaticParams() {
  return topics.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const topic = topics.find((item) => item.slug === slug)
  if (!topic) return { title: 'Connection guides | CV Dating' }
  const url = `https://cvdating.app/connections/${topic.slug}`
  return {
    title: topic.title,
    description: topic.description,
    alternates: { canonical: url },
    openGraph: { title: topic.title, description: topic.description, url, type: 'article', siteName: 'CV Dating' },
    twitter: { card: 'summary', title: topic.title, description: topic.description },
  }
}

export default async function ConnectionTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const topic = topics.find((item) => item.slug === slug)
  if (!topic) notFound()

  const url = `https://cvdating.app/connections/${topic.slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: topic.title,
    description: topic.description,
    url,
    isPartOf: { '@type': 'WebSite', name: 'CV Dating', url: 'https://cvdating.app' },
  }

  return (
    <main className="min-h-screen bg-[#f7f5f1] text-[#252923]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-lg font-semibold tracking-[-0.04em]">CV Dating<span className="text-[#53745c]">.</span></Link>
        <Link href="/auth" className="rounded-full border border-[#d8d8d0] px-5 py-2.5 text-sm font-medium">Create your profile</Link>
      </header>
      <article className="mx-auto max-w-3xl px-6 pb-20 pt-12 sm:pt-16">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#777b72]"><Link href="/" className="underline underline-offset-4">Home</Link><span aria-hidden="true"> / </span><span>Connection guides</span></nav>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#53745c]">{topic.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.05em] sm:text-5xl">{topic.h1}</h1>
        <p className="mt-6 text-lg leading-8 text-[#64685f]">{topic.intro}</p>
        <div className="mt-12 space-y-10">
          {topic.sections.map((section) => <section key={section.heading} className="border-t border-[#e1dfd8] pt-6"><h2 className="text-2xl font-medium tracking-[-0.035em]">{section.heading}</h2><p className="mt-3 text-base leading-7 text-[#64685f]">{section.body}</p></section>)}
        </div>
        <section className="mt-12 rounded-3xl bg-[#e8ede5] p-6 sm:p-8">
          <h2 className="text-xl font-semibold">{topic.question}</h2>
          <p className="mt-3 leading-7 text-[#64685f]">{topic.answer}</p>
        </section>
        <div className="mt-10 flex flex-col gap-4 rounded-3xl bg-[#345b40] p-7 text-white sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="text-xl font-medium">Meet beyond the swipe.</h2><p className="mt-2 text-sm text-[#d8e5d9]">Get introductions selected for your connection goals.</p></div>
          <Link href="/auth" className="inline-flex shrink-0 justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#345b40]">Join CV Dating</Link>
        </div>
        <nav aria-label="More connection guides" className="mt-12 border-t border-[#e1dfd8] pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#53745c]">Explore connection guides</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {topics.filter((item) => item.slug !== topic.slug).map((item) => <li key={item.slug}><Link className="text-sm text-[#42634b] underline underline-offset-4" href={`/connections/${item.slug}`}>{item.h1}</Link></li>)}
          </ul>
        </nav>
      </article>
    </main>
  )
}
