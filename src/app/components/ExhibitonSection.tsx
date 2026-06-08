import { motion, AnimatePresence } from "motion/react";
import { Grid3x2 as logo1 } from "lucide-react";
import image1 from "../../assets/AL.jpg";
import image3 from "../../assets/Croma.jpg";
import image2 from "../../assets/AL.jpg";
import image5 from "../../assets/AL.jpg";
import image7 from "../../assets/AL.jpg";
import image6 from "../../assets/Croma.jpg";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
// import { NextSection } from "../pages/NextSection.jsx";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useRef } from "react";
export function ExhibitionSection({ onNavigate }) {
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const EXHIBITION_STATS = [
    {
      title: "Exhibitions Completed",
      value: "150+",
      icon: "🏆",
    },
    {
      title: "Booth Area Covered",
      value: "75,000+ sq.ft",
      icon: "📐",
    },
    {
      title: "Design Awards Won",
      value: "24",
      icon: "🥇",
    },
  ];

  const EXHIBITIONS = [
    {
      id: 1,
      name: "Auto Expo 2026",
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
      name: "Tech Innovation Summit",
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
      name: "Industrial Trade Fair",
      boothSize: "3,200 sq.ft",
      attendance: "60,000+",
      features: [
        "Brand Showcase Zone",
        "Networking Lounge",
        "Digital Product Displays",
        "Live Demo Area",
      ],
      image: image6,
      modalImage: image1,
    },
  ];
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
  //           navigate("activation");
  //         }
  //       },
  //       { threshold: 0.9 }, // fire when 90% of the sentinel is visible
  //     );

  //     observer.observe(el);
  //     return () => observer.disconnect();
  //   }, [navigate]);

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
          {EXHIBITIONS.map((exhibition) => (
            <motion.div
              key={exhibition.id}
              whileHover={{ y: -3 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
              }}
              onClick={() => setSelectedExhibition(exhibition)}
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

                {/* <span
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "#d4456a",
                    color: "#fff",
                    fontSize: 11,
                  }}
                >
                  {exhibition.boothSize}
                </span> */}
              </div>

              <div className="p-4">
                <h3
                  className="font-semibold text-gray-900 leading-snug font-sans"
                  style={{ fontSize: 15 }}
                >
                  {exhibition.name}
                </h3>

                <div className="mt-3 flex items-center justify-between text-gray-500 ">
                  <span style={{ fontSize: 13 }}>Attendance</span>

                  <span
                    style={{
                      fontSize: 13,

                      fontWeight: 600,
                    }}
                    className="text-lime-500"
                  >
                    {exhibition.attendance}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-gray-500">
                  <span style={{ fontSize: 13 }}>Booth Size</span>

                  <span
                    style={{
                      fontSize: 13,

                      fontWeight: 600,
                    }}
                    className="text-lime-500"
                  >
                    {exhibition.boothSize}
                  </span>
                </div>

                {/* <div className="mt-4 flex flex-wrap gap-2">
                  {exhibition.features.slice(0, 2).map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 rounded-full text-xs"
                      style={{
                        background: "#fdf2f5",
                        color: "#d4456a",
                        border: "1px solid #f5e0e7",
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div> */}

                {/* <button
                  className="mt-4 w-full py-2 rounded-xl font-medium"
                  style={{
                    background: "#d4456a",
                    color: "#fff",
                  }}
                >
                  View Exhibition
                </button> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
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

              {/* Floating Title */}
              <div className="absolute top-8 left-8">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl px-6 py-4">
                  <h2 className="text-white text-3xl font-bold font-sans">
                    {selectedExhibition.name}
                  </h2>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute top-8 right-8 flex gap-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3">
                  <p className="text-white/70 text-xs">Booth Size</p>
                  <p className="text-white font-semibold ">
                    {selectedExhibition.boothSize}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3">
                  <p className="text-white/70 text-xs">Attendance</p>
                  <p className="text-white font-semibold ">
                    {selectedExhibition.attendance}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3">
                  <p className="text-white/70 text-xs">Attendance</p>
                  <p className="text-white font-semibold ">
                    {selectedExhibition.attendance}
                  </p>
                </div>
              </div>

              {/* Floating Features */}
              <div className="absolute bottom-8 left-8 max-w-md">
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

              {/* Close Button */}
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
      {/* Statistics */}
      <div className="flex flex-col items-center py-8 gap-2">
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: 48,
            height: 48,
            background: "linear-gradient(135deg, #d4456a 0%, #f9a8c9 100%)",
          }}
        >
          <span style={{ color: "#fff", fontSize: 20 }}>A</span>
        </div>
        <p style={{ fontSize: 13, color: "#8e8e93", textAlign: "center" }}>
          You've seen all exhibitions.
          <br />
          {/* <a href="#" style={{ color: "#d4456a", fontWeight: 600 }}>
            View full event calendar →
          </a> */}
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
    </div>
  );
}
