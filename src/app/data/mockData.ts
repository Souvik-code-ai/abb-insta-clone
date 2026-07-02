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
export interface MediaItem {
  type: "image" | "video";
  url: string;
  poster?: string; // thumbnail for video, shown before playback / used in mini-profile grid
}
export interface FeedPost {
  id: number;
  client: Client;
  location: string;
  category: string;
  media: MediaItem[]; // replaces `images: string[]`
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
  clientlogo: string;
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
  clientlogo: string;
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
import dtlogo from "../../assets/drumtao/DrumTao/dtlogo.png";
import arunlogo from "../../assets/arun/arun_webp/arunlogo.png";
import mialogo from "../../assets/mia/mialogo.jpg";
import toyotalogo from "../../assets/zira/toyota_logo.webp";
export const clients: Client[] = [
  {
    id: 1,
    name: "Drum Tao",
    initials: dtlogo,
    color: "#FF6B6B",
    bgColor: "#FFE8E8",
    seen: false,
    category: "Japanese Entertainment Troupe",
    location: "Dubai, UAE",
    stories: [
      {
        type: "image",
        url: dt2,
      },
      {
        type: "image",
        url: dt3,
      },
      {
        type: "image",
        url: dt4,
      },
      {
        type: "image",
        url: dt5,
      },
    ],
  },
  {
    id: 2,
    name: "Arun",
    initials: arunlogo,
    color: "#4ECDC4",
    bgColor: "#E0F7F6",
    seen: true,
    category: "Brand Promotion",
    location: "Dubai, UAE",
    stories: [
      {
        type: "image",
        url: arun,
      },
      {
        type: "image",
        url: arun2,
      },
      {
        type: "image",
        url: arun3,
      },
      {
        type: "image",
        url: arun4,
      },
      {
        type: "image",
        url: arun5,
      },
      {
        type: "image",
        url: arun6,
      },
    ],
  },
  {
    id: 3,
    name: "Mia by tanishq",
    initials: mialogo,
    color: "#45B7D1",
    bgColor: "#E0F4FA",
    seen: false,
    category: "Brand Promotion",
    location: "Kolkata",
    stories: [
      {
        type: "image",
        url: mia1,
      },
      {
        type: "image",
        url: mia2,
      },
      {
        type: "image",
        url: mia3,
      },
      {
        type: "image",
        url: mia4,
      },
      {
        type: "image",
        url: mia1,
      },
    ],
  },
  {
    id: 4,
    name: "Toyota Zero",
    initials: toyotalogo,
    color: "#A78BFA",
    bgColor: "#EDE9FE",
    seen: true,
    category: "Festival",
    location: "Dubai, UAE",
    stories: [
      {
        type: "image",
        url: zira1,
      },
      {
        type: "image",
        url: zira2,
      },
      {
        type: "image",
        url: zira3,
      },
      {
        type: "image",
        url: zira4,
      },
    ],
  },
  {
    id: 5,
    name: "Drum Tao",
    initials: dtlogo,
    color: "#FF6B6B",
    bgColor: "#FFE8E8",
    seen: false,
    category: "Japanese entertainment troupe",
    location: "Dubai, UAE",
    stories: [
      {
        type: "image",
        url: dt2,
      },
      {
        type: "image",
        url: dt3,
      },
      {
        type: "image",
        url: dt4,
      },
      {
        type: "image",
        url: dt5,
      },
    ],
  },
  {
    id: 6,
    name: "Arun",
    initials: arunlogo,
    color: "#4ECDC4",
    bgColor: "#E0F7F6",
    seen: true,
    category: "Brand Promotion",
    location: "Dubai, UAE",
    stories: [
      {
        type: "image",
        url: arun,
      },
      {
        type: "image",
        url: arun2,
      },
      {
        type: "image",
        url: arun3,
      },
      {
        type: "image",
        url: arun4,
      },
      {
        type: "image",
        url: arun5,
      },
      {
        type: "image",
        url: arun6,
      },
    ],
  },
  {
    id: 7,
    name: "Mia by tanishq",
    initials: mialogo,
    color: "#45B7D1",
    bgColor: "#E0F4FA",
    seen: false,
    category: "Brand Promotion",
    location: "Kolkata",
    stories: [
      {
        type: "image",
        url: mia1,
      },
      {
        type: "image",
        url: mia2,
      },
      {
        type: "image",
        url: mia3,
      },
      {
        type: "image",
        url: mia4,
      },
      {
        type: "image",
        url: mia1,
      },
    ],
  },
  {
    id: 8,
    name: "Toyota Zero",
    initials: toyotalogo,
    color: "#A78BFA",
    bgColor: "#EDE9FE",
    seen: true,
    category: "Festival",
    location: "Dubai, UAE",
    stories: [
      {
        type: "image",
        url: zira1,
      },
      {
        type: "image",
        url: zira2,
      },
      {
        type: "image",
        url: zira3,
      },
      {
        type: "image",
        url: zira4,
      },
    ],
  },
  {
    id: 9,
    name: "Drum Tao",
    initials: dtlogo,
    color: "#FF6B6B",
    bgColor: "#FFE8E8",
    seen: false,
    category: "Japanese entertainment troupe",
    location: "Dubai, UAE",
    stories: [
      {
        type: "image",
        url: dt2,
      },
      {
        type: "image",
        url: dt3,
      },
      {
        type: "image",
        url: dt4,
      },
      {
        type: "image",
        url: dt5,
      },
    ],
  },
  {
    id: 10,
    name: "Arun",
    initials: arunlogo,
    color: "#4ECDC4",
    bgColor: "#E0F7F6",
    seen: true,
    category: "Brand Promotion",
    location: "Dubai, UAE",
    stories: [
      {
        type: "image",
        url: arun,
      },
      {
        type: "image",
        url: arun2,
      },
      {
        type: "image",
        url: arun3,
      },
      {
        type: "image",
        url: arun4,
      },
      {
        type: "image",
        url: arun5,
      },
      {
        type: "image",
        url: arun6,
      },
    ],
  },
  {
    id: 11,
    name: "Mia by tanishq",
    initials: mialogo,
    color: "#45B7D1",
    bgColor: "#E0F4FA",
    seen: false,
    category: "Brand Promotion",
    location: "Kolkata",
    stories: [
      {
        type: "image",
        url: mia1,
      },
      {
        type: "image",
        url: mia2,
      },
      {
        type: "image",
        url: mia3,
      },
      {
        type: "image",
        url: mia4,
      },
      {
        type: "image",
        url: mia1,
      },
    ],
  },
  {
    id: 12,
    name: "Toyota Zero",
    initials: toyotalogo,
    color: "#A78BFA",
    bgColor: "#EDE9FE",
    seen: true,
    category: "Festival",
    location: "Dubai, UAE",
    stories: [
      {
        type: "image",
        url: zira1,
      },
      {
        type: "image",
        url: zira2,
      },
      {
        type: "image",
        url: zira3,
      },
      {
        type: "image",
        url: zira4,
      },
    ],
  },
];
import dt2 from "../../assets/drumtao/DrumTao/dt2.webp";
import arun2 from "../../assets/arun/arun_webp/arun2.webp";
import dt3 from "../../assets/drumtao/DrumTao/dt3.webp";
import dt4 from "../../assets/drumtao/DrumTao/dt4.webp";
import dt5 from "../../assets/drumtao/DrumTao/dt5.webp";
import arun from "../../assets/arun/arun_webp/arun.webp";

import arun3 from "../../assets/arun/arun_webp/arun3.webp";
import arun4 from "../../assets/arun/arun_webp/arun4.webp";
import arun5 from "../../assets/arun/arun_webp/arun5.webp";
import arun6 from "../../assets/arun/arun_webp/arun6.webp";
import mia1 from "../../assets/mia/mia 1.webp";
import mia2 from "../../assets/mia/mia 2.webp";
import mia3 from "../../assets/mia/mia2.webp";
import mia4 from "../../assets/mia/mia3.webp";
import zira1 from "../../assets/zira/zira1.webp";
import zira2 from "../../assets/zira/zira2.webp";
import zira3 from "../../assets/zira/zira3.webp";
import zira4 from "../../assets/zira/zira4.webp";
import dtvdo from "../../assets/drumtao/DrumTao/dtvdo.mp4";
import arunvdo from "../../assets/drumtao/DrumTao/dtvdo.mp4";
import miavdo from "../../assets/drumtao/DrumTao/dtvdo.mp4";
import ziravdo from "../../assets/drumtao/DrumTao/dtvdo.mp4";
// export const feedPosts: FeedPost[] = [
//   {
//     id: 1,
//     client: clients[0],
//     location: "Kolkata",
//     category: "Japanese Entertainment Troupe",
//     images: [dt2, dt3, dt4, dt5],
//     likes: 847,
//     caption:
//       "Drum TAO is an internationally acclaimed Japanese performance group renowned for its breathtaking fusion of traditional Taiko drumming, contemporary choreography, martial arts, and theatrical storytelling. Every performance delivers a powerful blend of rhythm, precision, and visual artistry, creating an unforgettable cultural experience for audiences worldwide.",
//     comments: [
//       {
//         id: 1,
//         author: "Sarah M.",
//         text: "Absolutely stunning! The venue transformation was breathtaking.",
//         time: "2h",
//       },
//       {
//         id: 2,
//         author: "Khalid A.",
//         text: "ABY never disappoints. Best event company in the region.",
//         time: "4h",
//       },
//       {
//         id: 3,
//         author: "Priya R.",
//         text: "Those floral installations were iconic!",
//         time: "6h",
//       },
//     ],
//     projectUrl: "https://abybabyevents.com/projects/al-futtaim-gala",
//     date: "June 3, 2026",
//   },
//   {
//     id: 2,
//     client: clients[1],
//     location: "Kolkata",
//     category: "Brand Activation",
//     images: [arun, arun2, arun3, arun4, arun5, arun6],
//     likes: 523,
//     caption:
//       "Arun Ice Cream is one of India's most loved ice cream brands, known for its rich flavors, premium quality, and delightful taste. Through engaging brand promotion activities, Arun Ice Cream connects with families, children, and young adults by creating memorable experiences that celebrate happiness and togetherness.",
//     comments: [
//       {
//         id: 1,
//         author: "Fatima H.",
//         text: "Such a beautiful event concept!",
//         time: "1d",
//       },
//       {
//         id: 2,
//         author: "Omar K.",
//         text: "The dessert table was a work of art.",
//         time: "1d",
//       },
//     ],
//     projectUrl: "https://abybabyevents.com/projects/dubai-mall-ramadan",
//     date: "May 28, 2026",
//   },
//   {
//     id: 3,
//     client: clients[2],
//     location: "Kolkata",
//     category: "Brand Activation",
//     images: [mia1, mia2, mia3, mia4],
//     likes: 391,
//     caption:
//       "Mia by Tanishq is a contemporary fine jewellery brand that celebrates individuality, confidence, and everyday elegance. Designed for modern women, Mia offers lightweight, stylish, and versatile jewellery crafted in gold and adorned with diamonds and precious gemstones, making it perfect for both daily wear and special occasions.",
//     comments: [
//       {
//         id: 1,
//         author: "James T.",
//         text: "Exceptional execution from start to finish.",
//         time: "2d",
//       },
//     ],
//     projectUrl: "https://abybabyevents.com/projects/etihad-summit",
//     date: "May 20, 2026",
//   },
//   {
//     id: 4,
//     client: clients[3],
//     location: "Assam,India",
//     category: "Festival ",
//     images: [zira1, zira2, zira3, zira4],
//     likes: 1204,
//     caption:
//       "Toyota Zero represents Toyota's vision of achieving a cleaner, safer, and more sustainable future through innovation and advanced mobility solutions. The initiative highlights the brand's commitment to reducing emissions, promoting environmentally responsible transportation, and advancing technologies that contribute to a zero-emission future.",
//     comments: [
//       {
//         id: 1,
//         author: "Layla S.",
//         text: "This is literally my dream event! 😍",
//         time: "3d",
//       },
//       {
//         id: 2,
//         author: "Aisha M.",
//         text: "Can you do my event next? Perfection.",
//         time: "3d",
//       },
//       {
//         id: 3,
//         author: "Nour J.",
//         text: "The floral arch alone is iconic.",
//         time: "4d",
//       },
//       {
//         id: 4,
//         author: "Hessa A.",
//         text: "I was there! Even better in person.",
//         time: "4d",
//       },
//     ],
//     projectUrl: "https://abybabyevents.com/projects/almarri-babyshower",
//     date: "May 15, 2026",
//   },
// ];
export const feedPosts: FeedPost[] = [
  {
    id: 1,
    client: clients[0],
    location: "Kolkata",
    category: "Japanese Entertainment Troupe",
    media: [
      { type: "image", url: dt2 },
      { type: "video", url: dtvdo, poster: dt3 },
      { type: "image", url: dt4 },
      { type: "image", url: dt5 },
    ],
    likes: 847,
    caption:
      "Drum TAO is an internationally acclaimed Japanese performance group renowned for its breathtaking fusion of traditional Taiko drumming, contemporary choreography, martial arts, and theatrical storytelling. Every performance delivers a powerful blend of rhythm, precision, and visual artistry, creating an unforgettable cultural experience for audiences worldwide.",
    comments: [
      {
        id: 1,
        author: "Sarah M.",
        text: "Absolutely stunning! The venue transformation was breathtaking.",
        time: "2h",
      },
      {
        id: 2,
        author: "Khalid A.",
        text: "ABY never disappoints. Best event company in the region.",
        time: "4h",
      },
      {
        id: 3,
        author: "Priya R.",
        text: "Those floral installations were iconic!",
        time: "6h",
      },
    ],
    projectUrl: "https://abybabyevents.com/projects/al-futtaim-gala",
    date: "June 3, 2026",
  },
  {
    id: 2,
    client: clients[1],
    location: "Kolkata",
    category: "Brand Activation",
    media: [
      { type: "image", url: arun },
      { type: "image", url: arun2 },
      { type: "video", url: arunvdo, poster: arun3 },
      { type: "image", url: arun4 },
      { type: "image", url: arun5 },
      { type: "image", url: arun6 },
    ],
    likes: 523,
    caption:
      "Arun Ice Cream is one of India's most loved ice cream brands, known for its rich flavors, premium quality, and delightful taste. Through engaging brand promotion activities, Arun Ice Cream connects with families, children, and young adults by creating memorable experiences that celebrate happiness and togetherness.",
    comments: [
      {
        id: 1,
        author: "Fatima H.",
        text: "Such a beautiful event concept!",
        time: "1d",
      },
      {
        id: 2,
        author: "Omar K.",
        text: "The dessert table was a work of art.",
        time: "1d",
      },
    ],
    projectUrl: "https://abybabyevents.com/projects/dubai-mall-ramadan",
    date: "May 28, 2026",
  },
  {
    id: 3,
    client: clients[2],
    location: "Kolkata",
    category: "Brand Activation",
    media: [
      { type: "image", url: mia1 },
      { type: "video", url: miavdo, poster: mia2 },
      { type: "image", url: mia3 },
      { type: "image", url: mia4 },
    ],
    likes: 391,
    caption:
      "Mia by Tanishq is a contemporary fine jewellery brand that celebrates individuality, confidence, and everyday elegance. Designed for modern women, Mia offers lightweight, stylish, and versatile jewellery crafted in gold and adorned with diamonds and precious gemstones, making it perfect for both daily wear and special occasions.",
    comments: [
      {
        id: 1,
        author: "James T.",
        text: "Exceptional execution from start to finish.",
        time: "2d",
      },
    ],
    projectUrl: "https://abybabyevents.com/projects/etihad-summit",
    date: "May 20, 2026",
  },
  {
    id: 4,
    client: clients[3],
    location: "Assam,India",
    category: "Festival ",
    media: [
      { type: "image", url: zira1 },
      { type: "image", url: zira2 },
      { type: "video", url: ziravdo, poster: zira3 },
      { type: "image", url: zira4 },
    ],
    likes: 1204,
    caption:
      "Toyota Zero represents Toyota's vision of achieving a cleaner, safer, and more sustainable future through innovation and advanced mobility solutions. The initiative highlights the brand's commitment to reducing emissions, promoting environmentally responsible transportation, and advancing technologies that contribute to a zero-emission future.",
    comments: [
      {
        id: 1,
        author: "Layla S.",
        text: "This is literally my dream event! 😍",
        time: "3d",
      },
      {
        id: 2,
        author: "Aisha M.",
        text: "Can you do my event next? Perfection.",
        time: "3d",
      },
      {
        id: 3,
        author: "Nour J.",
        text: "The floral arch alone is iconic.",
        time: "4d",
      },
      {
        id: 4,
        author: "Hessa A.",
        text: "I was there! Even better in person.",
        time: "4d",
      },
    ],
    projectUrl: "https://abybabyevents.com/projects/almarri-babyshower",
    date: "May 15, 2026",
  },
];
export const upcomingEvents: UpcomingEvent[] = [
  {
    id: 1,
    clientName: "Toyota",
    clientInitials: "DT",
    clientColor: "#4ECDC4",
    clientlogo: dtlogo,
    eventName: "Drum Tao",
    location: "Kolkata",
    eventImage: dt2,
    eventType: "Japanase Entertainment Trope",
    daysRemaining: 12,
    attendance: 450,
    description:
      "A black-tie evening celebrating innovation and excellence in banking across the Middle East region.",
  },
  {
    id: 2,
    clientName: "Arun Icecream ",
    clientInitials: "AI",
    clientColor: "#F97316",
    clientlogo: arunlogo,
    eventName: "Arun Icecream Promotion",
    location: "Kolkata",
    eventImage: arun2,
    eventType: "Brand Promotion",
    daysRemaining: 28,
    attendance: 2500,
    description:
      "A visionary showcase of tomorrow's urban developments featuring interactive installations and VIP property launches.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    thumbnail: arun4,
    clientInitials: "AI",
    clientColor: "#FF6B6B",
    clientlogo: arunlogo,
    clientName: "Arun Icecream",
    title: "Arun Icecream Promotion",
    summary:
      "How we transformed a ballroom into an immersive brand universe for Al Futtaim's most important annual event.",
  },
  {
    id: 2,
    thumbnail: mia1,
    clientInitials: "MT",
    clientColor: "#EC4899",
    clientlogo: mialogo,
    clientName: "Tanishq",
    title: "Mia by Tanishq",
    summary:
      "A bespoke celebration that generated 2.4M organic impressions and set a new standard for luxury family events in the UAE.",
  },
];

export const awards: Award[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?w=400&h=200&fit=crop&auto=format",
    title: "Best Event Management Agency — UAE",
    year: 2025,
    description:
      "Awarded by Gulf Business Events Awards for outstanding creativity, execution excellence, and client satisfaction across 50+ premium events.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&h=200&fit=crop&auto=format",
    title: "Most Innovative Event Concept",
    year: 2024,
    description:
      "Recognised at the MENA Events Summit for pioneering immersive experiential design in luxury corporate events.",
  },
];
