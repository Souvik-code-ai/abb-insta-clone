import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import logo from "../../assets/images/logo.jpg";
import miaCover from "../../assets/images/mia/mia3.webp";
import mallCover from "../../assets/images/zira/zira1.webp";
import rallyCover from "../../assets/images/drumtao/DrumTao/dt6.webp";
import tataCover from "../../assets/images/arun/arun_webp/aarun1.webp";
import mia1 from "../../assets/images/mia/mia 1.webp";
import mia2 from "../../assets/images/mia/mia2.webp";
import mia3 from "../../assets/images/mia/mia3.webp";
import mia4 from "../../assets/images/mia/mia 2.webp";
import mall1 from "../../assets/images/zira/zira2.webp";
import mall2 from "../../assets/images/zira/zira3.webp";
import mall3 from "../../assets/images/zira/zira4.webp";
import mall4 from "../../assets/images/zira/zira1.webp";
import rally1 from "../../assets/images/drumtao/DrumTao/dt2.webp";
import rally2 from "../../assets/images/drumtao/DrumTao/dt3.webp";
import rally3 from "../../assets/images/drumtao/DrumTao/dt4.webp";
import rally4 from "../../assets/images/drumtao/DrumTao/dt5.webp";
import rally5 from "../../assets/images/drumtao/DrumTao/dt6.webp";
import rally6 from "../../assets/images/drumtao/DrumTao/dt7.webp";
import tata1 from "../../assets/images/arun/arun_webp/arun2.webp";
import tata2 from "../../assets/images/arun/arun_webp/arun3.webp";
import tata3 from "../../assets/images/arun/arun_webp/arun4.webp";
import tata4 from "../../assets/images/arun/arun_webp/arun5.webp";
import tata5 from "../../assets/images/arun/arun_webp/arun6.webp";
import tata6 from "../../assets/images/arun/arun_webp/arun7.webp";
import { ACTIVATIONS_ALL } from "../../../public/activations/activations";
export function ActivationSection({ onNavigate }) {
  const [selectedActivation, setSelectedActivation] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef(null);

  // ── Full data pool — add more entries here to extend the list

  const visibleActivations = ACTIVATIONS_ALL.slice(0, visibleCount);
  const hasMore = visibleCount < ACTIVATIONS_ALL.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 4, ACTIVATIONS_ALL.length));
      setIsLoading(false);
    }, 600);
  }, [isLoading, hasMore]);

  // Watch sentinel div — fires loadMore when it enters the viewport
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "200px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="w-full min-h-screen bg-background min-[1160px]:mx-20 min-[770px]:mx-16 mx-0">
        {/* Heading */}
        <div
          className="sticky top-0 z-10 px-4 pt-4 pb-3"
          style={{ background: "var(--color-background, #fff)" }}
        >
          <h1
            className="font-semibold text-gray-900 font-sans lg:text-3xl md:text-2xl text-xl"
            style={{ letterSpacing: "-0.01em" }}
          >
            Activations
          </h1>
          <p className="text-gray-500 mt-0.5" style={{ fontSize: 13 }}>
            Creating immersive brand experiences and audience engagement
            campaigns
          </p>
        </div>

        {/* Cards */}
        <div className="px-2 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleActivations.map((item, index) => (
              <motion.div
                key={item.id}
                // Newly loaded cards fade + slide up; existing cards skip re-animation
                initial={
                  index >= visibleCount - 4 ? { opacity: 0, y: 20 } : false
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: (index % 4) * 0.07 }}
                whileHover={{ y: -3 }}
                onClick={() => {
                  setSelectedActivation(item);
                  setCurrentImage(0);
                }}
                onMouseEnter={() => setHoveredProject(item)}
                onMouseLeave={() => setHoveredProject(null)}
                className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm cursor-pointer"
                style={{ border: "1px solid #f0f0f5" }}
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full object-cover transition-transform duration-500 hover:scale-105"
                    style={{ height: 240 }}
                  />
                  <span
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-linear-to-r from-lime-800 via-lime-600 to-lime-500 text-transparent"
                    style={{ color: "#fff" }}
                  >
                    {item.type}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 leading-snug font-sans md:text-xl text-sm">
                    {item.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-gray-500" style={{ fontSize: 13 }}>
                      Audience Reach
                    </span>
                    <span
                      className="text-lime-500 text-sm md:text-xl"
                      style={{ fontWeight: 600 }}
                    >
                      {item.audience}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop hover preview panel */}
          <div className="hidden xl:block w-64 2xl:w-100 fixed flex-shrink-0 right-[10vw] top-[15vh]">
            <AnimatePresence mode="wait">
              {hoveredProject && (
                <motion.div
                  key={hoveredProject.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl bg-white border border-gray-100 p-5"
                  style={{ border: "1px solid #f0f0f5" }}
                >
                  <img
                    src={hoveredProject.image}
                    alt={hoveredProject.title}
                    className="w-full rounded-xl object-cover mb-4"
                    style={{ height: 150 }}
                  />
                  <h3 className="font-semibold text-gray-900 font-sans text-sm mb-3">
                    {hoveredProject.title}
                  </h3>
                  <div className="flex gap-2 mb-4">
                    <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-400 mb-1">
                        Audience Reach
                      </p>
                      <p className="text-xs font-semibold text-gray-800">
                        {hoveredProject.audience}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">
                    Highlights
                  </p>
                  <div className="space-y-2">
                    {hoveredProject.highlights.map((h) => (
                      <div
                        key={h}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-lime-400 flex-shrink-0" />
                        {h}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Infinite scroll sentinel & spinner ── */}
        {hasMore && (
          <div
            ref={sentinelRef}
            className="flex justify-center items-center py-8"
          >
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "2px solid #e5e7eb",
                    borderTopColor: "#84cc16",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
                <p style={{ fontSize: 12, color: "#aaa" }}>Loading more…</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </motion.div>
            )}
          </div>
        )}

        {/* Footer — only shown once all cards are loaded */}
        {!hasMore && (
          <div className="flex flex-col items-center py-8 gap-2">
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: 48,
                height: 48,
                background: "linear-gradient(135deg, #d4456a 0%, #f9a8c9 100%)",
              }}
            >
              <img src={logo} alt="" />
            </div>
            <p style={{ fontSize: 13, color: "#8e8e93", textAlign: "center" }}>
              You've seen all activations.
            </p>
            <button
              onClick={() => onNavigate("profile")}
              className="mt-0 flex items-center gap-2 font-base flex-row justify-center cursor-pointer"
              style={{ color: "#579F63" }}
            >
              Explore More
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedActivation && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedActivation(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-7xl h-[85vh] overflow-hidden rounded-3xl"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={selectedActivation.gallery[currentImage]}
                  alt={selectedActivation.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
              <button
                onClick={() =>
                  setCurrentImage((prev) =>
                    prev === 0
                      ? selectedActivation.gallery.length - 1
                      : prev - 1,
                  )
                }
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full z-50 bg-black/40 backdrop-blur-md text-white text-3xl flex items-center justify-center hover:bg-black/60 transition"
              >
                ❮
              </button>
              <button
                onClick={() =>
                  setCurrentImage((prev) =>
                    prev === selectedActivation.gallery.length - 1
                      ? 0
                      : prev + 1,
                  )
                }
                className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-black/40 backdrop-blur-md text-white text-3xl flex items-center justify-center hover:bg-black/60 transition"
              >
                ❯
              </button>
              <div className="absolute top-8 left-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-6 py-4">
                <span className="text-xs bg-lime-600 px-3 py-1 rounded-full text-white">
                  {selectedActivation.type}
                </span>
                <h2 className="text-white md:text-3xl font-bold mt-3 font-sans text-xl">
                  {selectedActivation.title}
                </h2>
              </div>
              <div className="absolute md:top-8 md:right-8 top-45 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-6 py-4 flex justify-center items-center flex-col right-20">
                <p className="text-white/70 text-sm">Audience Reach</p>
                <h3 className="text-white md:text-3xl font-bold font-sans text-xl">
                  {selectedActivation.audience}
                </h3>
              </div>
              <div className="absolute bottom-8 md:right-8 w-[320px] backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 right-1">
                <h4 className="text-white font-semibold mb-4 font-sans">
                  Activation Highlights
                </h4>
                <div className="space-y-3">
                  {selectedActivation.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-center gap-3 text-white"
                    >
                      <span className="w-2 h-2 rounded-full bg-lime-400" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                {selectedActivation.gallery.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`transition-all rounded-full ${currentImage === index ? "w-8 h-3 bg-white" : "w-3 h-3 bg-white/40"}`}
                  />
                ))}
              </div>
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 md:flex gap-3 hidden">
                {selectedActivation.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`overflow-hidden rounded-lg border-2 ${currentImage === index ? "border-white" : "border-white/30"}`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-20 h-14 object-cover"
                    />
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSelectedActivation(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md text-white text-xl flex items-center justify-center"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
