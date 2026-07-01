import { motion, AnimatePresence } from "motion/react";
import image1 from "../../assets/drumtao/DrumTao/dt3.webp";
import image5 from "../../assets/mia/mia 2.webp";
import image7 from "../../assets/drumtao/DrumTao/dt7.webp";
import image6 from "../../assets/arun/arun_webp/arun8.webp";
import image9 from "../../assets/arun/arun_webp/arun4.webp";
import image2 from "../../assets/mia/mia2.webp";
import logo from "../../assets/logo.jpg";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight } from "lucide-react";

export function ExhibitionSection({ onNavigate }) {
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef(null);

  // ── Full data pool ── add more entries here to extend the list
  const EXHIBITIONS_ALL = [
    {
      id: 1,
      name: "Drum Tao",
      boothSize: "2,500 sq.ft",
      attendance: "45,000+",
      features: [
        "Interactive EV Zone",
        "Immersive LED Wall",
        "Product Demonstration Area",
        "VIP Lounge",
      ],
      image: image1,
      modalImage: image7,
    },
    {
      id: 2,
      name: "Mia by tanishq",
      boothSize: "1,800 sq.ft",
      attendance: "28,000+",
      features: [
        "AR Product Experience",
        "Live Presentation Stage",
        "Meeting Pods",
        "Digital Registration Counter",
      ],
      image: image2,
      modalImage: image5,
    },
    {
      id: 3,
      name: "Arun Icecream Promotion",
      boothSize: "3,200 sq.ft",
      attendance: "60,000+",
      features: [
        "Brand Showcase Zone",
        "Networking Lounge",
        "Digital Product Displays",
        "Live Demo Area",
      ],
      image: image6,
      modalImage: image9,
    },
    {
      id: 4,
      name: "Global Manufacturing Expo",
      boothSize: "2,800 sq.ft",
      attendance: "52,000+",
      features: [
        "Robotics Live Demo",
        "Sustainability Zone",
        "B2B Meeting Hub",
        "Innovation Gallery",
      ],
      image: image1,
      modalImage: image5,
    },
    {
      id: 5,
      name: "Arun Icecream Promotion",
      boothSize: "1,500 sq.ft",
      attendance: "19,000+",
      features: [
        "IoT Product Display",
        "Urban Planning Models",
        "Panel Discussion Stage",
        "Networking Zone",
      ],
      image: image6,
      modalImage: image9,
    },
    {
      id: 6,
      name: "Mia by Tanishq",
      boothSize: "2,100 sq.ft",
      attendance: "38,000+",
      features: [
        "Brand Experience Zone",
        "Pop-up Store Setup",
        "Digital Kiosks",
        "Customer Journey Demo",
      ],
      image: image2,
      modalImage: image5,
    },
  ];

  const visibleExhibitions = EXHIBITIONS_ALL.slice(0, visibleCount);
  const hasMore = visibleCount < EXHIBITIONS_ALL.length;

  // Load 3 more cards with a short delay for smoothness
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 3, EXHIBITIONS_ALL.length));
      setIsLoading(false);
    }, 600);
  }, [isLoading, hasMore]);

  // Watch the sentinel div — fire loadMore when it enters the viewport
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
          Exhibitions
        </h1>
        <p className="text-gray-500 mt-0.5" style={{ fontSize: 13 }}>
          Showcasing our exhibition excellence and achievements
        </p>
      </div>

      {/* Exhibition Cards */}
      <div className="px-2 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleExhibitions.map((exhibition, index) => (
            <motion.div
              key={exhibition.id}
              // Newly loaded cards fade + slide up; existing cards skip animation
              initial={
                index >= visibleCount - 3 ? { opacity: 0, y: 20 } : false
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: (index % 3) * 0.08 }}
              whileHover={{ y: -3 }}
              onClick={() => setSelectedExhibition(exhibition)}
              onMouseEnter={() => setHoveredProject(exhibition)}
              onMouseLeave={() => setHoveredProject(null)}
              className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm cursor-pointer"
              style={{ border: "1px solid #f0f0f5" }}
            >
              <div className="relative">
                <img
                  src={exhibition.image}
                  alt={exhibition.name}
                  className="w-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{ height: 220 }}
                />
              </div>
              <div className="p-4">
                <h3
                  className="font-semibold text-gray-900 leading-snug font-sans"
                  style={{ fontSize: 15 }}
                >
                  {exhibition.name}
                </h3>
                <div className="mt-3 flex items-center justify-between text-gray-500">
                  <span style={{ fontSize: 13 }}>Attendance</span>
                  <span
                    style={{ fontSize: 13, fontWeight: 600 }}
                    className="text-lime-500"
                  >
                    {exhibition.attendance}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-gray-500">
                  <span style={{ fontSize: 13 }}>Booth Size</span>
                  <span
                    style={{ fontSize: 13, fontWeight: 600 }}
                    className="text-lime-500"
                  >
                    {exhibition.boothSize}
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
                  src={hoveredProject.modalImage}
                  alt={hoveredProject.name}
                  className="w-full rounded-xl object-cover mb-4"
                  style={{ height: 150 }}
                />
                <h3 className="font-semibold text-gray-900 font-sans text-sm mb-3">
                  {hoveredProject.name}
                </h3>
                <div className="flex gap-2 mb-4">
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Attendance</p>
                    <p className="text-xs font-semibold text-gray-800">
                      {hoveredProject.attendance}
                    </p>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Booth Size</p>
                    <p className="text-xs font-semibold text-gray-800">
                      {hoveredProject.boothSize}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">
                  Services
                </p>
                <div className="space-y-2">
                  {hoveredProject.features.map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-lime-400 flex-shrink-0" />
                      {service}
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

      {/* Modal */}
      <AnimatePresence>
        {selectedExhibition && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExhibition(null)}
          >
            <motion.div
              className="relative max-w-6xl w-full h-[85vh] overflow-hidden rounded-3xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedExhibition.modalImage}
                alt={selectedExhibition.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute top-8 left-8">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl px-6 py-4">
                  <h2 className="text-white text-3xl font-bold font-sans">
                    {selectedExhibition.name}
                  </h2>
                </div>
              </div>
              <div className="absolute md:top-8 right-8 flex gap-4 top-40">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3">
                  <p className="text-white/70 text-xs">Booth Size</p>
                  <p className="text-white font-semibold">
                    {selectedExhibition.boothSize}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3">
                  <p className="text-white/70 text-xs">Attendance</p>
                  <p className="text-white font-semibold">
                    {selectedExhibition.attendance}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-8 md:left-8 max-w-md left-3.5">
                <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">
                    Exhibition Highlights
                  </h3>
                  <div className="space-y-3">
                    {selectedExhibition.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 text-white/90"
                      >
                        <span className="text-lime-400">●</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedExhibition(null)}
                className="absolute top-3 right-3 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md text-white"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            You've seen all exhibitions.
          </p>
          <button
            onClick={() => onNavigate("activation")}
            className="mt-0 flex items-center gap-2 font-base flex-row justify-center cursor-pointer"
            style={{ color: "#579F63" }}
          >
            Explore More
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
