import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  MessageCircle,
  Link2,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { CommentModal } from "../common/CommentModal";
import { PostViewer } from "../../components/ui/Postviewer";

export function FeedCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [captionExpanded, setCaptionExpanded] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [commentOpen, setCommentOpen] = useState(false);
  const [showMiniProfile, setShowMiniProfile] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);

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
    toast.success("Thanks to show interest!", { duration: 2000 });
  };

  const multipleImages = post.media.length > 1;
  const currentMedia = post.media[imageIndex];

  return (
    <>
      <article className="bg-white rounded-2xl overflow-hidden w-full max-w-[460px] mx-auto">
        {/* Header */}
        <div
          className="flex items-center justify-between px-0 py-3 relative"
          onMouseEnter={() => setShowMiniProfile(true)}
          onMouseLeave={() => setShowMiniProfile(false)}
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="rounded-full flex items-center justify-center shrink-0 overflow-hidden w-[42px] h-[42px]">
              <img src={post.client.initials} alt="" className="rounded-full" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1a1a1a]">
                {post.client.name}
              </div>
              <div className="flex items-center gap-1 text-[#8e8e93] text-xs">
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
                className="absolute top-full left-1 z-20 bg-white rounded-2xl p-4 shadow-xl w-[280px] border border-[rgba(0,0,0,0.08)] mt-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-full flex items-center justify-center shrink-0 overflow-hidden h-[52px] w-[52px] bg-[post.client.bgColor]">
                    <span>
                      <img
                        src={post.client.initials}
                        alt=""
                        className="rounded-full"
                      />
                    </span>
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold">
                      {post.client.name}
                    </div>
                    <div className="text-[12px] text-[#8e8e93]">
                      {post.client.category}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-1 text-[12px] text-[#8e8e93]">
                  <MapPin size={11} />
                  <span>{post.location}</span>
                </div>
                <div className="text-[12px] text-[#8e8e93]">{post.date}</div>
                {/* Thumbnails — use poster for video items so we never show a raw <video> here */}
                <div className="grid grid-cols-3 gap-1 mt-3 rounded-xl overflow-hidden">
                  {post.media.slice(0, 3).map((item, i) => {
                    const thumbSrc =
                      item.type === "video" ? (item.poster ?? "") : item.url;
                    return (
                      <img
                        key={i}
                        src={thumbSrc.replace("w=630&h=630", "w=100&h=100")}
                        alt=""
                        className="w-full aspect-square object-cover"
                      />
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Media — click opens fullscreen viewer */}
        <div
          className="relative overflow-hidden rounded-md cursor-pointer bg-[#f5f5f7] aspect-square"
          onDoubleClick={handleDoubleClick}
          onClick={() => setViewerOpen(true)}
        >
          <AnimatePresence mode="wait">
            {currentMedia.type === "video" ? (
              <motion.video
                key={imageIndex}
                src={currentMedia.url}
                poster={currentMedia.poster}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                muted
                loop
                playsInline
                autoPlay
              />
            ) : (
              <motion.img
                key={imageIndex}
                src={currentMedia.url}
                alt={post.caption.slice(0, 40)}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            )}
          </AnimatePresence>

          {/* Category tag overlay */}
          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-linear-to-r from-lime-800 to-lime-600 text-white  backdrop-blur-[6px] text-[11px] font-semibold  tracking-[0.02em]">
            {post.category}
          </div>

          {/* Tap-to-expand hint */}
          <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 bg-[rgba(0,0,0,0.45)] backdrop-blur-[6px] text-[11px] text-white" />

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
                <Heart
                  size={80}
                  fill="#fff"
                  stroke="none"
                  className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Media navigation — stop propagation so arrows don't open viewer */}
          {multipleImages && (
            <>
              {imageIndex > 0 && (
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center w-7 h-7 bg-white/85"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageIndex((i) => i - 1);
                  }}
                >
                  <ChevronLeft size={14} />
                </button>
              )}
              {imageIndex < post.media.length - 1 && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center w-7 h-7 bg-[rgba(255,255,255,0.85)]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageIndex((i) => i + 1);
                  }}
                >
                  <ChevronRight size={14} />
                </button>
              )}
              {/* Dots */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {post.media.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-200 h-[6px] ${
                      i === imageIndex
                        ? "w-[18px] bg-white"
                        : "w-[6px] bg-[rgba(255,255,255,0.5)]"
                    }`}
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
            className={`flex items-center gap-1.5 ${liked ? "text-[#d4456a]" : "text-[#1a1a1a]"}`}
          >
            <motion.div
              animate={{ scale: liked ? [1, 1.4, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
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
            className="text-[#1a1a1a]"
          >
            <Link2 size={22} strokeWidth={1.8} />
          </motion.button>
        </div>

        {/* Caption */}
        <div className="px-0 pb-4">
          <span className="text-sm font-semibold mr-1.5">
            {post.client.name}
          </span>
          <span
            className={`text-sm text-[#1a1a1a] ${captionExpanded ? "line-clamp-none overflow-visible" : "line-clamp-2 overflow-hidden"}`}
          >
            {post.caption}
          </span>
          {!captionExpanded && (
            <button
              onClick={() => setCaptionExpanded(true)}
              className="text-[13px] text-[var(--muted-foreground)] font-[var(--font-family-body)] bg-none border-none p-0 cursor-pointer mt-0.5"
            >
              read more
            </button>
          )}
          <div className="text-[11px] text-[#b0b0b8] mt-1">{post.date}</div>
        </div>
      </article>

      {/* Fullscreen viewer */}
      <AnimatePresence>
        {viewerOpen && (
          <PostViewer post={post} onClose={() => setViewerOpen(false)} />
        )}
      </AnimatePresence>

      <CommentModal
        isOpen={commentOpen}
        onClose={() => setCommentOpen(false)}
        comments={post.comments}
        postTitle={post.client.name}
      />
    </>
  );
}
