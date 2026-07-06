export interface Interest {
  emoji: string;
  label: string;
  note: string;
}

export const INTERESTS: Interest[] = [
  {
    emoji: "✈️",
    label: "Travel",
    note: "Currently plotting a solo trip to the South of France. Motivation: mostly croissants.",
  },
  {
    emoji: "☕",
    label: "Cafés",
    note: "Professional cafe-hopper. Will rate your oat milk ratio without being asked.",
  },
  {
    emoji: "🏎️",
    label: "Formula 1",
    note: "Watches every race. Understands roughly 60% of the strategy calls. Fully committed anyway.",
  },
  {
    emoji: "🇫🇷",
    label: "Learning French",
    note: "Duolingo streak: alarmingly high. Vocabulary: 80% food, 15% directions, 5% actual grammar.",
  },
];

export interface TripBeat {
  step: string;
  title: string;
  description: string;
  emoji: string;
}

export const TRIP_BEATS: TripBeat[] = [
  {
    step: "Step 1",
    emoji: "🥐",
    title: "Learn just enough French to survive",
    description:
      "It started with Duolingo and a mild identity crisis. Several months in, I can confidently order a croissant, apologize for my accent, and locate a bathroom — three skills that, together, form a surprisingly complete travel toolkit.",
  },
  {
    step: "Step 2",
    emoji: "🎒",
    title: "Solo backpack the South of France",
    description:
      "No itinerary, no group chat to coordinate with — just a backpack and a rotating list of towns that sound nice to say out loud: Nice, Aix-en-Provence, Marseille. The plan is to get pleasantly lost and let the cafés guide the way.",
  },
  {
    step: "Step 3",
    emoji: "☕",
    title: "Cafe-hop with a completely unnecessary methodology",
    description:
      "As an engineer, I cannot simply enjoy a croissant. Each one gets benchmarked: flakiness (1–10), butter-to-dough ratio, and whether the barista silently judged my accent. Results tracked in a spreadsheet nobody asked for.",
  },
  {
    step: "Step 4",
    emoji: "🏎️",
    title: "Catch a Grand Prix, pretend to understand tire strategy",
    description:
      "The trip conveniently lines up with a race weekend. I will show up in team colors, cheer at the correct volume, and nod knowingly at every pit stop while secretly googling \"why did they pit so early\" in the bathroom line.",
  },
];

export interface TripStat {
  label: string;
  value: number;
  suffix?: string;
  max: number;
  tooltip: string;
}

export const TRIP_STATS: TripStat[] = [
  {
    label: "Croissants (planned)",
    value: 47,
    max: 47,
    tooltip: "A conservative estimate, subject to revision upward.",
  },
  {
    label: "French phrases memorized",
    value: 212,
    max: 212,
    tooltip: "Mostly food. Some directions. One phrase for emergencies I hope to never use.",
  },
  {
    label: "Grammar rules understood",
    value: 3,
    max: 20,
    tooltip: "Progress is progress.",
  },
  {
    label: "Races on the itinerary",
    value: 1,
    max: 1,
    tooltip: "Non-negotiable.",
  },
  {
    label: "Group chats to coordinate with",
    value: 0,
    max: 5,
    tooltip: "Going solo. Full control of the itinerary, all the blame for getting lost.",
  },
  {
    label: "Chance of getting lost",
    value: 100,
    suffix: "%",
    max: 100,
    tooltip: "Considered a feature, not a bug.",
  },
];
