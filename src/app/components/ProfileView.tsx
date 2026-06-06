import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  BarChart2,
  Lightbulb,
  HelpCircle,
} from "lucide-react";

const STATS = [
  { label: "Years", value: "12+" },
  { label: "Clients", value: "340+" },
  { label: "Projects", value: "820+" },
];

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

const VISIBLE = 3;

export function ProfileView() {
  const [offset, setOffset] = useState(0);
  const canPrev = offset > 0;
  const canNext = offset + VISIBLE < CAROUSEL_ITEMS.length;
  const visible = CAROUSEL_ITEMS.slice(offset, offset + VISIBLE);

  return (
    <div
      className="flex flex-col pb-12 px-4 pt-4  w-[100%] min-[1160px]:mx-50 min-[770px]:mx-16 mx-0"
      // style={{ fontFamily: "var(--font-family-body)" }}
    >
      {/* Hero */}
      <div className="flex flex-col center items-start ">
        {" "}
        <div className="flex flex-row items-center py-10 px-4 gap-5 justify-center">
          {/* Logo */}
          <div
            className="rounded-full flex items-center justify-center mb-4"
            style={{
              width: 85,
              height: 85,
              background:
                "linear-gradient(135deg, var(--accent) 0%, #f9a8c9 100%)",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontFamily: "var(--font-family-display)",
                fontSize: 32,
              }}
            >
              A
            </span>
          </div>
          <div className="flex flex-col justfy-center items-start gap-0.5">
            {" "}
            <h1
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: 24,
                color: "var(--foreground)",
              }}
            >
              ABY Baby Events
            </h1>
            <p
              style={{
                fontSize: 13,
                color: "var(--muted-foreground)",
              }}
            >
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

          {/* Stats */}
        </div>
        <div className="flex flex-row justify-center items-between w-full gap-3 cursor-pointer">
          {" "}
          <button
            className="w-[45%] rounded-md py-3 flex items-center justify-center gap-2 transition-opacity cursor-pointer"
            style={{
              background: "var(--accent)",
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
          >
            <ExternalLink size={14} />
            View Portfolio
          </button>
          {/* Download Portfolio */}
          <button
            className="w-[45%] rounded-md py-3 flex items-center justify-center gap-2 transition-opacity cursor-pointer"
            style={{
              background: "color-mix(in srgb, var(--accent) 10%, transparent)",
              color: "var(--accent)",
              fontSize: 13,
              fontWeight: 600,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.opacity = "0.75")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
            }
          >
            <Download size={14} />
            Download Portfolio
          </button>
        </div>
      </div>

      {/* Finite carousel */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--foreground)",
            }}
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

      {/* Two-column section */}
      <div className="flex gap-6 px-4">
        {/* Left: Our Services */}
        <div className="flex flex-col gap-3" style={{ flex: 1, minWidth: 0 }}>
          <h2
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--foreground)",
              marginBottom: 4,
            }}
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

        {/* Right: About / Actions */}
        <div className="flex flex-col gap-3" style={{ flex: 1, minWidth: 0 }}>
          <h2
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--foreground)",
              marginBottom: 4,
            }}
          >
            About Us
          </h2>

          {/* Why About Us */}
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

          {/* Analysis & Implementation */}
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

          {/* View Portfolio */}
        </div>
      </div>
    </div>
  );
}
