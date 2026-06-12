// import { useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Download,
//   ExternalLink,
//   BarChart2,
//   Lightbulb,
//   HelpCircle,
// } from "lucide-react";

// const STATS = [
//   { label: "Years", value: "12+" },
//   { label: "Clients", value: "340+" },
//   { label: "Projects", value: "820+" },
// ];

// const CAROUSEL_ITEMS = [
//   {
//     id: 1,
//     title: "Annual Gala 2024",
//     category: "Events",
//     image:
//       "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=360&fit=crop&auto=format",
//   },
//   {
//     id: 2,
//     title: "Brand Activation",
//     category: "Activation",
//     image:
//       "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?w=600&h=360&fit=crop&auto=format",
//   },
//   {
//     id: 3,
//     title: "Digital Campaign",
//     category: "Digital",
//     image:
//       "https://images.unsplash.com/photo-1709423166198-cc44576fbe72?w=600&h=360&fit=crop&auto=format",
//   },
//   {
//     id: 4,
//     title: "Exhibition Stand",
//     category: "Exhibition",
//     image:
//       "https://images.unsplash.com/photo-1764380746818-18c01e96df12?w=600&h=360&fit=crop&auto=format",
//   },
//   {
//     id: 5,
//     title: "Product Launch",
//     category: "Events",
//     image:
//       "https://images.unsplash.com/photo-1674570979140-9adb58d4c194?w=600&h=360&fit=crop&auto=format",
//   },
// ];

// const SERVICES = [
//   {
//     emoji: "🎪",
//     title: "Event Management",
//     desc: "Full-scale event planning, logistics and on-site execution.",
//   },
//   {
//     emoji: "📱",
//     title: "Digital Presence",
//     desc: "Social media strategy, content creation and paid campaigns.",
//   },
//   {
//     emoji: "🖥️",
//     title: "Exhibition Design",
//     desc: "Custom stand design, build and project management.",
//   },
//   {
//     emoji: "⚡",
//     title: "Brand Activation",
//     desc: "Experiential activations that connect brands with audiences.",
//   },
//   {
//     emoji: "🌍",
//     title: "Global Presence",
//     desc: "International event support across 40+ countries.",
//   },
// ];

// const VISIBLE = 3;

// export function ProfileView() {
//   const [offset, setOffset] = useState(0);
//   const canPrev = offset > 0;
//   const canNext = offset + VISIBLE < CAROUSEL_ITEMS.length;
//   const visible = CAROUSEL_ITEMS.slice(offset, offset + VISIBLE);

//   return (
//     <div
//       className="flex flex-col pb-12 px-4 pt-4  w-[100%] min-[1160px]:mx-50 min-[770px]:mx-16 mx-0 "
//       // style={{ fontFamily: "var(--font-family-body)" }}
//     >
//       {/* Hero */}
//       <div className="flex flex-col center items-start ">
//         {" "}
//         <div className="flex flex-row items-center py-10 px-4 gap-5 justify-center">
//           {/* Logo */}
//           <div
//             className="rounded-full flex items-center justify-center mb-4 md:h-24 md:w-24 h-16 w-16"
//             style={{

//               background:
//                 "linear-gradient(135deg, var(--accent) 0%, #f9a8c9 100%)",
//             }}
//           >
//             <span
//               style={{
//                 color: "#fff",
//                 fontFamily: "var(--font-family-display)",

//               }}
//               className="lg:text-3xl md:text-xl text-base"
//             >
//               A
//             </span>
//           </div>
//           <div className="flex flex-col justfy-center items-start gap-0.5">
//             {" "}
//             <h1
//               style={{
//                 fontFamily: "var(--font-family-body)",

//                 color: "var(--foreground)",
//               }}
//               className="lg:text-3xl md:text-2xl text-xl"
//             >
//               Abybaby Events
//             </h1>
//             <p
//               style={{
//                 fontSize: 13,
//                 color: "var(--muted-foreground)",
//               }}
//             >
//               Award-winning event & brand experience agency
//             </p>
//             <div className="flex gap-8">
//               {STATS.map(({ label, value }) => (
//                 <div key={label} className="flex flex-col items-center">
//                   <span
//                     style={{
//                       fontWeight: 700,
//                       color: "var(--accent)",
//                       fontFamily: "var(--font-family-body)",
//                     }}
//                   >
//                     {value}
//                   </span>
//                   <span
//                     style={{ fontSize: 12, color: "var(--muted-foreground)" }}
//                   >
//                     {label}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Stats */}
//         </div>
//         <div className="flex flex-row justify-center items-between w-full gap-3 cursor-pointer">
//           {" "}
//           <button
//             className="w-[45%] rounded-md py-3 flex items-center justify-center gap-2 transition-opacity cursor-pointer"
//             style={{
//               background: "var(--accent)",
//               color: "#fff",
//               fontSize: 13,
//               fontWeight: 600,
//             }}
//             onMouseEnter={(e) =>
//               ((e.currentTarget as HTMLButtonElement).style.opacity = "0.88")
//             }
//             onMouseLeave={(e) =>
//               ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
//             }
//           >
//             <ExternalLink size={14} />
//             View Portfolio
//           </button>
//           {/* Download Portfolio */}
//           <button
//             className="w-[45%] rounded-md py-3 flex items-center justify-center gap-2 transition-opacity cursor-pointer"
//             style={{
//               background: "color-mix(in srgb, var(--accent) 10%, transparent)",
//               color: "var(--accent)",
//               fontSize: 13,
//               fontWeight: 600,
//             }}
//             onMouseEnter={(e) =>
//               ((e.currentTarget as HTMLButtonElement).style.opacity = "0.75")
//             }
//             onMouseLeave={(e) =>
//               ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
//             }
//           >
//             <Download size={14} />
//             Download Portfolio
//           </button>
//         </div>
//       </div>

//       {/* Finite carousel */}
//       <div className="px-4 py-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2
//             style={{
//               fontSize: 15,
//               fontWeight: 700,
//               color: "var(--foreground)",
//             }}
//           >
//             Featured Work
//           </h2>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setOffset((o) => Math.max(0, o - 1))}
//               disabled={!canPrev}
//               className="flex items-center justify-center rounded-full border border-border"
//               style={{
//                 width: 30,
//                 height: 30,
//                 opacity: canPrev ? 1 : 0.3,
//                 background: "var(--background)",
//               }}
//             >
//               <ChevronLeft size={14} />
//             </button>
//             <button
//               onClick={() =>
//                 setOffset((o) =>
//                   Math.min(CAROUSEL_ITEMS.length - VISIBLE, o + 1),
//                 )
//               }
//               disabled={!canNext}
//               className="flex items-center justify-center rounded-full border border-border"
//               style={{
//                 width: 30,
//                 height: 30,
//                 opacity: canNext ? 1 : 0.3,
//                 background: "var(--background)",
//               }}
//             >
//               <ChevronRight size={14} />
//             </button>
//           </div>
//         </div>

//         <div className="flex gap-3 overflow-hidden">
//           <AnimatePresence mode="popLayout" initial={false}>
//             {visible.map((item) => (
//               <motion.div
//                 key={item.id}
//                 layout
//                 initial={{ opacity: 0, x: 30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -30 }}
//                 transition={{ duration: 0.25 }}
//                 className="rounded-xl overflow-hidden shrink-0 flex-1"
//                 style={{ minWidth: 0 }}
//               >
//                 <div style={{ aspectRatio: "16/10", position: "relative" }}>
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div
//                     className="absolute inset-0 flex flex-col justify-end p-3"
//                     style={{
//                       background:
//                         "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
//                     }}
//                   >
//                     <span
//                       style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}
//                     >
//                       {item.title}
//                     </span>
//                     <span
//                       style={{ color: "rgba(255,255,255,0.7)", fontSize: 10 }}
//                     >
//                       {item.category}
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Two-column section */}
//       <div className="flex gap-6 px-4">
//         {/* Left: Our Services */}
//         <div className="flex flex-col gap-3" style={{ flex: 1, minWidth: 0 }}>
//           <h2
//             style={{
//               fontSize: 15,
//               fontWeight: 700,
//               color: "var(--foreground)",
//               marginBottom: 4,
//             }}
//           >
//             Our Services
//           </h2>
//           {SERVICES.map(({ emoji, title, desc }) => (
//             <div
//               key={title}
//               className="flex gap-3 items-start rounded-xl p-3"
//               style={{
//                 background:
//                   "color-mix(in srgb, var(--accent) 4%, var(--background))",
//               }}
//             >
//               <span style={{ fontSize: 20, lineHeight: 1.4, flexShrink: 0 }}>
//                 {emoji}
//               </span>
//               <div>
//                 <div
//                   style={{
//                     fontSize: 13,
//                     fontWeight: 600,
//                     color: "var(--foreground)",
//                     marginBottom: 2,
//                   }}
//                 >
//                   {title}
//                 </div>
//                 <div
//                   style={{
//                     fontSize: 11,
//                     color: "var(--muted-foreground)",
//                     lineHeight: 1.5,
//                   }}
//                 >
//                   {desc}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Right: About / Actions */}
//         <div className="flex flex-col gap-3" style={{ flex: 1, minWidth: 0 }}>
//           <h2
//             style={{
//               fontSize: 15,
//               fontWeight: 700,
//               color: "var(--foreground)",
//               marginBottom: 4,
//             }}
//           >
//             About Us
//           </h2>

//           {/* Why About Us */}
//           <div
//             className="rounded-xl p-4"
//             style={{
//               background:
//                 "color-mix(in srgb, var(--accent) 6%, var(--background))",
//             }}
//           >
//             <div className="flex items-center gap-2 mb-2">
//               <HelpCircle size={14} style={{ color: "var(--accent)" }} />
//               <span
//                 style={{
//                   fontSize: 13,
//                   fontWeight: 600,
//                   color: "var(--foreground)",
//                 }}
//               >
//                 Why Us
//               </span>
//             </div>
//             <p
//               style={{
//                 fontSize: 12,
//                 color: "var(--muted-foreground)",
//                 lineHeight: 1.6,
//               }}
//             >
//               Over 12 years of award-winning experience delivering world-class
//               brand experiences across events, digital and exhibitions.
//             </p>
//           </div>

//           {/* Analysis & Implementation */}
//           <div
//             className="rounded-xl p-4"
//             style={{
//               background:
//                 "color-mix(in srgb, var(--accent) 6%, var(--background))",
//             }}
//           >
//             <div className="flex items-center gap-2 mb-2">
//               <BarChart2 size={14} style={{ color: "var(--accent)" }} />
//               <span
//                 style={{
//                   fontSize: 13,
//                   fontWeight: 600,
//                   color: "var(--foreground)",
//                 }}
//               >
//                 Analysis & Implementation
//               </span>
//             </div>
//             <p
//               style={{
//                 fontSize: 12,
//                 color: "var(--muted-foreground)",
//                 lineHeight: 1.6,
//               }}
//             >
//               Data-driven strategy paired with flawless execution — from initial
//               brief to post-event reporting.
//             </p>
//           </div>

//           {/* View Portfolio */}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  BarChart2,
  HelpCircle,
  Play,
  X,
  Grid,
  Film,
  Image,
  Heart,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import logo from "../../assets/logo.jpg";
import Portfolio from "../../assets/ABYBABY BROCHURE.pdf";
// ── Static data ───────────────────────────────────────────────────────────────
import { ArrowRight } from "lucide-react";
const STATS = [
  { label: "Years", value: "12+" },
  { label: "Clients", value: "340+" },
  { label: "Projects", value: "820+" },
];
import { useEffect } from "react";
const CAROUSEL_ITEMS = [
  {
    id: 1,
    title: "Annual Gala 2024",
    category: "Events",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "Brand Activation",
    category: "Activation",
    image:
      "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "Digital Campaign",
    category: "Digital",
    image:
      "https://images.unsplash.com/photo-1709423166198-cc44576fbe72?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: 4,
    title: "Exhibition Stand",
    category: "Exhibition",
    image:
      "https://images.unsplash.com/photo-1764380746818-18c01e96df12?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: 5,
    title: "Product Launch",
    category: "Events",
    image:
      "https://images.unsplash.com/photo-1674570979140-9adb58d4c194?w=600&h=360&fit=crop&auto=format",
  },
];

const SERVICES = [
  {
    emoji: "🎪",
    title: "Event Management",
    desc: "Full-scale event planning, logistics and on-site execution.",
  },
  {
    emoji: "📱",
    title: "Digital Presence",
    desc: "Social media strategy, content creation and paid campaigns.",
  },
  {
    emoji: "🖥️",
    title: "Exhibition Design",
    desc: "Custom stand design, build and project management.",
  },
  {
    emoji: "⚡",
    title: "Brand Activation",
    desc: "Experiential activations that connect brands with audiences.",
  },
  {
    emoji: "🌍",
    title: "Global Presence",
    desc: "International event support across 40+ countries.",
  },
];

// ── Media data ────────────────────────────────────────────────────────────────

type MediaItem = {
  id: number;
  type: "image" | "reel";
  src: string;
  caption: string;
  likes: number;
  comments: number;
  category: string;
};

const REELS_DATA: MediaItem[] = [
  {
    id: 101,
    type: "reel",
    src: "https://images.unsplash.com/photo-1674570979140-9adb58d4c194?w=400&h=700&fit=crop",
    caption: "Behind the scenes — Product Launch setup timelapse.",
    likes: 1230,
    comments: 88,
    category: "Events",
  },
  {
    id: 102,
    type: "reel",
    src: "https://images.unsplash.com/photo-1709423166198-cc44576fbe72?w=400&h=700&fit=crop",
    caption: "Digital Campaign reel — 48 hours of content creation.",
    likes: 980,
    comments: 62,
    category: "Digital",
  },
  {
    id: 103,
    type: "reel",
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=700&fit=crop",
    caption: "Annual Gala highlight reel — the moments that mattered.",
    likes: 2100,
    comments: 143,
    category: "Events",
  },
  {
    id: 104,
    type: "reel",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=700&fit=crop",
    caption: "Zero Festival vibes — energy like no other.",
    likes: 1750,
    comments: 109,
    category: "Festival",
  },
  {
    id: 105,
    type: "reel",
    src: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400&h=700&fit=crop",
    caption: "Durga Puja reel — colours, lights and devotion.",
    likes: 3200,
    comments: 218,
    category: "Cultural",
  },
  {
    id: 106,
    type: "reel",
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=700&fit=crop",
    caption: "Heritage Dance Night — 60-second highlight.",
    likes: 890,
    comments: 55,
    category: "Cultural",
  },
];

const IMAGES_DATA: MediaItem[] = [
  {
    id: 1,
    type: "image",
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=400&fit=crop",
    caption: "Annual Gala 2024 — a night to remember with 600+ guests.",
    likes: 312,
    comments: 28,
    category: "Events",
  },
  {
    id: 2,
    type: "image",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop",
    caption: "Zero Festival Opening Gala — lights, music and energy.",
    likes: 540,
    comments: 41,
    category: "Festival",
  },
  {
    id: 3,
    type: "image",
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=400&fit=crop",
    caption: "Innovation Tech Conference — 720 leaders, one stage.",
    likes: 278,
    comments: 19,
    category: "Conference",
  },
  {
    id: 4,
    type: "image",
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop",
    caption: "EV SUV Grand Reveal — electric dreams become reality.",
    likes: 690,
    comments: 57,
    category: "Product Launch",
  },
  {
    id: 5,
    type: "image",
    src: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=400&h=400&fit=crop",
    caption: "Tata Bandhan Family Day — celebrating togetherness.",
    likes: 445,
    comments: 33,
    category: "Cultural",
  },
  {
    id: 6,
    type: "image",
    src: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400&h=400&fit=crop",
    caption: "Durga Puja Celebration — colour, culture and community.",
    likes: 812,
    comments: 74,
    category: "Cultural",
  },
  {
    id: 7,
    type: "image",
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
    caption: "Heritage Dance Night — 320 guests moved by tradition.",
    likes: 234,
    comments: 16,
    category: "Cultural",
  },
  {
    id: 8,
    type: "image",
    src: "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?w=400&h=400&fit=crop",
    caption: "Brand Activation in Bengaluru — live, loud and unforgettable.",
    likes: 367,
    comments: 24,
    category: "Activation",
  },
  {
    id: 9,
    type: "image",
    src: "https://images.unsplash.com/photo-1764380746818-18c01e96df12?w=400&h=400&fit=crop",
    caption: "Exhibition stand for TechWorld 2024 — 3,200 sqft of wow.",
    likes: 198,
    comments: 11,
    category: "Exhibition",
  },
];

// Posts = all images + all reels combined
const POSTS_DATA: MediaItem[] = [...IMAGES_DATA, ...REELS_DATA];

const VISIBLE = 3;

// ── Lightbox ──────────────────────────────────────────────────────────────────

function MediaLightbox({
  items,
  startIndex,
  onClose,
}: {
  items: MediaItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const item = items[idx];

  const prev = () => setIdx((i) => Math.max(0, i - 1));
  const next = () => setIdx((i) => Math.min(items.length - 1, i + 1));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.94)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#fff",
          zIndex: 10,
        }}
      >
        <X size={18} />
      </button>

      {/* Category badge */}
      <div
        style={{
          position: "absolute",
          top: 18,
          right: 18,
          zIndex: 10,
          background: "#579F63",
          borderRadius: 20,
          padding: "4px 14px",
          fontSize: 11,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "0.03em",
        }}
      >
        {item.category}
      </div>

      {/* Prev */}
      {idx > 0 && (
        <button
          onClick={prev}
          aria-label="Previous"
          style={{
            position: "absolute",
            left: 18,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Next */}
      {idx < items.length - 1 && (
        <button
          onClick={next}
          aria-label="Next"
          style={{
            position: "absolute",
            right: 18,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Media */}
      <div
        style={{
          position: "relative",
          width: item.type === "reel" ? "min(88vw, 360px)" : "min(88vw, 520px)",
          aspectRatio: item.type === "reel" ? "9/16" : "1/1",
          borderRadius: 12,
          overflow: "hidden",
          background: "#111",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={item.id}
            src={item.src}
            alt={item.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AnimatePresence>

        {/* Reel play icon */}
        {item.type === "reel" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Play size={24} fill="#fff" stroke="none" />
            </div>
          </div>
        )}

        {/* Bottom gradient */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "42%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.82), transparent)",
            pointerEvents: "none",
          }}
        />

        {/* Caption + stats */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 14,
            right: 14,
            zIndex: 5,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: "#fff",
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            {item.caption}
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
            <span
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.8)",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Heart size={13} fill="#d4456a" stroke="none" />
              {item.likes.toLocaleString()}
            </span>
            <span
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.8)",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <MessageCircle size={13} stroke="rgba(255,255,255,0.8)" />
              {item.comments}
            </span>
          </div>
        </div>

        {/* Dot counter */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 5,
            zIndex: 5,
          }}
        >
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: i === idx ? 18 : 6,
                height: 6,
                borderRadius: 3,
                background: i === idx ? "#fff" : "rgba(255,255,255,0.4)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.2s",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Grid cell ─────────────────────────────────────────────────────────────────

function GridCell({ item, onClick }: { item: MediaItem; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      style={{
        position: "relative",
        aspectRatio: item.type === "reel" ? "9/16" : "1/1",
        borderRadius: 0,
        overflow: "hidden",
        cursor: "pointer",
        background: "#f5f5f7",
      }}
    >
      <img
        src={item.src}
        alt={item.caption.slice(0, 40)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Reel badge */}
      {item.type === "reel" && (
        <div
          style={{
            position: "absolute",
            top: 7,
            right: 7,
            background: "rgba(0,0,0,0.55)",
            borderRadius: 6,
            padding: "3px 6px",
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Play size={10} fill="#fff" stroke="none" />
          {/* <span style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>
            REEL
          </span> */}
        </div>
      )}

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.48)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", gap: 20 }}>
              <span
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Heart size={16} fill="#fff" stroke="none" />
                {item.likes.toLocaleString()}
              </span>
              <span
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <MessageCircle size={16} fill="#fff" stroke="none" />
                {item.comments}
              </span>
            </div>
            <p
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
                padding: "0 10px",
                lineHeight: 1.4,
                maxWidth: 120,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical" as const,
                WebkitLineClamp: 2,
              }}
            >
              {item.caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Media grid section ────────────────────────────────────────────────────────

type GridTab = "posts" | "reels" | "images";

function MediaGrid() {
  const [activeTab, setActiveTab] = useState<GridTab>("posts");
  const [lightboxItems, setLightboxItems] = useState<MediaItem[] | null>(null);
  const [lightboxStart, setLightboxStart] = useState(0);

  // Posts = all images + all reels; Reels = reels only; Images = images only
  const tabData: Record<GridTab, MediaItem[]> = {
    posts: POSTS_DATA,
    reels: REELS_DATA,
    images: IMAGES_DATA,
  };

  const items = tabData[activeTab];

  const openLightbox = (index: number) => {
    setLightboxStart(index);
    setLightboxItems(items);
  };

  const TABS: { key: GridTab; icon: React.ReactNode; label: string }[] = [
    { key: "posts", icon: <Grid size={16} />, label: "Posts" },
    { key: "reels", icon: <Film size={16} />, label: "Reels" },
    { key: "images", icon: <Image size={16} />, label: "Images" },
  ];

  return (
    <>
      {/* Tab row */}
      <div
        style={{
          display: "flex",
          marginBottom: 4,
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "11px 0",
              background: "none",
              border: "none",
              borderBottom:
                activeTab === tab.key
                  ? "2px solid #579F63"
                  : "2px solid transparent",
              cursor: "pointer",
              color: activeTab === tab.key ? "#579F63" : "#8e8e93",
              fontSize: 13,
              fontWeight: activeTab === tab.key ? 700 : 400,
              transition: "all 0.15s",
            }}
          >
            {tab.icon}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
            padding: "0 0 8px",
          }}
        >
          {items.map((item, i) => (
            <GridCell
              key={item.id}
              item={item}
              onClick={() => openLightbox(i)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItems && (
          <MediaLightbox
            items={lightboxItems}
            startIndex={lightboxStart}
            onClose={() => setLightboxItems(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ── ProfileView (root) ────────────────────────────────────────────────────────

export function ProfileView({ onNavigate }) {
  const [offset, setOffset] = useState(0);
  const canPrev = offset > 0;
  const canNext = offset + VISIBLE < CAROUSEL_ITEMS.length;
  const visible = CAROUSEL_ITEMS.slice(offset, offset + VISIBLE);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // use "auto" for instant jump
    });
  }, []);
  function handlePdf() {
    console.log("pdf done");
  }
  function handlePdfDownload() {
    console.log("dwn pdf done");
  }
  return (
    <div className="flex flex-col pb-12 px-4 pt-4 w-[100%] min-[1160px]:mx-50 min-[770px]:mx-16 mx-0">
      {/* ── Hero ── */}
      <button
        onClick={() => onNavigate("home")}
        className="mt-0 flex items-center gap-2 font-base flex-row justify-start cursor-pointer px-2"
        style={{ color: "#579F63" }}
      >
        {" "}
        <ArrowLeft size={16} />
        Return back
      </button>
      <div className="flex flex-col center items-start">
        <div className="flex flex-row items-center py-10 px-4 gap-5 justify-center">
          <div className="rounded-full flex items-center justify-center mb-4 md:h-24 md:w-24 h-16 w-16 bg-lime-600">
            <img src={logo} alt="logo" />
          </div>
          <div className="flex flex-col justify-center items-start gap-0.5">
            <h1
              style={{
                fontFamily: "var(--font-family-body)",
                color: "var(--foreground)",
              }}
              className="lg:text-3xl md:text-2xl text-xl"
            >
              Abybaby Events
            </h1>
            <p style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
              Award-winning event & brand experience agency
            </p>
            <div className="flex gap-8">
              {STATS.map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center">
                  <span
                    style={{
                      fontWeight: 700,
                      color: "var(--accent)",
                      fontFamily: "var(--font-family-body)",
                    }}
                  >
                    {value}
                  </span>
                  <span
                    style={{ fontSize: 12, color: "var(--muted-foreground)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-row justify-center items-between w-full gap-3 cursor-pointer">
          <a
            href={Portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[45%] rounded-md py-3 flex items-center justify-center gap-2 transition-opacity cursor-pointer bg-[linear-gradient(135deg,_#579F63_0%,_#7CFC58_100%)]"
            style={{
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.opacity = "0.88")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
            }
            onClick={handlePdf}
          >
            <ExternalLink size={14} />
            View Portfolio
          </a>
          <a
            href={Portfolio}
            download="ABYBABY BROCHURE.pdf"
            className="w-[45%] rounded-md py-3 flex items-center justify-center gap-2 transition-opacity cursor-pointer"
            style={{
              background: "color-mix(in srgb, var(--accent) 10%, transparent)",
              color: "var(--accent)",
              fontSize: 13,
              fontWeight: 600,
            }}
            onClick={handlePdfDownload}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.opacity = "0.75")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
            }
          >
            <Download size={14} />
            Download Portfolio
          </a>
        </div>
      </div>

      {/* ── Featured Work carousel ── */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--foreground)",
            }}
            className="font-sans"
          >
            Featured Work
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setOffset((o) => Math.max(0, o - 1))}
              disabled={!canPrev}
              className="flex items-center justify-center rounded-full border border-border"
              style={{
                width: 30,
                height: 30,
                opacity: canPrev ? 1 : 0.3,
                background: "var(--background)",
              }}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() =>
                setOffset((o) =>
                  Math.min(CAROUSEL_ITEMS.length - VISIBLE, o + 1),
                )
              }
              disabled={!canNext}
              className="flex items-center justify-center rounded-full border border-border"
              style={{
                width: 30,
                height: 30,
                opacity: canNext ? 1 : 0.3,
                background: "var(--background)",
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="flex gap-3 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl overflow-hidden shrink-0 flex-1"
                style={{ minWidth: 0 }}
              >
                <div style={{ aspectRatio: "16/10", position: "relative" }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-3"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
                    }}
                  >
                    <span
                      style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}
                    >
                      {item.title}
                    </span>
                    <span
                      style={{ color: "rgba(255,255,255,0.7)", fontSize: 10 }}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Services + About ── */}
      <div className="flex gap-6 px-4 mb-8">
        <div className="flex flex-col gap-3" style={{ flex: 1, minWidth: 0 }}>
          <h2
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--foreground)",
              marginBottom: 4,
            }}
            className="font-sans"
          >
            Our Services
          </h2>
          {SERVICES.map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="flex gap-3 items-start rounded-xl p-3"
              style={{
                background:
                  "color-mix(in srgb, var(--accent) 4%, var(--background))",
              }}
            >
              <span style={{ fontSize: 20, lineHeight: 1.4, flexShrink: 0 }}>
                {emoji}
              </span>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--foreground)",
                    marginBottom: 2,
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--muted-foreground)",
                    lineHeight: 1.5,
                  }}
                >
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="flex flex-col gap-3" style={{ flex: 1, minWidth: 0 }}>
          <h2
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--foreground)",
              marginBottom: 4,
            }}
            className="font-sans"
          >
            About Us
          </h2>
          <div
            className="rounded-xl p-4"
            style={{
              background:
                "color-mix(in srgb, var(--accent) 6%, var(--background))",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={14} style={{ color: "var(--accent)" }} />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--foreground)",
                }}
              >
                Why Us
              </span>
            </div>
            <p
              style={{
                fontSize: 12,
                color: "var(--muted-foreground)",
                lineHeight: 1.6,
              }}
            >
              Over 12 years of award-winning experience delivering world-class
              brand experiences across events, digital and exhibitions.
            </p>
          </div>
          <div
            className="rounded-xl p-4"
            style={{
              background:
                "color-mix(in srgb, var(--accent) 6%, var(--background))",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <BarChart2 size={14} style={{ color: "var(--accent)" }} />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--foreground)",
                }}
              >
                Analysis & Implementation
              </span>
            </div>
            <p
              style={{
                fontSize: 12,
                color: "var(--muted-foreground)",
                lineHeight: 1.6,
              }}
            >
              Data-driven strategy paired with flawless execution — from initial
              brief to post-event reporting.
            </p>
          </div>
        </div> */}
      </div>

      {/* ── Media grid (Posts / Reels / Images) ── */}
      <MediaGrid />
      <footer className="pt-2 pb-6 flex flex-col justify-center items-center ">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {[
            "Home",
            "About",
            "Presence",
            "Privacy Policy",
            "Data Privacy",
            "Terms & Conditions",
          ].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: 11,
                color: "var(--muted-foreground)",
                textDecoration: "none",
                fontFamily: "var(--font-family-body)",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--foreground)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--muted-foreground)")
              }
            >
              {link}
            </a>
          ))}
        </div>
        <p
          style={{
            fontSize: 11,
            color: "var(--muted-foreground)",
            opacity: 0.6,
            marginTop: 12,
            fontFamily: "var(--font-family-body)",
          }}
        >
          © 2026 ABY Baby Events. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
