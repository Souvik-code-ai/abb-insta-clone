import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
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
  REELS_DATA,
  IMAGES_DATA,
} from "../../../public/profile/profile";

// Posts = all images + all reels combined
const POSTS_DATA = [...IMAGES_DATA, ...REELS_DATA];

const VISIBLE = 3;

//?/ ── Lightbox ──────────────────────────────────────────────────────────────────

function MediaLightbox({ items, startIndex, onClose }) {
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
      className="fixed inset-0 z-[9999] bg-black/[0.94] flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-[18px] left-[18px] w-10 h-10 rounded-full bg-white/[0.12] border border-white/20 flex items-center justify-center cursor-pointer text-white z-10"
      >
        <X size={18} />
      </button>

      {/* Category badge */}
      <div className="bg-linear-to-r from-lime-800 via-lime-600 to-lime-400 text-white absolute top-[18px] right-[18px] z-10 rounded-[20px] px-[14px] py-1 text-[11px] font-bold tracking-[0.03em]">
        {item.category}
      </div>

      {/* Prev */}
      {idx > 0 && (
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-[18px] top-1/2 -translate-y-1/2 z-10 w-[42px] h-[42px] rounded-full bg-white/[0.12] border border-white/20 flex items-center justify-center cursor-pointer text-white"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Next */}
      {idx < items.length - 1 && (
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-[18px] top-1/2 -translate-y-1/2 z-10 w-[42px] h-[42px] rounded-full bg-white/[0.12] border border-white/20 flex items-center justify-center cursor-pointer text-white"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Media */}
      <div
        className={`relative rounded-xl overflow-hidden bg-[#111] ${
          item.type === "reel"
            ? "w-[min(88vw,360px)] aspect-[9/16]"
            : "w-[min(88vw,520px)] aspect-square"
        }`}
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
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Reel play icon */}
        {item.type === "reel" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-black/45 flex items-center justify-center">
              <Play size={24} fill="#fff" stroke="none" />
            </div>
          </div>
        )}

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[42%] bg-[linear-gradient(to_top,rgba(0,0,0,0.82),transparent)] pointer-events-none" />

        {/* Caption + stats */}
        <div className="absolute bottom-4 left-[14px] right-[14px] z-5">
          <p className="m-0 text-[13px] text-white leading-[1.5] font-normal">
            {item.caption}
          </p>
          <div className="flex gap-[14px] mt-2">
            <span className="text-[13px] text-white/80 flex items-center gap-1">
              <Heart size={13} fill="#d4456a" stroke="none" />
              {item.likes.toLocaleString()}
            </span>
            <span className="text-[13px] text-white/80 flex items-center gap-1">
              <MessageCircle size={13} stroke="rgba(255,255,255,0.8)" />
              {item.comments}
            </span>
          </div>
        </div>

        {/* Dot counter */}
        <div className="absolute top-[14px] left-0 right-0 flex justify-center gap-[5px] z-[5]">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-[3px] border-none cursor-pointer p-0 transition-[width] duration-200 ${
                i === idx ? "w-[18px] bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Grid cell ─────────────────────────────────────────────────────────────────

function GridCell({ item, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      className={`relative rounded-none overflow-hidden cursor-pointer bg-[#f5f5f7] ${
        item.type === "reel" ? "aspect-[9/16]" : "aspect-square"
      }`}
    >
      <img
        src={item.src}
        alt={item.caption.slice(0, 40)}
        className="w-full h-full object-cover block"
      />

      {/* Reel badge */}
      {item.type === "reel" && (
        <div className="absolute top-[7px] right-[7px] bg-black/55 rounded-md py-[3px] px-1.5 flex items-center gap-[3px]">
          <Play size={10} fill="#fff" stroke="none" />
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
            className="absolute inset-0 bg-black/48 flex flex-col items-center justify-center gap-2"
          >
            <div className="flex gap-5">
              <span className="text-white text-sm font-bold flex items-center gap-[5px]">
                <Heart size={16} fill="#fff" stroke="none" />
                {item.likes.toLocaleString()}
              </span>
              <span className="text-white text-sm font-bold flex items-center gap-[5px]">
                <MessageCircle size={16} fill="#fff" stroke="none" />
                {item.comments}
              </span>
            </div>
            <p className="text-[11px] text-white/80 text-center px-[10px] leading-[1.4] max-w-[120px] line-clamp-2">
              {item.caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MediaGrid() {
  const [activeTab, setActiveTab] = useState("posts");
  const [lightboxItems, setLightboxItems] = useState(null);
  const [lightboxStart, setLightboxStart] = useState(0);

  // Infinite scroll state — only used for "images" tab
  const [visibleImageCount, setVisibleImageCount] = useState(6);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const sentinelRef = useRef(null);

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

  const tabData = {
    posts: POSTS_DATA,
    reels: REELS_DATA,
    images: IMAGES_DATA.slice(0, visibleImageCount), // sliced for images tab
  };

  const items = tabData[activeTab];

  const lightboxPool =
    activeTab === "images" ? IMAGES_DATA : tabData[activeTab];

  const openLightbox = (index) => {
    setLightboxStart(index);
    setLightboxItems(lightboxPool);
  };

  const TABS = [
    { key: "posts", icon: <Grid size={16} />, label: "Posts" },
    { key: "reels", icon: <Film size={16} />, label: "Reels" },
    { key: "images", icon: <Image size={16} />, label: "Images" },
  ];

  return (
    <>
      {/* Tab row */}
      <div className="flex mb-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-[11px] bg-transparent border-none cursor-pointer text-[13px] transition-all duration-150 border-b-2 ${
              activeTab === tab.key
                ? "border-[#579F63] text-[#579F63] font-bold"
                : "border-transparent text-[#8e8e93] font-normal"
            }`}
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
          className="grid grid-cols-3 gap-[3px] px-0 pb-2"
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
              <div className="w-6 h-6 rounded-full border-2 border-gray-200 border-t-[#579F63] animate-spin [animation-duration:0.7s]" />
              <p className="text-[11px] text-[#aaa]">Loading more…</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </motion.div>
          )}
          {!hasMoreImages && !isLoadingImages && (
            <p className="text-[11px] text-[#c0c0c0]"></p>
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
      <Link
        to={"/"}
        onClick={() => {
          console.log("Return back clicked");
          console.log("onNavigate is:", onNavigate);
          onNavigate("home");
        }}
        className="mt-0 flex items-center gap-2 font-base flex-row justify-start cursor-pointer px-2 text-[#579F63]"
      >
        <ArrowLeft size={16} />
        Return back
      </Link>
      <div className="flex flex-col center items-start">
        <div className="flex flex-row items-center py-10 px-4 gap-5 justify-center">
          <div className="rounded-full flex items-center justify-center mb-4 md:h-24 md:w-24 h-12 w-16 bg-lime-600">
            <img src={logo} alt="logo" />
          </div>
          <div className="flex flex-col justify-center items-start gap-0.5">
            <h1 className="lg:text-3xl md:text-2xl text-xl font-[family-name:var(--font-family-body)] text-[color:var(--foreground)]">
              Abybaby Events
            </h1>
            <p className="text-[13px] text-[color:var(--muted-foreground)]">
              Award-winning event & brand experience agency
            </p>
            <div className="flex gap-8">
              {STATS.map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="font-bold text-[color:var(--accent)] font-[family-name:var(--font-family-body)]">
                    {value}
                  </span>
                  <span className="text-xs text-[color:var(--muted-foreground)]">
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
            className="w-[45%] rounded-md py-3 flex items-center justify-center md:gap-2 transition-opacity gap-1 cursor-pointer bg-[linear-gradient(135deg,_#579F63_0%,_#7CFC58_100%)] text-white text-[13px] font-semibold"
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            onClick={handlePdf}
          >
            <ExternalLink size={14} className="sm:block hidden" />
            View Portfolio
          </a>
          <a
            href={Portfolio}
            download="ABYBABY BROCHURE.pdf"
            className="w-[45%] rounded-md py-3 flex items-center justify-center md:gap-2 transition-opacity cursor-pointer gap-1 bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] text-[color:var(--accent)] text-[13px] font-semibold"
            onClick={handlePdfDownload}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <Download size={14} className="sm:block hidden" />
            Download Portfolio
          </a>
        </div>
      </div>

      {/* ── Featured Work carousel ── */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-sans text-[15px] font-bold text-[color:var(--foreground)]">
            Featured Work
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setOffset((o) => Math.max(0, o - 1))}
              disabled={!canPrev}
              className={`flex items-center justify-center rounded-full border border-border w-[30px] h-[30px] bg-[color:var(--background)] ${
                canPrev ? "opacity-100" : "opacity-30"
              }`}
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
              className={`flex items-center justify-center rounded-full border border-border w-[30px] h-[30px] bg-[color:var(--background)] ${
                canNext ? "opacity-100" : "opacity-30"
              }`}
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
                className="rounded-xl overflow-hidden shrink-0 flex-1 min-w-0"
              >
                <div className="aspect-[16/10] relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-3 items-center bg-[linear-gradient(to_top,rgba(0,0,0,0.55)_0%,transparent_60%)]">
                    <span className="text-white/70 text-[10px]">
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
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <h2 className="font-sans text-[15px] font-bold text-[color:var(--foreground)] mb-1">
            Our Services
          </h2>
          {SERVICES.map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="flex gap-3 items-start rounded-xl p-3 bg-[color-mix(in_srgb,var(--accent)_4%,var(--background))]"
            >
              <span className="text-xl leading-[1.4] shrink-0">{emoji}</span>
              <div>
                <div className="text-[13px] font-semibold text-[color:var(--foreground)] mb-0.5">
                  {title}
                </div>
                <div className="text-[11px] text-[color:var(--muted-foreground)] leading-[1.5]">
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Media grid (Posts / Reels / Images) ── */}
      <MediaGrid />
      <footer className="pt-2 pb-6 flex flex-col justify-center items-center ">
        <div className="flex flex-col items-center py-8 gap-2">
          <div className="rounded-full flex items-center justify-center w-12 h-12 bg-[linear-gradient(135deg,#65A30D_0%,#A3E635_100%)]">
            <img src={logo} alt="" />
          </div>

          <p className="text-[13px] text-[#8e8e93] text-center">
            You've explored all profile contents.
          </p>
          <Link
            to={"/"}
            onClick={() => onNavigate("casestudies")}
            className="mt-0 flex items-center gap-2 font-base flex-row justify-center cursor-pointer text-[#579F63]"
          >
            Explore More
            <ArrowRight size={16} />
          </Link>
        </div>
      </footer>
    </div>
  );
}
