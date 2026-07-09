import { useState } from "react";
import { motion } from "motion/react";
import { X, ChevronLeft, ChevronRight, Heart, Play } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { AnimatePresence } from "motion/react";
export default function MediaLightbox({ items, startIndex, onClose }) {
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
