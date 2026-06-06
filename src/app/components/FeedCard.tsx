import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, MessageCircle, Link2, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { toast } from "sonner";
import { CommentModal } from "./CommentModal";
import type { FeedPost } from "../data/mockData";

interface FeedCardProps {
  post: FeedPost;
}

export function FeedCard({ post }: FeedCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [captionExpanded, setCaptionExpanded] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [commentOpen, setCommentOpen] = useState(false);
  const [showMiniProfile, setShowMiniProfile] = useState(false);

  const handleLike = () => {
    setLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
    if (!liked) {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 900);
    }
  };

  const handleDoubleClick = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 900);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(post.projectUrl).catch(() => {});
    toast.success("Project link copied!", { duration: 2000 });
  };

  const multipleImages = post.images.length > 1;

  return (
    <>
      <article
        className="bg-white rounded-2xl overflow-hidden"
        style={{ maxWidth: 460, margin: "0 auto", width: "100%" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-0 py-3 relative"
          onMouseEnter={() => setShowMiniProfile(true)}
          onMouseLeave={() => setShowMiniProfile(false)}
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <div
              className="rounded-full flex items-center justify-center shrink-0"
              style={{ width: 42, height: 42, background: post.client.bgColor }}
            >
              <span style={{ color: post.client.color, fontSize: 14, fontWeight: 700 }}>
                {post.client.initials}
              </span>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{post.client.name}</div>
              <div className="flex items-center gap-1" style={{ color: "#8e8e93", fontSize: 12 }}>
                <MapPin size={11} />
                <span>{post.location}</span>
              </div>
            </div>
          </div>

          {/* Mini profile hover card */}
          <AnimatePresence>
            {showMiniProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full left-4 z-20 bg-white rounded-2xl p-4 shadow-xl"
                style={{ width: 280, border: "1px solid rgba(0,0,0,0.08)", marginTop: 4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="rounded-full flex items-center justify-center shrink-0"
                    style={{ width: 52, height: 52, background: post.client.bgColor }}
                  >
                    <span style={{ color: post.client.color, fontSize: 18, fontWeight: 700 }}>{post.client.initials}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{post.client.name}</div>
                    <div style={{ fontSize: 12, color: "#8e8e93" }}>{post.client.category}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-1" style={{ fontSize: 12, color: "#8e8e93" }}>
                  <MapPin size={11} /><span>{post.location}</span>
                </div>
                <div style={{ fontSize: 12, color: "#8e8e93" }}>{post.date}</div>
                {/* Mini image grid */}
                <div className="grid grid-cols-3 gap-1 mt-3 rounded-xl overflow-hidden">
                  {post.images.slice(0, 3).map((img, i) => (
                    <img
                      key={i}
                      src={img.replace("w=630&h=630", "w=100&h=100")}
                      alt=""
                      className="w-full aspect-square object-cover"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Media */}
        <div
          className="relative overflow-hidden rounded-md"
          style={{ aspectRatio: "1/1", background: "#f5f5f7" }}
          onDoubleClick={handleDoubleClick}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={imageIndex}
              src={post.images[imageIndex]}
              alt={post.caption.slice(0, 40)}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
          </AnimatePresence>

          {/* Category tag overlay */}
          <div
            className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(6px)",
              fontSize: 11,
              fontWeight: 600,
              color: "#fff",
              fontFamily: "var(--font-family-body)",
              letterSpacing: "0.02em",
            }}
          >
            {post.category}
          </div>

          {/* Double-tap heart */}
          <AnimatePresence>
            {showHeart && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.4, opacity: 1 }}
                exit={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <Heart size={80} fill="#fff" stroke="none" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image navigation */}
          {multipleImages && (
            <>
              {imageIndex > 0 && (
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
                  style={{ width: 28, height: 28, background: "rgba(255,255,255,0.85)" }}
                  onClick={() => setImageIndex((i) => i - 1)}
                >
                  <ChevronLeft size={14} />
                </button>
              )}
              {imageIndex < post.images.length - 1 && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
                  style={{ width: 28, height: 28, background: "rgba(255,255,255,0.85)" }}
                  onClick={() => setImageIndex((i) => i + 1)}
                >
                  <ChevronRight size={14} />
                </button>
              )}
              {/* Dots */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {post.images.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-200"
                    style={{
                      width: i === imageIndex ? 18 : 6,
                      height: 6,
                      background: i === imageIndex ? "#fff" : "rgba(255,255,255,0.5)",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="px-0 pt-3 pb-1 flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleLike}
            className="flex items-center gap-1.5"
            style={{ color: liked ? "#d4456a" : "#1a1a1a" }}
          >
            <motion.div animate={{ scale: liked ? [1, 1.4, 1] : 1 }} transition={{ duration: 0.3 }}>
              <Heart
                size={24}
                fill={liked ? "#d4456a" : "none"}
                strokeWidth={liked ? 0 : 1.8}
              />
            </motion.div>
          </motion.button>


          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleCopy}
            style={{ color: "#1a1a1a" }}
          >
            <Link2 size={22} strokeWidth={1.8} />
          </motion.button>
        </div>

        {/* Caption */}
        <div className="px-0 pb-4">
          <span style={{ fontSize: 14, fontWeight: 600, marginRight: 6 }}>{post.client.name}</span>
          <span
            style={{
              fontSize: 14,
              color: "#1a1a1a",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: captionExpanded ? undefined : 2,
              overflow: captionExpanded ? "visible" : "hidden",
            }}
          >
            {post.caption}
          </span>
          {!captionExpanded && (
            <button
              onClick={() => setCaptionExpanded(true)}
              style={{ fontSize: 13, color: "var(--muted-foreground)", fontFamily: "var(--font-family-body)", background: "none", border: "none", padding: 0, cursor: "pointer", marginTop: 2 }}
            >
              read more
            </button>
          )}
          <div style={{ fontSize: 11, color: "#b0b0b8", marginTop: 4 }}>{post.date}</div>
        </div>
      </article>

      <CommentModal
        isOpen={commentOpen}
        onClose={() => setCommentOpen(false)}
        comments={post.comments}
        postTitle={post.client.name}
      />
    </>
  );
}
