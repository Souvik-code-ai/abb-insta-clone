import { useState, useRef, useEffect, useCallback } from "react";
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
import logo from "../../assets/images/logo.jpg";
import Portfolio from "../../assets/pdf/ABYBABY BROCHURE.pdf";
// ── Static data ───────────────────────────────────────────────────────────────
import { ArrowRight } from "lucide-react";
import {
  STATS,
  CAROUSEL_ITEMS,
  SERVICES,
  MediaItem,
  REELS_DATA,
  IMAGES_DATA,
} from "../../../public/profile/profile";

// Posts = all images + all reels combined
const POSTS_DATA: MediaItem[] = [...IMAGES_DATA, ...REELS_DATA];

const VISIBLE = 3;

//?/ ── Lightbox ──────────────────────────────────────────────────────────────────

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

          borderRadius: 20,
          padding: "4px 14px",
          fontSize: 11,
          fontWeight: 700,

          letterSpacing: "0.03em",
        }}
        className="bg-linear-to-r from-lime-800 via-lime-600 to-lime-400  text-white"
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

// function MediaGrid() {
//   const [activeTab, setActiveTab] = useState<GridTab>("posts");
//   const [lightboxItems, setLightboxItems] = useState<MediaItem[] | null>(null);
//   const [lightboxStart, setLightboxStart] = useState(0);

//   // Posts = all images + all reels; Reels = reels only; Images = images only
//   const tabData: Record<GridTab, MediaItem[]> = {
//     posts: POSTS_DATA,
//     reels: REELS_DATA,
//     images: IMAGES_DATA,
//   };

//   const items = tabData[activeTab];

//   const openLightbox = (index: number) => {
//     setLightboxStart(index);
//     setLightboxItems(items);
//   };

//   const TABS: { key: GridTab; icon: React.ReactNode; label: string }[] = [
//     { key: "posts", icon: <Grid size={16} />, label: "Posts" },
//     { key: "reels", icon: <Film size={16} />, label: "Reels" },
//     { key: "images", icon: <Image size={16} />, label: "Images" },
//   ];

//   return (
//     <>
//       {/* Tab row */}
//       <div
//         style={{
//           display: "flex",
//           marginBottom: 4,
//         }}
//       >
//         {TABS.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveTab(tab.key)}
//             style={{
//               flex: 1,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 6,
//               padding: "11px 0",
//               background: "none",
//               border: "none",
//               borderBottom:
//                 activeTab === tab.key
//                   ? "2px solid #579F63"
//                   : "2px solid transparent",
//               cursor: "pointer",
//               color: activeTab === tab.key ? "#579F63" : "#8e8e93",
//               fontSize: 13,
//               fontWeight: activeTab === tab.key ? 700 : 400,
//               transition: "all 0.15s",
//             }}
//           >
//             {tab.icon}
//           </button>
//         ))}
//       </div>

//       {/* Grid */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={activeTab}
//           initial={{ opacity: 0, y: 6 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -6 }}
//           transition={{ duration: 0.18 }}
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(3, 1fr)",
//             gap: 3,
//             padding: "0 0 8px",
//           }}
//         >
//           {items.map((item, i) => (
//             <GridCell
//               key={item.id}
//               item={item}
//               onClick={() => openLightbox(i)}
//             />
//           ))}
//         </motion.div>
//       </AnimatePresence>

//       {/* Lightbox */}
//       <AnimatePresence>
//         {lightboxItems && (
//           <MediaLightbox
//             items={lightboxItems}
//             startIndex={lightboxStart}
//             onClose={() => setLightboxItems(null)}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// ── ProfileView (root) ────────────────────────────────────────────────────────
function MediaGrid() {
  const [activeTab, setActiveTab] = useState<GridTab>("posts");
  const [lightboxItems, setLightboxItems] = useState<MediaItem[] | null>(null);
  const [lightboxStart, setLightboxStart] = useState(0);

  // Infinite scroll state — only used for "images" tab
  const [visibleImageCount, setVisibleImageCount] = useState(6);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const hasMoreImages = visibleImageCount < IMAGES_DATA.length;

  const loadMoreImages = useCallback(() => {
    if (isLoadingImages || !hasMoreImages) return;
    setIsLoadingImages(true);
    setTimeout(() => {
      setVisibleImageCount((prev) => Math.min(prev + 6, IMAGES_DATA.length));
      setIsLoadingImages(false);
    }, 500);
  }, [isLoadingImages, hasMoreImages]);

  // Re-attach observer whenever tab switches to "images" or more items load
  useEffect(() => {
    if (activeTab !== "images") return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMoreImages();
      },
      { rootMargin: "200px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [activeTab, loadMoreImages]);

  // Reset image count when switching away from images tab and back
  useEffect(() => {
    if (activeTab === "images") setVisibleImageCount(6);
  }, [activeTab]);

  const tabData: Record<GridTab, MediaItem[]> = {
    posts: POSTS_DATA,
    reels: REELS_DATA,
    images: IMAGES_DATA.slice(0, visibleImageCount), // sliced for images tab
  };

  const items = tabData[activeTab];
  // For lightbox on images tab, always pass the full dataset so you can swipe through all
  const lightboxPool =
    activeTab === "images" ? IMAGES_DATA : tabData[activeTab];

  const openLightbox = (index: number) => {
    setLightboxStart(index);
    setLightboxItems(lightboxPool);
  };

  const TABS: { key: GridTab; icon: React.ReactNode; label: string }[] = [
    { key: "posts", icon: <Grid size={16} />, label: "Posts" },
    { key: "reels", icon: <Film size={16} />, label: "Reels" },
    { key: "images", icon: <Image size={16} />, label: "Images" },
  ];

  return (
    <>
      {/* Tab row */}
      <div style={{ display: "flex", marginBottom: 4 }}>
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
            <motion.div
              key={item.id}
              // Only animate newly loaded images, not the initial batch or other tabs
              initial={
                activeTab === "images" && i >= visibleImageCount - 6
                  ? { opacity: 0, scale: 0.95 }
                  : false
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: (i % 6) * 0.04 }}
            >
              <GridCell item={item} onClick={() => openLightbox(i)} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── Infinite scroll sentinel & spinner (images tab only) ── */}
      {activeTab === "images" && (
        <div
          ref={sentinelRef}
          className="flex justify-center items-center py-4"
        >
          {isLoadingImages && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-2"
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  border: "2px solid #e5e7eb",
                  borderTopColor: "#579F63",
                  animation: "spin 0.7s linear infinite",
                }}
              />
              <p style={{ fontSize: 11, color: "#aaa" }}>Loading more…</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </motion.div>
          )}
          {!hasMoreImages && !isLoadingImages && (
            <p style={{ fontSize: 11, color: "#c0c0c0" }}></p>
          )}
        </div>
      )}

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
        onClick={() => {
          console.log("Return back clicked");
          console.log("onNavigate is:", onNavigate);
          onNavigate("home");
        }}
        className="mt-0 flex items-center gap-2 font-base flex-row justify-start cursor-pointer px-2"
        style={{ color: "#579F63" }}
      >
        <ArrowLeft size={16} />
        Return back
      </button>
      <div className="flex flex-col center items-start">
        <div className="flex flex-row items-center py-10 px-4 gap-5 justify-center">
          <div className="rounded-full flex items-center justify-center mb-4 md:h-24 md:w-24 h-12 w-16 bg-lime-600">
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
            className="w-[45%] rounded-md py-3 flex items-center justify-center md:gap-2 transition-opacity gap-1 cursor-pointer bg-[linear-gradient(135deg,_#579F63_0%,_#7CFC58_100%)]"
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
            <ExternalLink size={14} className="sm:block hidden" />
            View Portfolio
          </a>
          <a
            href={Portfolio}
            download="ABYBABY BROCHURE.pdf"
            className="w-[45%] rounded-md py-3 flex items-center justify-center md:gap-2 transition-opacity cursor-pointer gap-1 "
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
            <Download size={14} className="sm:block hidden" />
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
                    className="absolute inset-0 flex flex-col justify-end p-3 items-center"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
                    }}
                  >
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
        {/* 
        <p
          style={{
            fontSize: 11,
            color: "var(--muted-foreground)",

            marginTop: 12,
            fontFamily: "var(--font-family-body)",
          }}
        >
          © 2026 ABY Baby Events. All rights reserved.
        </p> */}
        <div className="flex flex-col items-center py-8 gap-2">
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: 48,
              height: 48,
              background: "linear-gradient(135deg, #65A30D 0%, #A3E635 100%)",
            }}
          >
            <img src={logo} alt="" />
          </div>

          <p
            style={{
              fontSize: 13,
              color: "#8e8e93",
              textAlign: "center",
            }}
          >
            You've explored all profile contents.
          </p>
          <button
            onClick={() => onNavigate("casestudies")}
            className="mt-0 flex items-center gap-2 font-base flex-row justify-center cursor-pointer"
            style={{ color: "#579F63" }}
          >
            Explore More
            <ArrowRight size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}
