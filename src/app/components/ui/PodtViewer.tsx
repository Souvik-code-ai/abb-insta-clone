import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Heart,
  MessageCircle,
  Link2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize2,
} from "lucide-react";
import { toast } from "sonner";
import type { FeedPost } from "../data/mockData";

interface PostViewerProps {
  post: FeedPost;
  onClose: () => void;
}

export function PostViewer({ post, onClose }: PostViewerProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showHeart, setShowHeart] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [captionExpanded, setCaptionExpanded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isVideo = (src: string) => /\.(mp4|webm|ogg|mov)(\?|$)/i.test(src);

  const currentSrc = post.images[imageIndex];
  const isCurrentVideo = isVideo(currentSrc);
  const multipleMedia = post.images.length > 1;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && imageIndex > 0) setImageIndex((i) => i - 1);
      if (e.key === "ArrowRight" && imageIndex < post.images.length - 1)
        setImageIndex((i) => i + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [imageIndex, onClose, post.images.length]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying((p) => !p);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
    }
    setMuted((m) => !m);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* ── Close button — top left ── */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 10,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          <X size={20} strokeWidth={2} />
        </motion.button>

        {/* ── Category badge — top right ── */}
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 10,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 20,
            padding: "5px 14px",
            fontSize: 12,
            fontWeight: 600,
            color: "#fff",
            letterSpacing: "0.03em",
          }}
        >
          {post.category}
        </div>

        {/* ── Arrow prev ── */}
        <AnimatePresence>
          {multipleMedia && imageIndex > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setImageIndex((i) => i - 1)}
              aria-label="Previous"
              style={{
                position: "absolute",
                left: 20,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              <ChevronLeft size={22} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* ── Arrow next ── */}
        <AnimatePresence>
          {multipleMedia && imageIndex < post.images.length - 1 && (
            <motion.button
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setImageIndex((i) => i + 1)}
              aria-label="Next"
              style={{
                position: "absolute",
                right: 20,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              <ChevronRight size={22} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* ── Media ── */}
        <div
          style={{
            position: "relative",
            width: "min(90vw, 560px)",
            aspectRatio: "1/1",
            borderRadius: 12,
            overflow: "hidden",
          }}
          onDoubleClick={handleDoubleClick}
        >
          <AnimatePresence mode="wait">
            {isCurrentVideo ? (
              <motion.video
                key={currentSrc}
                ref={videoRef}
                src={currentSrc}
                autoPlay
                loop
                muted={muted}
                playsInline
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <motion.img
                key={currentSrc}
                src={currentSrc}
                alt={post.caption.slice(0, 40)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
          </AnimatePresence>

          {/* Double-tap heart */}
          <AnimatePresence>
            {showHeart && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.4, opacity: 1 }}
                exit={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <Heart size={90} fill="#fff" stroke="none" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dot indicators */}
          {multipleMedia && (
            <div
              style={{
                position: "absolute",
                bottom: 80,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                gap: 6,
                zIndex: 4,
              }}
            >
              {post.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  style={{
                    width: i === imageIndex ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background:
                      i === imageIndex ? "#fff" : "rgba(255,255,255,0.45)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "width 0.2s",
                  }}
                />
              ))}
            </div>
          )}

          {/* Bottom gradient */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "45%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 3,
            }}
          />

          {/* ── Bottom left: logo + name + type ── */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 16,
              zIndex: 5,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: post.client.bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                border: "2px solid rgba(255,255,255,0.3)",
              }}
            >
              <span
                style={{
                  color: post.client.color,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {post.client.initials}
              </span>
            </div>

            {/* Name + type */}
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.2,
                  textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                }}
              >
                {post.client.name}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.72)",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <MapPin size={11} style={{ flexShrink: 0, color: "#f9a8c9" }} />
                {post.location} · {post.client.category}
              </p>
            </div>
          </div>

          {/* ── Bottom right: media action buttons ── */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,
              zIndex: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            {/* Like */}
            <motion.button
              whileTap={{ scale: 0.82 }}
              onClick={handleLike}
              aria-label="Like"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <motion.div
                animate={{ scale: liked ? [1, 1.4, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  size={28}
                  fill={liked ? "#d4456a" : "none"}
                  stroke={liked ? "#d4456a" : "#fff"}
                  strokeWidth={liked ? 0 : 2}
                />
              </motion.div>
              <span style={{ fontSize: 11, color: "#fff", lineHeight: 1 }}>
                {likeCount}
              </span>
            </motion.button>

            {/* Comment */}
            <motion.button
              whileTap={{ scale: 0.82 }}
              aria-label="Comments"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <MessageCircle size={28} stroke="#fff" strokeWidth={2} />
              <span style={{ fontSize: 11, color: "#fff", lineHeight: 1 }}>
                {post.comments.length}
              </span>
            </motion.button>

            {/* Copy link */}
            <motion.button
              whileTap={{ scale: 0.82 }}
              onClick={handleCopy}
              aria-label="Copy link"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <Link2 size={26} stroke="#fff" strokeWidth={2} />
            </motion.button>

            {/* Video controls — shown only for video */}
            {isCurrentVideo && (
              <>
                <motion.button
                  whileTap={{ scale: 0.82 }}
                  onClick={togglePlay}
                  aria-label={playing ? "Pause" : "Play"}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {playing ? (
                    <Pause size={26} stroke="#fff" strokeWidth={2} />
                  ) : (
                    <Play size={26} stroke="#fff" strokeWidth={2} />
                  )}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.82 }}
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute" : "Mute"}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {muted ? (
                    <VolumeX size={26} stroke="#fff" strokeWidth={2} />
                  ) : (
                    <Volume2 size={26} stroke="#fff" strokeWidth={2} />
                  )}
                </motion.button>
              </>
            )}
          </div>
        </div>

        {/* ── Caption strip below media ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "12px 24px 20px",
            background: "rgba(0,0,0,0.6)",
            zIndex: 6,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.55,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical" as const,
              WebkitLineClamp: captionExpanded ? undefined : 2,
              overflow: captionExpanded ? "visible" : "hidden",
            }}
          >
            <span style={{ fontWeight: 700, color: "#fff", marginRight: 6 }}>
              {post.client.name}
            </span>
            {post.caption}
          </p>
          {!captionExpanded && post.caption.length > 120 && (
            <button
              onClick={() => setCaptionExpanded(true)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                marginTop: 2,
              }}
            >
              more
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
