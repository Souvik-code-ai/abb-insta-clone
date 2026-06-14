import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Clock, MapPin, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ── Data ──────────────────────────────────────────────────────────────────────

type CaseStudy = {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  guests: string;
  heroImage: string;
  summary: string;
  body: {
    text: string;
    image?: string;
    imageCaption?: string;
  }[];
  inlineImages: { src: string; caption: string }[];
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    title: "Annual Gala 2024 — A Night of Vision & Celebration",
    category: "Corporate Event",
    location: "Kolkata, India",
    year: "2024",
    guests: "600+",
    heroImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=600&fit=crop&auto=format",
    summary:
      "A landmark evening that redefined corporate celebrations — blending award ceremonies, live performances, and curated brand experiences into one unforgettable night.",
    body: [
      {
        text: "The Annual Gala 2024 was conceived as more than an awards night. The brief called for an event that would unite 600 leaders, celebrate a decade of achievement, and leave every guest with the feeling that they had witnessed something genuinely historic. We began eight months out, locking in a heritage venue in Kolkata's heart and layering it with a contemporary design language that honoured the brand's legacy while signalling its future.",
      },
      {
        text: "Lighting was our primary storytelling medium. Working with a team of theatrical designers, we built a dynamic rig that transformed the same space three times across the evening — from an intimate cocktail reception bathed in warm amber, to a high-energy awards stage lit in the brand's signature green, to a closing gala dinner under a canopy of suspended Edison bulbs.",
        image:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=380&fit=crop&auto=format",
        imageCaption: "The awards stage set during final rehearsals",
      },
      {
        text: "On the content side, we scripted and produced a 12-minute brand film that played to a standing ovation. Every winner's moment was captured by a six-camera crew and edited live for the room screens. The result was a feedback loop of energy that kept the audience fully present from the first welcome address to the final toast.",
      },
      {
        text: "Logistics across a 600-person seated dinner required precision across every department — catering, security, AV, décor, and guest management running in perfect synchrony. Our on-the-ground team of 45 ensured zero incidents and a schedule that ran within four minutes of plan across a six-hour event.",
        image:
          "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=380&fit=crop&auto=format",
        imageCaption: "The main hall dressed for the gala dinner",
      },
      {
        text: "Post-event analytics confirmed a 94% satisfaction score from attendee surveys, with the lighting design and brand film singled out as the most memorable elements. The client has since commissioned us for the 2025 edition, expanding the format to a two-day summit.",
      },
    ],
    inlineImages: [
      {
        src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop",
        caption: "Grand entrance",
      },
      {
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
        caption: "Stage setup",
      },
      {
        src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop",
        caption: "Awards moment",
      },
    ],
  },
  {
    id: 2,
    title: "EV SUV Grand Reveal — Electric Dreams, Real Impact",
    category: "Product Launch",
    location: "Mumbai, India",
    year: "2024",
    guests: "250+",
    heroImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=600&fit=crop&auto=format",
    summary:
      "A high-voltage product reveal that introduced India's most anticipated electric SUV to press, influencers, and trade partners — generating 200M+ media impressions.",
    body: [
      {
        text: "When our client briefed us on the EV SUV reveal, the ambition was clear: this was not just a car launch, it was a cultural moment. The reveal needed to feel cinematic, feel inevitable, and feel unlike any automotive event India had seen before.",
      },
      {
        text: "We chose a warehouse in Mumbai's port district — raw, industrial, with sight lines that allowed a 40-metre reveal track. The space was dressed with nothing but the car's silhouette under tension fabric, backlit in deep blue. No signage, no brand marks — just the shape of something new.",
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=380&fit=crop&auto=format",
        imageCaption: "The reveal moment captured live",
      },
      {
        text: "The reveal sequence was choreographed over three minutes of original score, culminating in the tension fabric dropping to expose the full vehicle under a precisely timed light burst. The room's reaction was immediate and genuine — something we rarely engineer but always hope for.",
      },
    ],
    inlineImages: [
      {
        src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop",
        caption: "Pre-reveal tension",
      },
      {
        src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
        caption: "The unveil",
      },
      {
        src: "https://images.unsplash.com/photo-1674570979140-9adb58d4c194?w=400&h=300&fit=crop",
        caption: "Media walkthrough",
      },
    ],
  },
  {
    id: 3,
    title: "Zero Festival — Culture at Scale",
    category: "Festival",
    location: "Bengaluru, India",
    year: "2023",
    guests: "12,000+",
    heroImage:
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1200&h=600&fit=crop&auto=format",
    summary:
      "A three-day cultural festival spanning music, food, art, and wellness — delivered across a 40,000 sqft outdoor venue with zero major incidents.",
    body: [
      {
        text: "Zero Festival was the most operationally complex project in our portfolio to date. Three days, six stages, 80 acts, 40 food vendors, and a peak footfall of 12,000 guests on Day 2. The brief was simple in its ambition and demanding in its detail: create a festival that feels effortless to attend.",
      },
      {
        text: "We built a dedicated operations centre on-site staffed around the clock, with real-time crowd monitoring feeding into a dynamic resource deployment model. When queues built at entry on Day 1, we redeployed 30 stewards within eight minutes — a response that would have taken hours without the system we designed.",
        image:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=380&fit=crop&auto=format",
        imageCaption: "Main stage on Day 2 at peak capacity",
      },
      {
        text: "The art installations were commissioned specifically for the festival, with five international artists creating site-specific works that became the most photographed moments of the weekend. Social reach across the three days exceeded 45 million impressions organically.",
      },
    ],
    inlineImages: [
      {
        src: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400&h=300&fit=crop",
        caption: "Opening ceremony",
      },
      {
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
        caption: "Main stage",
      },
      {
        src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
        caption: "Art installations",
      },
    ],
  },
  {
    id: 4,
    title: "TechWorld Exhibition 2024 — Stand of the Year",
    category: "Exhibition",
    location: "Delhi, India",
    year: "2024",
    guests: "3,200 visitors",
    heroImage:
      "https://images.unsplash.com/photo-1764380746818-18c01e96df12?w=1200&h=600&fit=crop&auto=format",
    summary:
      "A 3,200 sqft exhibition stand that won Best Stand Design at TechWorld 2024, generating 840 qualified leads across four days.",
    body: [
      {
        text: "The TechWorld stand brief arrived with one constraint and one ambition. Constraint: a corner plot with a structural column we could not remove. Ambition: be the most talked-about stand on the floor. We made the column the centrepiece — wrapping it in an interactive product demo tower that became a destination in its own right.",
      },
      {
        text: "The stand's material language was deliberately contrary to the tech industry's usual glass-and-chrome palette. We used raw timber, woven textiles, and living moss walls to position the client as a human-first technology company — a message that resonated strongly with visitors and press alike.",
        image:
          "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?w=600&h=380&fit=crop&auto=format",
        imageCaption: "The central product demo tower",
      },
      {
        text: "840 qualified leads across four days represented a 340% improvement on the previous year's exhibition performance. The stand was awarded Best Stand Design by the TechWorld jury — the first time the client had received a major exhibition industry award.",
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
        caption: "Visitor engagement",
      },
    ],
  },
  {
    id: 5,
    title: "Durga Puja Celebration — Heritage Reimagined",
    category: "Cultural",
    location: "Kolkata, India",
    year: "2023",
    guests: "5,000+",
    heroImage:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=600&fit=crop&auto=format",
    summary:
      "A reimagining of Kolkata's most beloved festival for a corporate audience — merging devotion, artisanship, and contemporary event design.",
    body: [
      {
        text: "The Durga Puja corporate celebration is one of our most personally meaningful projects. The brief asked us to honour a centuries-old festival tradition while making it accessible and resonant for a multicultural corporate audience of 5,000 guests across five evenings.",
      },
      {
        text: "We worked with master craftspeople from Kumartuli — Kolkata's idol-making district — to commission a contemporary pandal that paid homage to traditional forms while incorporating sustainable materials and modern lighting. The result was widely covered in the city's press as one of the most beautiful corporate pandals of the season.",
        image:
          "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&h=380&fit=crop&auto=format",
        imageCaption: "The pandal on opening night",
      },
      {
        text: "Cultural programming across the five evenings included classical dance, folk music, and a curated food trail featuring regional specialties. Guest satisfaction averaged 97% across all evenings — the highest score we have recorded on any cultural event.",
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
];

// ── Sidebar Carousel ──────────────────────────────────────────────────────────

// function SidebarCarousel({
//   studies,
//   activeId,
//   onSelect,
// }: {
//   studies: CaseStudy[];
//   activeId: number;
//   onSelect: (id: number) => void;
// }) {
//   const [paused, setPaused] = useState(false);
//   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const others = studies.filter((s) => s.id !== activeId);

//   useEffect(() => {
//     if (paused) return;
//     intervalRef.current = setInterval(() => {
//       setCurrentIndex((i) => (i + 1) % others.length);
//     }, 3000);
//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [paused, others.length, activeId]);

//   // Reset index when active study changes
//   useEffect(() => {
//     setCurrentIndex(0);
//   }, [activeId]);

//   const visibleCount = 3;
//   const visibleItems = Array.from(
//     { length: visibleCount },
//     (_, i) => others[(currentIndex + i) % others.length]
//   );

//   return (
//     <div
//       className="flex flex-col gap-3"
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//     >
//       <div
//         style={{
//           fontSize: 11,
//           fontWeight: 600,
//           color: "#579F63",
//           textTransform: "uppercase",
//           letterSpacing: "0.06em",
//           marginBottom: 4,
//         }}
//       >
//         More Case Studies
//       </div>

//       <AnimatePresence mode="popLayout">
//         {visibleItems.map((study) => (
//           <motion.button
//             key={study.id}
//             layout
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -16 }}
//             transition={{ duration: 0.32, ease: "easeOut" }}
//             onClick={() => onSelect(study.id)}
//             className="text-left rounded-xl overflow-hidden w-full"
//             style={{
//               border: "0.5px solid rgba(87,159,99,0.2)",
//               background: "var(--background)",
//             }}
//           >
//             <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
//               <img
//                 src={study.heroImage}
//                 alt={study.title}
//                 style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
//               />
//             </div>
//             <div style={{ padding: "10px 12px" }}>
//               <div
//                 style={{
//                   fontSize: 10,
//                   fontWeight: 600,
//                   color: "#579F63",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.05em",
//                   marginBottom: 3,
//                 }}
//               >
//                 {study.category}
//               </div>
//               <div
//                 style={{
//                   fontSize: 12,
//                   fontWeight: 600,
//                   color: "var(--foreground)",
//                   lineHeight: 1.4,
//                   display: "-webkit-box",
//                   WebkitLineClamp: 2,
//                   WebkitBoxOrient: "vertical" as const,
//                   overflow: "hidden",
//                 }}
//               >
//                 {study.title}
//               </div>
//               <div
//                 style={{
//                   fontSize: 11,
//                   color: "var(--muted-foreground)",
//                   marginTop: 4,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 4,
//                 }}
//               >
//                 <MapPin size={10} />
//                 {study.location} · {study.year}
//               </div>
//             </div>
//           </motion.button>
//         ))}
//       </AnimatePresence>

//       {/* Dot indicators */}
//       <div className="flex justify-center gap-1.5 pt-1">
//         {others.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentIndex(i)}
//             style={{
//               width: i === currentIndex ? 16 : 5,
//               height: 5,
//               borderRadius: 3,
//               background: i === currentIndex ? "#579F63" : "rgba(87,159,99,0.25)",
//               border: "none",
//               padding: 0,
//               cursor: "pointer",
//               transition: "width 0.25s",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
// ── Sidebar Carousel ──────────────────────────────────────────────────────────

function SidebarCarousel({
  studies,
  activeId,
  onSelect,
}: {
  studies: CaseStudy[];
  activeId: number;
  onSelect: (id: number) => void;
}) {
  const [paused, setPaused] = useState(false);
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const CARD_HEIGHT = 168; // image(101px) + content(~55px) + gap(12px)
  const SPEED = 50; // px per second

  const others = studies.filter((s) => s.id !== activeId);
  // Duplicate for seamless loop
  const items = [...others, ...others];

  useEffect(() => {
    setOffset(0);
    lastTimeRef.current = null;
  }, [activeId]);

  useEffect(() => {
    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const loop = (ts: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = ts;
      const delta = ts - lastTimeRef.current;
      lastTimeRef.current = ts;

      setOffset((prev) => {
        const next = prev + (SPEED * delta) / 1000;
        // Reset seamlessly when we've scrolled one full set
        return next >= others.length * CARD_HEIGHT ? 0 : next;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, others.length]);

  return (
    <div
      style={{
        position: "fixed",
        top: 80,
        width: 280,
        alignSelf: "flex-start",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Label */}
      {/* <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#579F63",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 10,
        }}
      >
        More Case Studies
      </div> */}

      {/* Viewport window — clips the scrolling strip */}
      <div
        style={{
          overflow: "hidden",
          height: CARD_HEIGHT * 3,
          position: "relative",
        }}
      >
        {/* Fade masks top & bottom */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 36,
            background:
              "linear-gradient(to bottom, var(--background), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 36,
            background:
              "linear-gradient(to top, var(--background), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Scrolling strip */}
        <div
          style={{
            transform: `translateY(-${offset}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            willChange: "transform",
          }}
        >
          {items.map((study, i) => (
            <button
              key={`${study.id}-${i}`}
              onClick={() => onSelect(study.id)}
              className="text-left rounded-xl overflow-hidden w-full"
              style={{
                border:
                  study.id === activeId
                    ? "0.5px solid rgba(87,159,99,0.55)"
                    : "0.5px solid rgba(87,159,99,0.2)",
                background: "var(--background)",
                flexShrink: 0,
                cursor: "pointer",
              }}
            >
              <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                <img
                  src={study.heroImage}
                  alt={study.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div style={{ padding: "8px 10px" }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#579F63",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 3,
                  }}
                >
                  {study.category}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--foreground)",
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical" as const,
                    overflow: "hidden",
                  }}
                >
                  {study.title}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--muted-foreground)",
                    marginTop: 4,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <MapPin size={9} />
                  {study.location} · {study.year}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
// ── Main component ────────────────────────────────────────────────────────────

export function CaseStudiesView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [activeId, setActiveId] = useState(1);
  const study = CASE_STUDIES.find((s) => s.id === activeId)!;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeId]);

  return (
    <div className="flex flex-col pb-12 px-4 pt-4 w-[100%] min-[1160px]:mx-50 min-[770px]:mx-16 mx-0">

      {/* Back button */}
      <button
        onClick={() => onNavigate("home")}
        className="mt-0 flex items-center gap-2 font-base flex-row justify-start cursor-pointer px-2 mb-4"
        style={{ color: "#579F63" }}
      >
        <ArrowLeft size={16} />
        Return back
      </button>

      {/* Page label */}
      <div className="px-4 mb-2">
        <div
          className="inline-block rounded-full"
          style={{
            background: "rgba(87,159,99,0.12)",
            color: "#3d7a4a",
            fontSize: 11,
            fontWeight: 600,
            padding: "3px 12px",
          }}
        >
          Case Studies
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-5 ">

        {/* ── LEFT: Main content ── */}
        <div className="flex flex-col px-4" style={{ flex: 1, minWidth: 0 }}>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col gap-4"
            >
              {/* Category + Title */}
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#579F63",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 6,
                  }}
                >
                  {study.category}
                </div>
                <h1
                  style={{
                    fontFamily: "var(--font-family-body)",
                    color: "var(--foreground)",
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: 1.3,
                    margin: "0 0 10px",
                  }}
                >
                  {study.title}
                </h1>

                {/* Meta row */}
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: <MapPin size={11} />, label: study.location },
                    { icon: <Clock size={11} />, label: study.year },
                    { icon: <Users size={11} />, label: study.guests },
                  ].map(({ icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1"
                      style={{ fontSize: 11, color: "var(--muted-foreground)" }}
                    >
                      <span style={{ color: "#579F63" }}>{icon}</span>
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero image */}
              <div
                className="rounded-xl overflow-hidden w-full"
                style={{ aspectRatio: "16/7" }}
              >
                <img
                  src={study.heroImage}
                  alt={study.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Summary */}
              <div
                className="rounded-xl p-4"
                style={{
                  background: "rgba(87,159,99,0.05)",
                  border: "0.5px solid rgba(87,159,99,0.25)",
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--foreground)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {study.summary}
                </p>
              </div>

              {/* Body paragraphs with inline images */}
              <div className="flex flex-col gap-4">
                {study.body.map((block, i) => (
                  <div key={i}>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--muted-foreground)",
                        lineHeight: 1.8,
                        margin: "0 0 10px",
                      }}
                    >
                      {block.text}
                    </p>
                    {block.image && (
                      <div className="rounded-xl overflow-hidden mb-1">
                        <img
                          src={block.image}
                          alt={block.imageCaption ?? ""}
                          style={{
                            width: "100%",
                            aspectRatio: "16/9",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                        {block.imageCaption && (
                          <div
                            style={{
                              fontSize: 11,
                              color: "var(--muted-foreground)",
                              padding: "6px 4px 0",
                              fontStyle: "italic",
                            }}
                          >
                            {block.imageCaption}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Inline photo grid */}
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#579F63",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 8,
                  }}
                >
                  Gallery
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 6,
                  }}
                >
                  {study.inlineImages.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.caption}
                        style={{
                          width: "100%",
                          aspectRatio: "4/3",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--muted-foreground)",
                          padding: "4px 2px 0",
                          textAlign: "center",
                        }}
                      >
                        {img.caption}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── RIGHT: Sidebar carousel ── */}
        <div
          className="shrink-0"
          style={{ width: 180 }}
        >
          <SidebarCarousel
            studies={CASE_STUDIES}
            activeId={activeId}
            onSelect={setActiveId}
          />
        </div>

      </div>

      {/* Footer */}
      {/* <footer className="pt-8 pb-2 flex flex-col justify-center items-center px-4">
        <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
          {["Home", "About", "Presence", "Privacy Policy", "Data Privacy", "Terms & Conditions"].map(
            (link) => (
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
                  ((e.currentTarget as HTMLAnchorElement).style.color = "var(--foreground)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "var(--muted-foreground)")
                }
              >
                {link}
              </a>
            )
          )}
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
      </footer> */}
    </div>
  );
}