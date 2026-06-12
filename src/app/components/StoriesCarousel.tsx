import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Story {
  text: string;
}

export interface Client {
  id: number;
  name: string;
  initials: string;
  bgColor: string;
  color: string;
  seen: boolean;
  stories: Story[];
}

interface StoriesCarouselProps {
  clients: Client[];
  onStoryClick?: (clientId: number) => void;
  onStorySeen?: (clientId: number) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const VISIBLE_DESKTOP = 6;
const ITEM_W = 72;
const ITEM_GAP = 18;
const STORY_DURATION_MS = 4000;

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── Segmented Ring ───────────────────────────────────────────────────────────

function SegmentedRing({
  total,
  seen,
  size = 64,
  activeIdx = -1,
  progress = 0,
}: {
  total: number;
  seen: boolean;
  size?: number;
  activeIdx?: number;
  progress?: number;
}) {
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const gap = total > 1 ? 4 : 0;
  const segmentLength = (circumference - total * gap) / total;

  const unseenColor = "#579F63";
  const seenColor = "#dbdbdb";

  return (
    <svg
      width={size}
      height={size}
      style={{ position: "absolute", top: 0, left: 0 }}
      viewBox={`0 0 ${size} ${size}`}
    >
      {Array.from({ length: total }).map((_, i) => {
        const dashOffset = circumference / 4 - i * (segmentLength + gap);
        const isDone = i < activeIdx;
        const isActive = i === activeIdx;
        const baseColor = seen ? seenColor : unseenColor;

        return (
          <g key={i}>
            {/* Background segment */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={isDone ? unseenColor : seenColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
              strokeDashoffset={dashOffset}
              opacity={activeIdx === -1 ? 1 : 0.3}
            />
            {/* Colored overlay */}
            {activeIdx === -1 && (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={baseColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                strokeDashoffset={dashOffset}
              />
            )}
            {/* Active progress segment */}
            {isActive && activeIdx !== -1 && (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={unseenColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={`${(segmentLength * progress) / 100} ${circumference}`}
                strokeDashoffset={dashOffset}
              />
            )}
            {/* Completed segment */}
            {isDone && activeIdx !== -1 && (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={unseenColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                strokeDashoffset={dashOffset}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─── Story Circle ─────────────────────────────────────────────────────────────

function StoryCircle({
  client,
  onClick,
  onDismiss,
}: {
  client: Client;
  onClick: () => void;
  onDismiss: (id: number) => void;
}) {
  const total = client.stories?.length ?? 1;

  return (
    <div
      className="flex flex-col items-center gap-1.5 shrink-0"
      style={{ width: ITEM_W, position: "relative" }}
    >
      <motion.button
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={onClick}
        className="flex flex-col items-center gap-1.5 bg-transparent border-0 cursor-pointer p-0 w-full"
        aria-label={`View ${client.name}'s stories`}
      >
        <div className="relative" style={{ width: 64, height: 64 }}>
          <SegmentedRing total={total} seen={client.seen} size={64} />
          {/* White gap */}
          <div
            className="absolute rounded-full"
            style={{ inset: 3, border: "2.5px solid white" }}
          />
          {/* Avatar */}
          <div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              inset: 7,
              background: client.bgColor,
              filter: client.seen ? "grayscale(0.3) opacity(0.7)" : "none",
              transition: "filter 0.2s",
            }}
          >
            <span
              style={{ color: client.color, fontSize: 13, fontWeight: 500 }}
            >
              {client.initials}
            </span>
          </div>

          {/* X dismiss button — top-right of avatar */}
          <AnimatePresence>
            {!client.seen && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDismiss(client.id);
                }}
                aria-label={`Dismiss ${client.name}'s story`}
                style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#8e8e93",
                  border: "2px solid white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: 0,
                  zIndex: 10,
                }}
              >
                <X size={8} color="white" strokeWidth={3} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <span
          className="truncate w-full text-center"
          style={{
            fontSize: 11,
            fontWeight: client.seen ? 400 : 500,
            color: client.seen ? "#8e8e93" : "#1a1a1a",
            lineHeight: 1.3,
            transition: "color 0.2s, font-weight 0.2s",
          }}
        >
          {client.name}
        </span>
      </motion.button>
    </div>
  );
}

// ─── Story Viewer ─────────────────────────────────────────────────────────────

function StoryViewer({
  client,
  onClose,
  onSeen,
}: {
  client: Client;
  onClose: () => void;
  onSeen: (id: number) => void;
}) {
  const [storyIdx, setStoryIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = client.stories.length;

  const startTimer = useCallback(
    (idx: number) => {
      if (timerRef.current) clearInterval(timerRef.current);
      setProgress(0);
      const step = (50 / STORY_DURATION_MS) * 100;
      timerRef.current = setInterval(() => {
        setProgress((p) => {
          if (p + step >= 100) {
            clearInterval(timerRef.current!);
            if (idx < total - 1) {
              setTimeout(() => setStoryIdx(idx + 1), 150);
            }
            return 100;
          }
          return p + step;
        });
      }, 50);
    },
    [total],
  );

  useEffect(() => {
    startTimer(storyIdx);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [storyIdx, startTimer]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && storyIdx < total - 1)
        setStoryIdx((i) => i + 1);
      if (e.key === "ArrowLeft" && storyIdx > 0) setStoryIdx((i) => i - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [storyIdx, total, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.82, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.82, y: 20 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="rounded-2xl overflow-hidden"
        style={{
          width: 280,
          background: "white",
          boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 pt-3.5 pb-2.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: client.bgColor }}
          >
            <span
              style={{ color: client.color, fontSize: 13, fontWeight: 500 }}
            >
              {client.initials}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              {client.name}
            </p>
            <p style={{ fontSize: 11, color: "#8e8e93", margin: 0 }}>
              Story {storyIdx + 1} of {total}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full flex items-center justify-center bg-transparent border-0 cursor-pointer"
            style={{ width: 28, height: 28, color: "#8e8e93" }}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Progress segments */}
        <div className="flex gap-1 px-4 pb-2">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-full overflow-hidden"
              style={{ height: 2.5, background: "#e5e5e5" }}
            >
              <motion.div
                style={{
                  height: "100%",
                  background: "#579F63",
                  borderRadius: 2,
                  width:
                    i < storyIdx
                      ? "100%"
                      : i === storyIdx
                        ? `${progress}%`
                        : "0%",
                }}
                transition={{ ease: "linear" }}
              />
            </div>
          ))}
        </div>

        {/* Story content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={storyIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-4"
            style={{ minHeight: 100 }}
          >
            <p
              style={{
                fontSize: 14,
                color: "#1a1a1a",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {client.stories[storyIdx].text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div className="flex justify-between px-4 pb-4 gap-2">
          <button
            onClick={() => storyIdx > 0 && setStoryIdx((i) => i - 1)}
            disabled={storyIdx === 0}
            style={{
              flex: 1,
              padding: "6px 0",
              fontSize: 12,
              color: storyIdx === 0 ? "#c7c7c7" : "#555",
              background: "none",
              border: "0.5px solid #e0e0e0",
              borderRadius: 8,
              cursor: storyIdx === 0 ? "not-allowed" : "pointer",
              transition: "opacity 0.15s",
            }}
          >
            ← prev
          </button>
          <button
            onClick={() => storyIdx < total - 1 && setStoryIdx((i) => i + 1)}
            disabled={storyIdx === total - 1}
            style={{
              flex: 1,
              padding: "6px 0",
              fontSize: 12,
              color: storyIdx === total - 1 ? "#c7c7c7" : "#555",
              background: "none",
              border: "0.5px solid #e0e0e0",
              borderRadius: 8,
              cursor: storyIdx === total - 1 ? "not-allowed" : "pointer",
              transition: "opacity 0.15s",
            }}
          >
            next →
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Desktop Carousel ─────────────────────────────────────────────────────────

function DesktopCarousel({
  clients,
  onStoryClick,
  onDismiss,
}: {
  clients: Client[];
  onStoryClick: (c: Client) => void;
  onDismiss: (id: number) => void;
}) {
  const [offset, setOffset] = useState(0);
  const x = useMotionValue(0);
  const dragStartX = useRef(0);
  const canPrev = offset > 0;
  const canNext = offset + VISIBLE_DESKTOP < clients.length;
  const itemStride = ITEM_W + ITEM_GAP;

  const slideTo = useCallback(
    (newOffset: number) => {
      setOffset(newOffset);
      animate(x, -newOffset * itemStride, {
        type: "spring",
        stiffness: 220,
        damping: 26,
      });
    },
    [x, itemStride],
  );

  return (
    <div className="flex items-center justify-center py-4">
      <div
        className="relative flex items-center"
        style={{ width: VISIBLE_DESKTOP * itemStride - ITEM_GAP }}
      >
        {/* Prev */}
        <AnimatePresence>
          {canPrev && (
            <motion.button
              key="prev"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              onClick={() => slideTo(Math.max(0, offset - 1))}
              className="absolute z-10 flex items-center justify-center rounded-full bg-white cursor-pointer border-0"
              style={{
                width: 28,
                height: 28,
                left: -14,
                top: "calc(50% - 16px)",
                transform: "translateY(-50%)",
                boxShadow: "0 1px 6px rgba(0,0,0,0.15)",
                border: "0.5px solid #e0e0e0",
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={14} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Track */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex"
            style={{ x, gap: ITEM_GAP }}
            drag="x"
            dragConstraints={{
              left: -(clients.length - VISIBLE_DESKTOP) * itemStride,
              right: 0,
            }}
            dragElastic={0.08}
            onDragStart={(_, info) => {
              dragStartX.current = info.point.x;
            }}
            onDragEnd={(_, info) => {
              const dx = info.offset.x;
              if (dx < -40 && canNext) slideTo(offset + 1);
              else if (dx > 40 && canPrev) slideTo(offset - 1);
              else slideTo(offset);
            }}
          >
            {clients.map((client) => (
              <StoryCircle
                key={client.id}
                client={client}
                onClick={() => onStoryClick(client)}
                onDismiss={onDismiss}
              />
            ))}
          </motion.div>
        </div>

        {/* Next */}
        <AnimatePresence>
          {canNext && (
            <motion.button
              key="next"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              onClick={() =>
                slideTo(Math.min(clients.length - VISIBLE_DESKTOP, offset + 1))
              }
              className="absolute z-10 flex items-center justify-center rounded-full bg-white cursor-pointer border-0"
              style={{
                width: 28,
                height: 28,
                right: -14,
                top: "calc(50% - 16px)",
                transform: "translateY(-50%)",
                boxShadow: "0 1px 6px rgba(0,0,0,0.15)",
                border: "0.5px solid #e0e0e0",
              }}
              aria-label="Next"
            >
              <ChevronRight size={14} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Mobile Carousel ──────────────────────────────────────────────────────────

function MobileCarousel({
  clients,
  onStoryClick,
  onDismiss,
}: {
  clients: Client[];
  onStoryClick: (c: Client) => void;
  onDismiss: (id: number) => void;
}) {
  return (
    <div
      className="flex gap-4 py-4 overflow-x-auto"
      style={{
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      {clients.map((client) => (
        <StoryCircle
          key={client.id}
          client={client}
          onClick={() => onStoryClick(client)}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function StoriesCarousel({
  clients: initialClients,
  onStoryClick,
  onStorySeen,
}: StoriesCarouselProps) {
  const [clients, setClients] = useState(initialClients);
  const [activeClient, setActiveClient] = useState<Client | null>(null);
  const isMobile = useIsMobile();

  const handleStoryClick = (client: Client) => {
    setActiveClient(client);
    onStoryClick?.(client.id);
  };

  const handleSeen = (id: number) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, seen: true } : c)),
    );
    onStorySeen?.(id);
  };

  return (
    <>
      {isMobile ? (
        <MobileCarousel
          clients={clients}
          onStoryClick={handleStoryClick}
          onDismiss={handleSeen}
        />
      ) : (
        <DesktopCarousel
          clients={clients}
          onStoryClick={handleStoryClick}
          onDismiss={handleSeen}
        />
      )}

      <AnimatePresence>
        {activeClient && (
          <StoryViewer
            client={activeClient}
            onClose={() => setActiveClient(null)}
            onSeen={handleSeen}
          />
        )}
      </AnimatePresence>
    </>
  );
}
