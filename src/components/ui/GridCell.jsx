import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Heart, MessageCircle } from "lucide-react";

export default function GridCell({ item, onClick }) {
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
