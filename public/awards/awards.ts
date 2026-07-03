export type Award = {
  id: number;
  title: string;
  year: number;
  category: string;
  issuedBy: string;
  location: string;
  heroImage: string;
  summary: string;
  body: {
    text: string;
    image?: string;
    imageCaption?: string;
  }[];
  inlineImages: { src: string; caption: string }[];
};

export const AWARDS: Award[] = [
  {
    id: 1,
    title: "Best Event Management Agency — UAE",
    year: 2025,
    category: "Agency Excellence",
    issuedBy: "Gulf Business Events Awards",
    location: "Dubai, UAE",
    heroImage:
      "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?w=1200&h=600&fit=crop&auto=format",
    summary:
      "Awarded for outstanding creativity, execution excellence, and client satisfaction across 50+ premium events — the most prestigious event industry recognition in the Gulf region.",
    body: [
      {
        text: "The Gulf Business Events Awards is the benchmark by which the region's event industry measures itself. Winning Best Event Management Agency in 2025 represented the culmination of five years of consistent growth, a deliberate shift toward experiential design, and a client roster that spans automotive, luxury retail, and government sectors.",
      },
      {
        text: "The judging panel evaluated agencies across seven criteria: creative concept, production quality, client partnership, sustainability practices, team development, innovation, and commercial performance. We scored highest in creative concept and client partnership — the two areas we have invested most heavily in since 2022.",
        image:
          "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=380&fit=crop&auto=format",
        imageCaption: "The awards ceremony at Dubai World Trade Centre",
      },
      {
        text: "The award was accepted by our founding team at a ceremony attended by 800 industry leaders. In the weeks following, inbound enquiries from new clients increased by 340% — a direct and measurable commercial impact that validated the investment in building a recognised brand in the region.",
      },
      {
        text: "We dedicate this recognition to the 120-person team whose work across 50+ events in 2024 made it possible. Every vendor partner, every on-ground crew member, and every client who trusted us with their most important moments contributed to this outcome.",
      },
    ],
    inlineImages: [
      {
        src: "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?w=400&h=300&fit=crop",
        caption: "Award trophy",
      },
      {
        src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop",
        caption: "Ceremony night",
      },
      {
        src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop",
        caption: "Team celebration",
      },
    ],
  },
  {
    id: 2,
    title: "Most Innovative Event Concept",
    year: 2024,
    category: "Creative Innovation",
    issuedBy: "MENA Events Summit",
    location: "Riyadh, Saudi Arabia",
    heroImage:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200&h=600&fit=crop&auto=format",
    summary:
      "Recognised at the MENA Events Summit for pioneering immersive experiential design in luxury corporate events — a first for an Indian agency at this summit.",
    body: [
      {
        text: "The MENA Events Summit's Most Innovative Concept award has historically gone to agencies headquartered in the Gulf or Europe. Winning it as an India-based agency — and winning it for a project conceived and executed entirely by our in-house creative team — was a landmark moment for us and, we believe, for Indian event design more broadly.",
      },
      {
        text: "The winning concept was our EV SUV Grand Reveal in Mumbai — a 250-person press event that generated 200M+ media impressions and introduced India's most anticipated electric vehicle through a three-minute cinematic reveal sequence. The jury cited the deliberate absence of branding during the reveal as the defining creative risk that made the concept stand out.",
        image:
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=380&fit=crop&auto=format",
        imageCaption: "The EV reveal that won the award",
      },
      {
        text: "Receiving this recognition at the MENA Summit opened doors to conversations with three Gulf-based automotive brands who had not previously considered working with an Indian agency. Two of those conversations have since converted into active project briefs.",
      },
    ],
    inlineImages: [
      {
        src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&h=300&fit=crop",
        caption: "Summit stage",
      },
      {
        src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop",
        caption: "Winning concept",
      },
      {
        src: "https://images.unsplash.com/photo-1674570979140-9adb58d4c194?w=400&h=300&fit=crop",
        caption: "Team at summit",
      },
    ],
  },
  {
    id: 3,
    title: "Best Exhibition Stand Design",
    year: 2024,
    category: "Exhibition Design",
    issuedBy: "TechWorld India Jury",
    location: "Delhi, India",
    heroImage:
      "https://images.unsplash.com/photo-1764380746818-18c01e96df12?w=1200&h=600&fit=crop&auto=format",
    summary:
      "A 3,200 sqft stand that turned a structural constraint into the centrepiece of the show floor — winning Best Stand Design and generating 840 qualified leads in four days.",
    body: [
      {
        text: "TechWorld India's Best Stand Design award is judged by a panel of architects, brand strategists, and exhibition professionals. The brief for the stand we designed was constrained by a structural column we could not remove — so we made it the hero of the space, wrapping it in an interactive product demo tower that drew queues throughout the four-day show.",
      },
      {
        text: "The jury's feedback highlighted the material language as the primary differentiator. In a hall of glass and chrome, our choice of raw timber, woven textiles, and living moss walls positioned the client as a human-first technology company in a way that no signage or messaging could have achieved alone.",
        image:
          "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?w=600&h=380&fit=crop&auto=format",
        imageCaption: "The interactive demo tower at the stand's centre",
      },
      {
        text: "840 qualified leads across four days — a 340% improvement on the previous year's exhibition performance. The stand award was the client's first major industry recognition, and they have since briefed us on three additional exhibition projects for 2025.",
      },
    ],
    inlineImages: [
      {
        src: "https://images.unsplash.com/photo-1764380746818-18c01e96df12?w=400&h=300&fit=crop",
        caption: "Stand overview",
      },
      {
        src: "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?w=400&h=300&fit=crop",
        caption: "Demo zone",
      },
      {
        src: "https://images.unsplash.com/photo-1709423166198-cc44576fbe72?w=400&h=300&fit=crop",
        caption: "Visitor flow",
      },
    ],
  },
  {
    id: 4,
    title: "Excellence in Cultural Event Production",
    year: 2023,
    category: "Cultural Events",
    issuedBy: "Indian Events Industry Association",
    location: "Kolkata, India",
    heroImage:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=600&fit=crop&auto=format",
    summary:
      "Awarded for the Durga Puja corporate celebration that achieved a 97% guest satisfaction score across five evenings — the highest ever recorded by the IEIA for a cultural event.",
    body: [
      {
        text: "The Indian Events Industry Association's Excellence in Cultural Production award evaluates events on four criteria: fidelity to cultural tradition, accessibility for diverse audiences, production quality, and measurable guest satisfaction. Our Durga Puja corporate celebration for a multinational client scored in the top percentile on all four.",
      },
      {
        text: "Working with master craftspeople from Kumartuli — Kolkata's historic idol-making district — we commissioned a contemporary pandal that honoured traditional forms while using sustainable materials and integrating modern theatrical lighting. The result was covered across 14 regional and national publications as one of the most beautiful corporate pandals of the season.",
        image:
          "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&h=380&fit=crop&auto=format",
        imageCaption: "The pandal on opening night",
      },
      {
        text: "A 97% guest satisfaction average across five evenings — with 5,000 total attendees — is the number we are most proud of. It reflects not just the design and production quality, but the cultural sensitivity and hospitality that every member of our team brings to events that carry this kind of personal significance for guests.",
      },
    ],
    inlineImages: [
      {
        src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
        caption: "Pandal design",
      },
      {
        src: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400&h=300&fit=crop",
        caption: "Cultural performance",
      },
      {
        src: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=400&h=300&fit=crop",
        caption: "Guest experience",
      },
    ],
  },
  {
    id: 5,
    title: "Best Brand Activation Campaign",
    year: 2023,
    category: "Brand Activation",
    issuedBy: "Marketing & Events Awards India",
    location: "Mumbai, India",
    heroImage:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=600&fit=crop&auto=format",
    summary:
      "Recognised for a mall activation campaign that reached 70,000 footfalls across six cities in ten days — converting at three times the category benchmark.",
    body: [
      {
        text: "The Marketing & Events Awards India jury evaluates brand activation on reach, conversion, creative originality, and budget efficiency. Our mall activation campaign for a consumer electronics brand hit the top score on three of four criteria — the first time in the award's history that a single campaign has achieved this.",
      },
      {
        text: "The campaign ran across six cities simultaneously, with a core creative idea that adapted to each location's retail culture rather than deploying a single national template. In Kolkata, the activation leaned into the city's love of music. In Bengaluru, it centred on tech. In Kochi, it connected to the festival calendar. The result was a campaign that felt locally relevant everywhere it ran.",
        image:
          "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?w=600&h=380&fit=crop&auto=format",
        imageCaption: "The Bengaluru activation at peak footfall",
      },
      {
        text: "70,000 footfalls, a conversion rate of 3x the category benchmark, and a social reach of 28 million impressions in ten days. The client extended the campaign for an additional four cities on the strength of the results — a brief that became one of our largest single activations to date.",
      },
    ],
    inlineImages: [
      {
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
        caption: "Campaign launch",
      },
      {
        src: "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?w=400&h=300&fit=crop",
        caption: "Activation zone",
      },
      {
        src: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=400&h=300&fit=crop",
        caption: "Consumer engagement",
      },
    ],
  },
];
