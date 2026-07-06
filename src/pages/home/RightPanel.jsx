import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Calendar,
  Users,
  ExternalLink,
  Trophy,
  BookOpen,
} from "lucide-react";

export function RightPanel({ events, caseStudies, awards, onNavigate }) {
  return (
    <aside className="overflow-y-auto w-[320px] px-5 pt-7 pb-7 [scrollbar-width:none] bg-[var(--background)] font-[var(--font-family-body)]">
      {/* Upcoming Events */}
      <section className="mb-8">
        <div className="flex items-center justify-between">
          <SectionHeader icon={Calendar} label="Upcoming Events" />
          <a
            href="#"
            className="text-[#579F63] text-xs font-semibold  no-underline"
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            onClick={() => onNavigate("events")}
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
            className="text-xs text-[var(--accent)] font-semibold  no-underline"
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            onClick={() => onNavigate("casestudies")}
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
      {/* Awards */}
      <section className="mb-8">
        <div className="flex items-center justify-between">
          <SectionHeader icon={Trophy} label="Awards & Recognition" />
          <a
            href="#"
            className="text-xs text-[var(--accent)] font-semibold  no-underline"
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            onClick={() => onNavigate("awards")}
          >
            See all
          </a>
        </div>
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
          {[
            { title: "Home", link: "home" },
            { title: "About", link: "about" },
            { title: "Presence", link: "presence" },
            { title: "Profile", link: "profile" },
            { title: "Privacy Policy", link: "privacypolicy" },
            { title: "Data Privacy", link: "dataprivacy" },
            { title: "Terms & Conditions", link: "terms" },
          ].map((item) => (
            <a
              key={item.title}
              onClick={() => onNavigate(item.link)}
              className="text-[11px] text-[var(--muted-foreground)] no-underline font-[var(--font-family-body)] transition-colors duration-150"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted-foreground)")
              }
              className="cursor-pointer"
            >
              {item.title}
            </a>
          ))}
        </div>
        <p className="text-[11px] text-[var(--muted-foreground)] opacity-60 mt-3 font-[var(--font-family-body)]">
          © 2026 ABY Baby Events. All rights reserved.
        </p>
      </footer>
    </aside>
  );
}

function SectionHeader({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} className="text-[var(--accent)]" />
      <span className="text-xs font-bold text-[var(--foreground)] tracking-[0.06em] uppercase ">
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return null;
}

function EventCard({ event }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      className="rounded-2xl overflow-hidden cursor-pointer bg-[var(--background)] rounded-[var(--radius)]"
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
            <div className="relative aspect-video bg-[var(--muted)]">
              <img
                src={event.eventImage}
                alt={event.eventName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/55 via-transparent to-transparent [background-position:0_0] bg-[linear-gradient(to_top,rgba(0,0,0,0.55)_0%,transparent_60%)]">
                <span className="px-2 py-0.5 rounded-full bg-white/18 text-white text-[11px] backdrop-blur-[4px]  font-medium">
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
          <div className="rounded-full flex items-center justify-center shrink-0 overflow-hidden w-8 h-8 text-[10px] font-bold ">
            <img src={event.clientlogo} alt="" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="truncate text-[13px] font-semibold text-[var(--foreground)] ">
              {event.eventName}
            </div>
            <div className="flex items-center gap-1 mt-0.5 text-[11px] text-[var(--muted-foreground)] font-[var(--font-family-body)]">
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
                <div className="flex items-center gap-1 text-[11px] text-[var(--accent)] font-semibold ">
                  <Calendar size={11} />
                  <span>{event.daysRemaining} days left</span>
                </div>
                <div className="flex items-center gap-1  text-[11px] text-[var(--muted-foreground)] font-[var(--font-family-body)]">
                  <Users size={11} />
                  <span>{event.attendance.toLocaleString()} attending</span>
                </div>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] leading-[1.55] font-[var(--font-family-body)]">
                {event.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className={`w-full rounded-xl py-2 transition-all text-xs font-semibold  ${expanded ? "bg-[var(--accent)] text-[var(--accent-foreground)]" : "bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] text-[var(--accent)]"}`}
        >
          {expanded ? "Register Now" : "Visit Event"}
        </button>
      </div>
    </motion.div>
  );
}

function CaseStudyCard({ caseStudy }) {
  return (
    <div className="rounded-2xl overflow-hidden ">
      <div className="aspect-video relative bg-[var(--muted)]">
        <img
          src={caseStudy.thumbnail}
          alt={caseStudy.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35)_0%,transparent_50%)]" />
      </div>
      <div className="pt-3 pb-4 px-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="rounded-full flex items-center justify-center shrink-0 overflow-hidden w-6 h-6 text-[9px] font-bold ">
            <img src={caseStudy.clientlogo} alt="" />
          </div>
          <span className="text-[11px] text-[var(--muted-foreground)] font-[var(--font-family-body)]">
            {caseStudy.clientName}
          </span>
        </div>
        <h4 className="text-[13px] font-semibold text-[var(--foreground)] leading-[1.4] mb-1.5 ">
          {caseStudy.title}
        </h4>
        <p className="text-xs text-[var(--muted-foreground)] leading-[1.5] mb-3 font-[var(--font-family-body)]">
          {caseStudy.summary}
        </p>
        <button className="flex items-center gap-1 text-xs text-[var(--accent)] font-semibold bg-none border-none p-0 cursor-pointer">
          <span>Read More</span>
          <ExternalLink size={11} />
        </button>
      </div>
    </div>
  );
}

function AwardCard({ award }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-[color-mix(in_srgb,var(--accent)_3%,var(--background))] ">
      <div className="aspect-[2/1] relative bg-[var(--muted)]">
        <img
          src={award.image}
          alt={award.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-[color-mix(in_srgb,var(--accent)_68%,transparent)]">
          <Trophy size={32} className="text-white" />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-[var(--accent)] font-bold tracking-[0.06em] uppercase ">
            {award.year}
          </span>
        </div>
        <h4 className="text-[13px] font-semibold text-[var(--foreground)] leading-[1.4] mb-1.5 ">
          {award.title}
        </h4>
        <p className="text-xs text-[var(--muted-foreground)] leading-[1.5] font-[var(--font-family-body)]">
          {award.description}
        </p>
      </div>
    </div>
  );
}
