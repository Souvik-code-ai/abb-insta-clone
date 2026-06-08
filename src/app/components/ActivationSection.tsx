import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
// import { NextSection } from "./NextSection";
// Cover Images
// import droneCover from "../../../assets/activation/drone/cover.jpg";
import miaCover from "../../assets/AL.jpg";
import mallCover from "../../assets/AL.jpg";
import rallyCover from "../../assets/AL.jpg";
import tataCover from "../../assets/AL.jpg";
import miaDetail from "../../assets/AL.jpg";
import mallDetail from "../../assets/AL.jpg";
import rallyDetail from "../../assets/AL.jpg";
import tataDetail from "../../assets/AL.jpg";
import mia1 from "../../assets/AL.jpg";
import mia2 from "../../assets/AL.jpg";
import mia3 from "../../assets/AL.jpg";

import mall1 from "../../assets/AL.jpg";
import mall2 from "../../assets/AL.jpg";
import mall3 from "../../assets/AL.jpg";

import rally1 from "../../assets/AL.jpg";
import rally2 from "../../assets/AL.jpg";
import rally3 from "../../assets/AL.jpg";
import tata1 from "../../assets/AL.jpg";
import tata2 from "../../assets/AL.jpg";
import tata3 from "../../assets/AL.jpg";
export function ActivationSection({ onNavigate }) {
  const [selectedActivation, setSelectedActivation] = useState(null);
  //   const bottomRef = useRef(null);
  const ACTIVATIONS = [
    {
      id: 1,
      title: "MIA Store Launch",
      type: "Retail Activation",
      image: miaCover,
      gallery: [mia1, mia2, mia3],
      audience: "25K+",
      highlights: [
        "Store Inauguration Ceremony",
        "Customer Experience Zone",
        "Product Showcase",
        "Brand Engagement Activities",
        "Media Coverage",
      ],
    },

    {
      id: 2,
      title: "Mall Promotion",
      type: "Mall Activation",
      image: mallCover,
      gallery: [mall1, mall2, mall3],
      audience: "50K+",
      highlights: [
        "Interactive Consumer Engagement",
        "Product Demonstration Booths",
        "Lead Generation Campaign",
        "On-ground Branding",
        "Footfall Conversion Activities",
      ],
    },

    {
      id: 3,
      title: "Bike Rally",
      type: "Roadshow Activation",
      image: rallyCover,
      gallery: [rally1, rally2, rally3],
      audience: "15K+",
      highlights: [
        "Brand Visibility Across City",
        "Rider Community Engagement",
        "Flag-off Ceremony",
        "Roadshow Promotions",
        "Media & Social Coverage",
      ],
    },

    {
      id: 4,
      title: "Tata Culture Connect",
      type: "Corporate Engagement",
      image: tataCover,
      gallery: [tata1, tata2, tata3],
      audience: "8K+",
      highlights: [
        "Employee Engagement Programs",
        "Cultural Activities",
        "Recognition & Awards",
        "Team Building Sessions",
        "Corporate Networking",
      ],
    },
  ];
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // use "auto" for instant jump
    });
  }, []);
  const ACTIVATION_STATS = [
    {
      title: "Activations Delivered",
      value: "500+",
      icon: "🚀",
    },
    {
      title: "Audience Reached",
      value: "5M+",
      icon: "👥",
    },
    {
      title: "Cities Covered",
      value: "120+",
      icon: "📍",
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);
  //   useEffect(() => {
  //     const el = bottomRef.current;
  //     if (!el) return;

  //     const observer = new IntersectionObserver(
  //       ([entry]) => {
  //         if (entry.isIntersecting) {
  //           observer.disconnect();
  //           navigate("profile");
  //         }
  //       },
  //       { threshold: 0.9 }, // fire when 90% of the sentinel is visible
  //     );

  //     observer.observe(el);
  //     return () => observer.disconnect();
  //   }, [navigate]);
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
            {ACTIVATIONS.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -3 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                }}
                onClick={() => {
                  setSelectedActivation(item);
                  setCurrentImage(0);
                }}
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
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-[#2C7048] "
                    style={{
                      color: "#fff",
                      fontSize: 11,
                    }}
                  >
                    {item.type}
                  </span>
                </div>

                <div className="p-4">
                  <h3
                    className="font-semibold text-gray-900 leading-snug font-sans"
                    style={{ fontSize: 15 }}
                  >
                    {item.title}
                  </h3>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-gray-500" style={{ fontSize: 13 }}>
                      Audience Reach
                    </span>

                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                      className="text-lime-500"
                    >
                      {item.audience}
                    </span>
                  </div>
                  {/* 
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.highlights.slice(0, 2).map((highlight) => (
                      <span
                        key={highlight}
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          background: "#fdf2f5",
                          color: "#d4456a",
                          border: "1px solid #f5e0e7",
                        }}
                      >
                        {highlight}
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
                    View Activation
                  </button> */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
            You've seen all activations.
            <br />
            {/* <a href="#" style={{ color: "#d4456a", fontWeight: 600 }}>
            View full event calendar →
          </a> */}
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
        {/* Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {ACTIVATION_STATS.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>

              <h3 className="text-2xl font-bold text-lime-500">{stat.value}</h3>

              <p className="mt-2 text-muted-foreground">{stat.title}</p>
            </div>
          ))}
        </div> */}
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
              {/* Main Image */}
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

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />

              {/* Previous */}
              <button
                onClick={() =>
                  setCurrentImage((prev) =>
                    prev === 0
                      ? selectedActivation.gallery.length - 1
                      : prev - 1,
                  )
                }
                className="absolute left-6 top-1/2 -translate-y-1/2
                     w-14 h-14 rounded-full z-50
                     bg-black/40 backdrop-blur-md
                     text-white text-3xl
                     flex items-center justify-center
                     hover:bg-black/60 transition"
              >
                ❮
              </button>

              {/* Next */}
              <button
                onClick={() =>
                  setCurrentImage((prev) =>
                    prev === selectedActivation.gallery.length - 1
                      ? 0
                      : prev + 1,
                  )
                }
                className="absolute right-6 top-1/2 -translate-y-1/2 z-50
                     w-14 h-14 rounded-full
                     bg-black/40 backdrop-blur-md
                     text-white text-3xl
                     flex items-center justify-center
                     hover:bg-black/60 transition"
              >
                ❯
              </button>

              {/* Title Card */}
              <div className="absolute top-8 left-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-6 py-4">
                <span className="text-xs bg-lime-600 px-3 py-1 rounded-full text-white">
                  {selectedActivation.type}
                </span>

                <h2 className="text-white text-3xl font-bold mt-3 font-sans">
                  {selectedActivation.title}
                </h2>
              </div>

              {/* Audience */}
              <div className="absolute top-8 right-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-6 py-4">
                <p className="text-white/70 text-sm">Audience Reach</p>

                <h3 className="text-white text-3xl font-bold font-sans">
                  {selectedActivation.audience}
                </h3>
              </div>

              {/* Highlights */}
              <div className="absolute bottom-8 right-8 w-[320px] backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
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

              {/* Indicators */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                {selectedActivation.gallery.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`transition-all rounded-full ${
                      currentImage === index
                        ? "w-8 h-3 bg-white"
                        : "w-3 h-3 bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Thumbnail Strip */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3">
                {selectedActivation.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`overflow-hidden rounded-lg border-2 ${
                      currentImage === index
                        ? "border-white"
                        : "border-white/30"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-20 h-14 object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Close */}
              <button
                onClick={() => setSelectedActivation(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full
                     bg-black/50 backdrop-blur-md
                     text-white text-xl
                     flex items-center justify-center"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* <NextSection
        title="Activations"
        description="Explore brand activations, mall promotions, roadshows and experiential marketing campaigns."
        onClick={() => navigate("profile")}
      /> */}
    </>
  );
}
