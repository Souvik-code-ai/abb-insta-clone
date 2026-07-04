import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Clock, MapPin, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { CaseStudy, CASE_STUDIES } from "../../../public/caseStudy/casestudy";
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
        top: 20,
        width: 280,
        alignSelf: "flex-start",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        style={{
          overflow: "hidden",
          height: " 100vh",
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

export function CaseStudiesView({
  onNavigate,
}: {
  onNavigate: (view: string) => void;
}) {
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
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
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
        <div className="shrink-0" style={{ width: 180 }}>
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
              {link.title}
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
