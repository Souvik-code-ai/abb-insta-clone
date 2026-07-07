import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Clock, MapPin, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { CASE_STUDIES } from "../../../public/caseStudy/casestudy";
function SidebarCarousel({ studies, activeId, onSelect }) {
  const [paused, setPaused] = useState(false);
  const [offset, setOffset] = useState(0);

  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
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

    const loop = (ts) => {
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
      className="fixed top-5 w-[280px] self-start"
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden h-screen relative">
        {/* Fade masks top & bottom */}
        <div className="absolute top-0 left-0 right-0 h-9 bg-[linear-gradient(to_bottom,var(--background),transparent)] z-[2] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-9 bg-[linear-gradient(to_top,var(--background),transparent)] z-[2] pointer-events-none" />

        {/* Scrolling strip */}
        <div
          className={`flex flex-col gap-3 will-change-transform -translate-y-[${offset}px]`}
        >
          {items.map((study, i) => (
            <button
              key={`${study.id}-${i}`}
              onClick={() => onSelect(study.id)}
              className={`text-left rounded-xl overflow-hidden w-full bg-[color:var(--background)] shrink-0 cursor-pointer border-[0.5px] ${
                study.id === activeId
                  ? "border-[rgba(87,159,99,0.55)]"
                  : "border-[rgba(87,159,99,0.2)]"
              }`}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={study.heroImage}
                  alt={study.title}
                  className="w-full h-full object-cover block"
                />
              </div>
              <div className="px-[10px] py-2">
                <div className="text-[10px] font-semibold text-[#579F63] uppercase tracking-[0.05em] mb-[3px]">
                  {study.category}
                </div>
                <div className="text-[11px] font-semibold text-[color:var(--foreground)] leading-[1.4] line-clamp-2">
                  {study.title}
                </div>
                <div className="text-[10px] text-[color:var(--muted-foreground)] mt-1 flex items-center gap-1">
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

export function CaseStudiesView({ onNavigate }) {
  const [activeId, setActiveId] = useState(1);
  const study = CASE_STUDIES.find((s) => s.id === activeId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeId]);

  return (
    <div className="flex flex-col pb-12 px-4 pt-4 w-[100%] min-[1160px]:mx-50 min-[770px]:mx-16 mx-0">
      {/* Back button */}
      <button
        onClick={() => onNavigate("home")}
        className="mt-0 flex items-center gap-2 font-base flex-row justify-start cursor-pointer px-2 mb-4 text-[#579F63]"
      >
        <ArrowLeft size={16} />
        Return back
      </button>

      {/* Page label */}
      <div className="px-4 mb-2">
        <div className="inline-block rounded-full bg-[rgba(87,159,99,0.12)] text-[#3d7a4a] text-[11px] font-semibold px-3 py-[3px]">
          Case Studies
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-5 ">
        {/* ── LEFT: Main content ── */}
        <div className="flex flex-col px-4 flex-1 min-w-0">
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
                <div className="text-[11px] font-semibold text-[#579F63] uppercase tracking-[0.06em] mb-1.5">
                  {study.category}
                </div>
                <h1 className="font-[family-name:var(--font-family-body)] text-[color:var(--foreground)] text-[18px] font-bold leading-[1.3] m-0 mb-[10px]">
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
                      className="flex items-center gap-1 text-[11px] text-[color:var(--muted-foreground)]"
                    >
                      <span className="text-[#579F63]">{icon}</span>
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero image */}
              <div className="rounded-xl overflow-hidden w-full aspect-[16/7]">
                <img
                  src={study.heroImage}
                  alt={study.title}
                  className="h-full w-full object-cover block"
                />
              </div>

              {/* Summary */}
              <div className="rounded-xl p-4 bg-[rgba(87,159,99,0.05)] border-[0.5px] border-[rgba(87,159,99,0.25)]">
                <p className="text-[13px] font-medium text-[color:var(--foreground)] leading-[1.65] m-0">
                  {study.summary}
                </p>
              </div>

              {/* Body paragraphs with inline images */}
              <div className="flex flex-col gap-4">
                {study.body.map((block, i) => (
                  <div key={i}>
                    <p className="text-[13px] text-[color:var(--muted-foreground)] leading-[1.8] m-0 mb-[10px]">
                      {block.text}
                    </p>
                    {block.image && (
                      <div className="rounded-xl overflow-hidden mb-1">
                        <img
                          src={block.image}
                          alt={block.imageCaption ?? ""}
                          className="w-full aspect-video object-cover block"
                        />
                        {block.imageCaption && (
                          <div className="text-[11px] text-[color:var(--muted-foreground)] pt-1.5 px-1 pb-0 italic">
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
                <div className="text-[11px] font-semibold text-[#579F63] uppercase tracking-[0.06em] mb-2">
                  Gallery
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {study.inlineImages.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="w-full aspect-[4/3] object-cover block"
                      />
                      <div className="text-[10px] text-[color:var(--muted-foreground)] pt-1 px-0.5 pb-0 text-center">
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
        <div className="shrink-0" className="w-[180px]">
          <SidebarCarousel
            studies={CASE_STUDIES}
            activeId={activeId}
            onSelect={setActiveId}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-8 pb-2 flex flex-col justify-center items-start px-4 flex-wrap">
        <div className="flex  gap-x-2 gap-y-2 justify-start items-start flex-row">
          {[
            { title: "Home", link: "home" },
            { title: "About", link: "about" },
            { title: "Profile", link: "profile" },
            { title: "Privacy Policy", link: "privacypolicy" },
            { title: "Data Privacy ", link: "dataprivacy" },
            { title: "Terms & Conditions ", link: "terms" },
          ].map((link) => (
            <a
              key={link.link}
              onClick={() => onNavigate(link.link)}
              className="text-[11px] text-[color:var(--muted-foreground)] no-underline font-[family-name:var(--font-family-body)] transition-colors duration-150"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted-foreground)")
              }
            >
              {link.title}
            </a>
          ))}
        </div>
        <p className="text-[11px] text-[color:var(--muted-foreground)] opacity-60 mt-3 font-[family-name:var(--font-family-body)]">
          © 2026 ABY Baby Events. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
