import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import toyotaCover from "../../assets/drumtao/DrumTao/dt7.webp";
import toyotaDetail from "../../assets/drumtao/DrumTao/dt4.webp";
import krishiCover from "../../assets/arun/arun_webp/arun.webp";
import krishiDetail from "../../assets/arun/arun_webp/arun3.webp";
import logo from "../../assets/logo.jpg";
import pmsCover from "../../assets/mia/mia2.webp";
import pmsDetail from "../../assets/mia/mia3.webp";
import zira1 from "../../assets/zira/zira1.webp";
import zira3 from "../../assets/zira/zira3.webp";
export function DigitalSection({ onNavigate }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef(null);

  // ── Full data pool — add more entries here to extend the list
  const DIGITAL_PROJECTS_ALL = [
    {
      id: 1,
      name: "Drum Tao",
      image: toyotaCover,
      modalImage: toyotaDetail,
      reach: "2.5M+",
      engagement: "320K+",
      services: [
        "Microsite Development",
        "QR Registration",
        "Social Media Campaign",
        "Analytics Dashboard",
      ],
    },
    {
      id: 2,
      name: "Arun Icecream",
      image: krishiCover,
      modalImage: krishiDetail,
      reach: "1.2M+",
      engagement: "150K+",
      services: [
        "Website Design",
        "Lead Generation",
        "SEO Optimization",
        "Campaign Reporting",
      ],
    },
    {
      id: 3,
      name: "Mia by Tanishq",
      image: pmsCover,
      modalImage: pmsDetail,
      reach: "850K+",
      engagement: "95K+",
      services: [
        "Corporate Portal",
        "Dashboard Design",
        "Email Automation",
        "Performance Marketing",
      ],
    },
    {
      id: 4,
      name: "Toyota Zero",
      image: zira1,
      modalImage: zira3,
      reach: "3.1M+",
      engagement: "410K+",
      services: [
        "Digital Strategy",
        "Paid Media Buying",
        "Content Creation",
        "Conversion Tracking",
      ],
    },
    {
      id: 5,
      name: "Drum Tao",
      image: krishiCover,
      modalImage: krishiDetail,
      reach: "780K+",
      engagement: "88K+",
      services: [
        "UX Research",
        "Portal Development",
        "WhatsApp Integration",
        "Regional SEO",
      ],
    },
    {
      id: 6,
      name: "Arun Icecream",
      image: pmsCover,
      modalImage: pmsDetail,
      reach: "1.9M+",
      engagement: "220K+",
      services: [
        "Landing Page Design",
        "CRM Integration",
        "Retargeting Ads",
        "Monthly Analytics",
      ],
    },
  ];

  const visibleProjects = DIGITAL_PROJECTS_ALL.slice(0, visibleCount);
  const hasMore = visibleCount < DIGITAL_PROJECTS_ALL.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + 3, DIGITAL_PROJECTS_ALL.length),
      );
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
        {/* Header */}
        <div
          className="sticky top-0 z-10 px-4 pt-4 pb-4"
          style={{ background: "var(--color-background, #fff)" }}
        >
          <h1
            className="font-semibold text-gray-900 font-sans lg:text-3xl md:text-2xl text-xl"
            style={{ letterSpacing: "-0.01em" }}
          >
            Digital Solutions
          </h1>
          <p className="text-gray-500 mt-1" style={{ fontSize: 13 }}>
            Showcasing digital campaigns, websites, analytics and engagement
            solutions.
          </p>
        </div>

        {/* Cards */}
        <div className="px-2 py-5">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                // Newly loaded cards fade + slide up; existing cards skip re-animation
                initial={
                  index >= visibleCount - 3 ? { opacity: 0, y: 20 } : false
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: (index % 3) * 0.08 }}
                whileHover={{ y: -3 }}
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm cursor-pointer"
                style={{ border: "1px solid #f0f0f5" }}
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full object-cover transition-transform duration-500 hover:scale-105"
                    style={{ height: 220 }}
                  />
                  <span
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-linear-to-r from-lime-800 to-lime-600 text-transparent"
                    style={{ color: "#fff", fontSize: 11 }}
                  >
                    Reach {project.reach}
                  </span>
                </div>
                <div className="p-4">
                  <h3
                    className="font-semibold text-gray-900 leading-snug line-clamp-1 font-sans"
                    style={{ fontSize: 15 }}
                  >
                    {project.name}
                  </h3>
                  <div className="mt-3 flex flex-col gap-2">
                    <div
                      className="flex items-center justify-between text-gray-500"
                      style={{ fontSize: 13 }}
                    >
                      <span>Engagement</span>
                      <span className="font-medium text-lime-500">
                        {project.engagement}
                      </span>
                    </div>
                    <div
                      className="flex items-center justify-between text-gray-500"
                      style={{ fontSize: 13 }}
                    >
                      <span>Services</span>
                      <span className="text-lime-500">
                        {project.services.length}
                      </span>
                    </div>
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
                      <p className="text-xs text-gray-400 mb-1">Reach</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {hoveredProject.reach}
                      </p>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-400 mb-1">Engagement</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {hoveredProject.engagement}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">
                    Services
                  </p>
                  <div className="space-y-2">
                    {hoveredProject.services.map((service) => (
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

        {/* Footer — only shown once all cards are loaded */}
        {!hasMore && (
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
            <p style={{ fontSize: 13, color: "#8e8e93", textAlign: "center" }}>
              You've explored all digital projects.
            </p>
            <button
              onClick={() => onNavigate("exhibition")}
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
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl h-[80vh] overflow-hidden rounded-3xl"
            >
              <img
                src={selectedProject.modalImage}
                alt={selectedProject.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute top-8 left-8">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl px-6 py-4">
                  <h2 className="text-white text-xl md:text-3xl md:font-bold font-sans font-medium">
                    {selectedProject.name}
                  </h2>
                </div>
              </div>
              <div className="absolute md:top-8 right-8 top-40">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-5">
                  <h4 className="text-white/70 text-sm">Reach</h4>
                  <p className="text-white md:text-3xl font-bold text-sm">
                    {selectedProject.reach}
                  </p>
                </div>
              </div>
              <div className="absolute md:bottom-8 left-8 bottom-84">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-5 flex flex-col justify-center items-center">
                  <h4 className="text-white/70 text-sm">Engagement</h4>
                  <p className="text-white md:text-3xl font-bold text-sm">
                    {selectedProject.engagement}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-8 md:right-8 w-[320px] right-1">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6">
                  <h4 className="text-white font-semibold mb-4">
                    Services Delivered
                  </h4>
                  <div className="space-y-3">
                    {selectedProject.services.map((service) => (
                      <div
                        key={service}
                        className="flex items-center gap-3 text-white/90"
                      >
                        <span className="w-2 h-2 rounded-full bg-lime-400" />
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 text-white text-xl hover:bg-black/70"
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
