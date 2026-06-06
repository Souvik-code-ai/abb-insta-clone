export interface Client {
  id: number;
  name: string;
  initials: string;
  color: string;
  bgColor: string;
  seen: boolean;
  category: string;
  location: string;
  stories: { type: "image" | "video"; url: string; caption?: string }[];
}

export interface FeedPost {
  id: number;
  client: Client;
  location: string;
  category: string;
  images: string[];
  likes: number;
  caption: string;
  comments: { id: number; author: string; text: string; time: string }[];
  projectUrl: string;
  date: string;
}

export interface UpcomingEvent {
  id: number;
  clientName: string;
  clientInitials: string;
  clientColor: string;
  eventName: string;
  location: string;
  eventImage: string;
  eventType: string;
  daysRemaining: number;
  attendance: number;
  description: string;
}

export interface CaseStudy {
  id: number;
  thumbnail: string;
  clientInitials: string;
  clientColor: string;
  clientName: string;
  title: string;
  summary: string;
}

export interface Award {
  id: number;
  image: string;
  title: string;
  year: number;
  description: string;
}

export const clients: Client[] = [
  {
    id: 1,
    name: "Al Futtaim",
    initials: "AF",
    color: "#FF6B6B",
    bgColor: "#FFE8E8",
    seen: false,
    category: "Corporate Events",
    location: "Dubai, UAE",
    stories: [
      { type: "image", url: "https://images.unsplash.com/photo-1709423166198-cc44576fbe72?w=400&h=700&fit=crop&auto=format" },
    ],
  },
  {
    id: 2,
    name: "Emirates NBD",
    initials: "EN",
    color: "#4ECDC4",
    bgColor: "#E0F7F6",
    seen: true,
    category: "Banking & Finance",
    location: "Dubai, UAE",
    stories: [
      { type: "image", url: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&h=700&fit=crop&auto=format" },
    ],
  },
  {
    id: 3,
    name: "Dubai Mall",
    initials: "DM",
    color: "#45B7D1",
    bgColor: "#E0F4FA",
    seen: false,
    category: "Retail Activation",
    location: "Downtown Dubai",
    stories: [
      { type: "image", url: "https://images.unsplash.com/photo-1764380746818-18c01e96df12?w=400&h=700&fit=crop&auto=format" },
    ],
  },
  {
    id: 4,
    name: "Emaar",
    initials: "EM",
    color: "#A78BFA",
    bgColor: "#EDE9FE",
    seen: true,
    category: "Real Estate Events",
    location: "Dubai, UAE",
    stories: [
      { type: "image", url: "https://images.unsplash.com/photo-1674570979140-9adb58d4c194?w=400&h=700&fit=crop&auto=format" },
    ],
  },
  {
    id: 5,
    name: "Etihad Airways",
    initials: "EA",
    color: "#F59E0B",
    bgColor: "#FEF3C7",
    seen: false,
    category: "Aviation Events",
    location: "Abu Dhabi, UAE",
    stories: [
      { type: "image", url: "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?w=400&h=700&fit=crop&auto=format" },
    ],
  },
  {
    id: 6,
    name: "ADNOC",
    initials: "AD",
    color: "#10B981",
    bgColor: "#D1FAE5",
    seen: true,
    category: "Energy Sector",
    location: "Abu Dhabi, UAE",
    stories: [
      { type: "image", url: "https://images.unsplash.com/photo-1674570980068-730448e6ca0b?w=400&h=700&fit=crop&auto=format" },
    ],
  },
  {
    id: 7,
    name: "Aldar",
    initials: "AL",
    color: "#F97316",
    bgColor: "#FFEDD5",
    seen: false,
    category: "Property Events",
    location: "Abu Dhabi, UAE",
    stories: [
      { type: "image", url: "https://images.unsplash.com/photo-1757283582859-8e194707da16?w=400&h=700&fit=crop&auto=format" },
    ],
  },
  {
    id: 8,
    name: "MAF",
    initials: "MF",
    color: "#EC4899",
    bgColor: "#FCE7F3",
    seen: true,
    category: "Entertainment",
    location: "Dubai, UAE",
    stories: [
      { type: "image", url: "https://images.unsplash.com/photo-1768776185742-0cc9a057b195?w=400&h=700&fit=crop&auto=format" },
    ],
  },
  {
    id: 9,
    name: "du Telecom",
    initials: "DU",
    color: "#6366F1",
    bgColor: "#E0E7FF",
    seen: false,
    category: "Telecom Events",
    location: "Dubai, UAE",
    stories: [
      { type: "image", url: "https://images.unsplash.com/photo-1681497397524-0dabeca42094?w=400&h=700&fit=crop&auto=format" },
    ],
  },
  {
    id: 10,
    name: "ENOC",
    initials: "EC",
    color: "#14B8A6",
    bgColor: "#CCFBF1",
    seen: true,
    category: "Energy",
    location: "Dubai, UAE",
    stories: [
      { type: "image", url: "https://images.unsplash.com/photo-1750071021956-aab36f67f651?w=400&h=700&fit=crop&auto=format" },
    ],
  },
];

export const feedPosts: FeedPost[] = [
  {
    id: 1,
    client: clients[0],
    location: "Atlantis The Palm, Dubai",
    category: "Luxury Corporate Gala",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=630&h=630&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1709423166198-cc44576fbe72?w=630&h=630&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?w=630&h=630&fit=crop&auto=format",
    ],
    likes: 847,
    caption: "An unforgettable evening curated for Al Futtaim's Annual Leadership Summit. Every detail — from the bespoke floral installations to the custom lighting design — was crafted to reflect the brand's heritage and vision for tomorrow.",
    comments: [
      { id: 1, author: "Sarah M.", text: "Absolutely stunning! The venue transformation was breathtaking.", time: "2h" },
      { id: 2, author: "Khalid A.", text: "ABY never disappoints. Best event company in the region.", time: "4h" },
      { id: 3, author: "Priya R.", text: "Those floral installations were iconic!", time: "6h" },
    ],
    projectUrl: "https://abybabyevents.com/projects/al-futtaim-gala",
    date: "June 3, 2026",
  },
  {
    id: 2,
    client: clients[2],
    location: "Dubai Mall, Downtown Dubai",
    category: "Retail Brand Activation",
    images: [
      "https://images.unsplash.com/photo-1764380746818-18c01e96df12?w=630&h=630&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1674570979140-9adb58d4c194?w=630&h=630&fit=crop&auto=format",
    ],
    likes: 523,
    caption: "Dubai Mall's Ramadan Celebration brought families together for a magical evening of cultural experiences, gourmet dining, and spectacular entertainment. Over 3,000 guests attended this sold-out event.",
    comments: [
      { id: 1, author: "Fatima H.", text: "Such a beautiful event concept!", time: "1d" },
      { id: 2, author: "Omar K.", text: "The dessert table was a work of art.", time: "1d" },
    ],
    projectUrl: "https://abybabyevents.com/projects/dubai-mall-ramadan",
    date: "May 28, 2026",
  },
  {
    id: 3,
    client: clients[4],
    location: "Yas Island, Abu Dhabi",
    category: "Aviation Industry Conference",
    images: [
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=630&h=630&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=630&h=630&fit=crop&auto=format",
    ],
    likes: 391,
    caption: "Etihad Airways' Global Partners Summit brought together 500+ aviation leaders from 40 countries. The two-day event featured keynote sessions, networking dinners, and an exclusive product unveiling ceremony.",
    comments: [
      { id: 1, author: "James T.", text: "Exceptional execution from start to finish.", time: "2d" },
    ],
    projectUrl: "https://abybabyevents.com/projects/etihad-summit",
    date: "May 20, 2026",
  },
  {
    id: 4,
    client: clients[7],
    location: "City Walk, Dubai",
    category: "Luxury Baby Shower",
    images: [
      "https://images.unsplash.com/photo-1757283582859-8e194707da16?w=630&h=630&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1738631476299-5affb429854c?w=630&h=630&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1674570980068-730448e6ca0b?w=630&h=630&fit=crop&auto=format",
    ],
    likes: 1204,
    caption: "When luxury meets love — this breathtaking baby shower for the Al Marri family was a masterclass in bespoke event design. Hand-painted backdrops, custom cloud installations, and a floral arch that took 6 designers three days to create.",
    comments: [
      { id: 1, author: "Layla S.", text: "This is literally my dream event! 😍", time: "3d" },
      { id: 2, author: "Aisha M.", text: "Can you do my event next? Perfection.", time: "3d" },
      { id: 3, author: "Nour J.", text: "The floral arch alone is iconic.", time: "4d" },
      { id: 4, author: "Hessa A.", text: "I was there! Even better in person.", time: "4d" },
    ],
    projectUrl: "https://abybabyevents.com/projects/almarri-babyshower",
    date: "May 15, 2026",
  },
];

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: 1,
    clientName: "Emirates NBD",
    clientInitials: "EN",
    clientColor: "#4ECDC4",
    eventName: "Annual Banking Excellence Awards",
    location: "Burj Al Arab, Dubai",
    eventImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=250&fit=crop&auto=format",
    eventType: "Gala Awards Ceremony",
    daysRemaining: 12,
    attendance: 450,
    description: "A black-tie evening celebrating innovation and excellence in banking across the Middle East region.",
  },
  {
    id: 2,
    clientName: "Aldar Properties",
    clientInitials: "AL",
    clientColor: "#F97316",
    eventName: "Future Cities Exhibition",
    location: "ADNEC, Abu Dhabi",
    eventImage: "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=400&h=250&fit=crop&auto=format",
    eventType: "Exhibition & Conference",
    daysRemaining: 28,
    attendance: 2500,
    description: "A visionary showcase of tomorrow's urban developments featuring interactive installations and VIP property launches.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1709423166198-cc44576fbe72?w=400&h=250&fit=crop&auto=format",
    clientInitials: "AF",
    clientColor: "#FF6B6B",
    clientName: "Al Futtaim Group",
    title: "Redefining Corporate Hospitality: 500-Guest Leadership Gala",
    summary: "How we transformed a ballroom into an immersive brand universe for Al Futtaim's most important annual event.",
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1757283582859-8e194707da16?w=400&h=250&fit=crop&auto=format",
    clientInitials: "MF",
    clientColor: "#EC4899",
    clientName: "MAF Lifestyle",
    title: "The Luxury Baby Shower That Broke Instagram",
    summary: "A bespoke celebration that generated 2.4M organic impressions and set a new standard for luxury family events in the UAE.",
  },
];

export const awards: Award[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?w=400&h=200&fit=crop&auto=format",
    title: "Best Event Management Agency — UAE",
    year: 2025,
    description: "Awarded by Gulf Business Events Awards for outstanding creativity, execution excellence, and client satisfaction across 50+ premium events.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&h=200&fit=crop&auto=format",
    title: "Most Innovative Event Concept",
    year: 2024,
    description: "Recognised at the MENA Events Summit for pioneering immersive experiential design in luxury corporate events.",
  },
];
