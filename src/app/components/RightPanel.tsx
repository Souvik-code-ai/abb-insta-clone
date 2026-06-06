import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Calendar, Users, ExternalLink, Trophy, BookOpen } from "lucide-react";
import type { UpcomingEvent, CaseStudy, Award } from "../data/mockData";

interface RightPanelProps {
  events: UpcomingEvent[];
  caseStudies: CaseStudy[];
  awards: Award[];
}

export function RightPanel({ events, caseStudies, awards }: RightPanelProps) {
  return (
    <aside
      className="overflow-y-auto"
      style={{
        width: 320,
        padding: "28px 20px",
        scrollbarWidth: "none",
        background: "var(--background)",
        fontFamily: "var(--font-family-body)",
      }}
    >
      {/* Upcoming Events */}
      <section className="mb-8">
        <div className="flex items-center justify-between">
          <SectionHeader icon={Calendar} label="Upcoming Events" />
          <a
            href="#"
            style={{
              fontSize: 12,
              color: "var(--accent)",
              fontWeight: 600,
              fontFamily: "var(--font-family-body)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.75")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            See all
          </a>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <Divider />

      {/* Case Studies */}
      <section className="mb-8">
        <div className="flex items-center justify-between">
          <SectionHeader icon={BookOpen} label="Case Studies" />
          <a
            href="#"
            style={{
              fontSize: 12,
              color: "var(--accent)",
              fontWeight: 600,
              fontFamily: "var(--font-family-body)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.75")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            See all
          </a>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.id} caseStudy={cs} />
          ))}
        </div>
      </section>

      <Divider />

      {/* Awards */}
      <section className="mb-8">
        <SectionHeader icon={Trophy} label="Awards & Recognition" />
        <div className="flex flex-col gap-4 mt-4">
          {awards.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </div>
      </section>

      <Divider />

      {/* Footer */}
      <footer className="pt-2 pb-6">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {["Home", "About", "Presence", "Privacy Policy", "Data Privacy", "Terms & Conditions"].map((link) => (
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
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--foreground)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--muted-foreground)")}
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
    </aside>
  );
}

function SectionHeader({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} style={{ color: "var(--accent)" }} />
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "var(--foreground)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontFamily: "var(--font-family-body)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return null;
}

function EventCard({ event }: { event: UpcomingEvent }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "var(--background)",
        borderRadius: "var(--radius)",
      }}
    >
      {/* Expanded image */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div style={{ position: "relative", aspectRatio: "16/9", background: "var(--muted)" }}>
              <img src={event.eventImage} alt={event.eventName} className="w-full h-full object-cover" />
              <div
                className="absolute inset-0 flex items-end p-3"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }}
              >
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    color: "#fff",
                    fontSize: 11,
                    backdropFilter: "blur(4px)",
                    fontFamily: "var(--font-family-body)",
                    fontWeight: 500,
                  }}
                >
                  {event.eventType}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card body */}
      <div className="pt-3 pb-4 px-0">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="rounded-xl flex items-center justify-center shrink-0"
            style={{
              width: 32,
              height: 32,
              background: `color-mix(in srgb, ${event.clientColor} 14%, transparent)`,
              fontSize: 10,
              fontWeight: 700,
              color: event.clientColor,
              fontFamily: "var(--font-family-body)",
            }}
          >
            {event.clientInitials}
          </div>
          <div className="flex-1 min-w-0">
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--foreground)",
                fontFamily: "var(--font-family-body)",
              }}
              className="truncate"
            >
              {event.eventName}
            </div>
            <div
              className="flex items-center gap-1 mt-0.5"
              style={{ fontSize: 11, color: "var(--muted-foreground)", fontFamily: "var(--font-family-body)" }}
            >
              <MapPin size={10} />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </div>

        {/* Expanded details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-3"
            >
              <div className="flex items-center gap-4 mb-2">
                <div
                  className="flex items-center gap-1"
                  style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, fontFamily: "var(--font-family-body)" }}
                >
                  <Calendar size={11} />
                  <span>{event.daysRemaining} days left</span>
                </div>
                <div
                  className="flex items-center gap-1"
                  style={{ fontSize: 11, color: "var(--muted-foreground)", fontFamily: "var(--font-family-body)" }}
                >
                  <Users size={11} />
                  <span>{event.attendance.toLocaleString()} attending</span>
                </div>
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--muted-foreground)",
                  lineHeight: 1.55,
                  fontFamily: "var(--font-family-body)",
                }}
              >
                {event.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className="w-full rounded-xl py-2 transition-all"
          style={{
            background: expanded
              ? "var(--accent)"
              : "color-mix(in srgb, var(--accent) 10%, transparent)",
            color: expanded ? "var(--accent-foreground)" : "var(--accent)",
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "var(--font-family-body)",
          }}
        >
          {expanded ? "Register Now" : "Visit Event"}
        </button>
      </div>
    </motion.div>
  );
}

function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        borderRadius: "var(--radius)",
      }}
    >
      <div style={{ aspectRatio: "16/9", position: "relative", background: "var(--muted)" }}>
        <img src={caseStudy.thumbnail} alt={caseStudy.title} className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)" }}
        />
      </div>
      <div className="pt-3 pb-4 px-0">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="rounded-full flex items-center justify-center shrink-0"
            style={{
              width: 24,
              height: 24,
              background: `color-mix(in srgb, ${caseStudy.clientColor} 14%, transparent)`,
              fontSize: 9,
              fontWeight: 700,
              color: caseStudy.clientColor,
              fontFamily: "var(--font-family-body)",
            }}
          >
            {caseStudy.clientInitials}
          </div>
          <span
            style={{ fontSize: 11, color: "var(--muted-foreground)", fontFamily: "var(--font-family-body)" }}
          >
            {caseStudy.clientName}
          </span>
        </div>
        <h4
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--foreground)",
            lineHeight: 1.4,
            marginBottom: 6,
            fontFamily: "var(--font-family-body)",
          }}
        >
          {caseStudy.title}
        </h4>
        <p
          style={{
            fontSize: 12,
            color: "var(--muted-foreground)",
            lineHeight: 1.5,
            marginBottom: 12,
            fontFamily: "var(--font-family-body)",
          }}
        >
          {caseStudy.summary}
        </p>
        <button
          className="flex items-center gap-1"
          style={{
            fontSize: 12,
            color: "var(--accent)",
            fontWeight: 600,
            fontFamily: "var(--font-family-body)",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <span>Read More</span>
          <ExternalLink size={11} />
        </button>
      </div>
    </div>
  );
}

function AwardCard({ award }: { award: Award }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "color-mix(in srgb, var(--accent) 3%, var(--background))",
        borderRadius: "var(--radius)",
      }}
    >
      <div style={{ aspectRatio: "2/1", position: "relative", background: "var(--muted)" }}>
        <img src={award.image} alt={award.title} className="w-full h-full object-cover" />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "color-mix(in srgb, var(--accent) 68%, transparent)" }}
        >
          <Trophy size={32} style={{ color: "#fff" }} />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span
            style={{
              fontSize: 10,
              color: "var(--accent)",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "var(--font-family-body)",
            }}
          >
            {award.year}
          </span>
        </div>
        <h4
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--foreground)",
            lineHeight: 1.4,
            marginBottom: 6,
            fontFamily: "var(--font-family-body)",
          }}
        >
          {award.title}
        </h4>
        <p
          style={{
            fontSize: 12,
            color: "var(--muted-foreground)",
            lineHeight: 1.5,
            fontFamily: "var(--font-family-body)",
          }}
        >
          {award.description}
        </p>
      </div>
    </div>
  );
}
