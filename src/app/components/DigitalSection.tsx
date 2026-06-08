import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import toyotaCover from "../../assets/Croma.jpg";
import toyotaDetail from "../../assets/Croma.jpg";
import { useEffect } from "react";
import krishiCover from "../../assets/Croma.jpg";
import krishiDetail from "../../assets/Croma.jpg";

import pmsCover from "../../assets/Croma.jpg";
import pmsDetail from "../../assets/Croma.jpg";

export function DigitalSection({ onNavigate }) {
  const [selectedProject, setSelectedProject] = useState(null);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // use "auto" for instant jump
    });
  }, []);
  //   const bottomRef = useRef(null);

  //   useEffect(() => {
  //     const el = bottomRef.current;
  //     if (!el) return;

  //     const observer = new IntersectionObserver(
  //       ([entry]) => {
  //         if (entry.isIntersecting) {
  //           observer.disconnect();
  //           navigate("exhibition");
  //         }
  //       },
  //       { threshold: 0 },
  //     );

  //     observer.observe(el);

  //     return () => observer.disconnect();
  //   }, [navigate]);

  const DIGITAL_PROJECTS = [
    {
      id: 1,
      name: "Toyota Digital Campaign",
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
      name: "Krishivikas Platform",
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
      name: "PMS Corporate Portal",
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
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
            {DIGITAL_PROJECTS.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -3 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                }}
                onClick={() => setSelectedProject(project)}
                className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm cursor-pointer"
                style={{ border: "1px solid #f0f0f5" }}
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full object-cover transition-transform duration-500 hover:scale-105"
                    style={{ height: 220 }}
                  />

                  <span
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-[#2C7048]"
                    style={{
                      color: "#fff",
                      fontSize: 11,
                    }}
                  >
                    Reach {project.reach}
                  </span>
                </div>

                {/* Content */}
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

                  {/* Service Preview */}
                  {/* <div className="mt-4 flex flex-wrap gap-2">
                    {project.services.slice(0, 2).map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          background: "#fdf2f5",
                          color: "#d4456a",
                          border: "1px solid #f5e0e7",
                        }}
                      >
                        {service}
                      </span>
                    ))}
                  </div> */}

                  {/* <button
                    className="mt-4 w-full py-2 rounded-xl font-medium transition-all"
                    style={{
                      background: "#d4456a",
                      color: "#fff",
                    }}
                  >
                    View Project
                  </button> */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center py-8 gap-2">
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: 48,
              height: 48,
              background: "linear-gradient(135deg, #65A30D 0%, #A3E635 100%)",
            }}
          >
            <span style={{ color: "#fff", fontSize: 20 }}>D</span>
          </div>

          <p
            style={{
              fontSize: 13,
              color: "#8e8e93",
              textAlign: "center",
            }}
          >
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

              {/* Title */}
              <div className="absolute top-8 left-8">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl px-6 py-4">
                  <h2 className="text-white text-3xl font-bold font-sans">
                    {selectedProject.name}
                  </h2>
                </div>
              </div>

              {/* Reach */}
              <div className="absolute top-8 right-8">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-5">
                  <h4 className="text-white/70 text-sm">Reach</h4>
                  <p className="text-white text-3xl font-bold">
                    {selectedProject.reach}
                  </p>
                </div>
              </div>

              {/* Engagement */}
              <div className="absolute bottom-8 left-8">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-5">
                  <h4 className="text-white/70 text-sm">Engagement</h4>
                  <p className="text-white text-3xl font-bold">
                    {selectedProject.engagement}
                  </p>
                </div>
              </div>

              {/* Services */}
              <div className="absolute bottom-8 right-8 w-[320px]">
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

              {/* Close */}
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

      {/* <div ref={bottomRef} style={{ height: 1 }} /> */}
    </>
  );
}
