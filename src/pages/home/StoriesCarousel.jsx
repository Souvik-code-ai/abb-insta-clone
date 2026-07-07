import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const VISIBLE_DESKTOP = 6;
const ITEM_W = 72;
const ITEM_GAP = 18;
const STORY_DURATION_MS = 4000;

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
      className="absoute top-0 left-0"
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

function StoryCircle({ client, onClick, onDismiss }) {
  const total = client.stories?.length ?? 1;

  return (
    <div
      className={`flex flex-col items-center gap-1.5 shrink-0 relative w-[${ITEM_W}px]`}
    >
      <motion.div
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={onClick}
        className="flex flex-col items-center gap-1.5 bg-transparent border-0 cursor-pointer p-0 w-full"
        aria-label={`View ${client.name}'s stories`}
      >
        <div className="relative w-16 h-16">
          <SegmentedRing total={total} seen={client.seen} size={64} />
          {/* White gap */}
          <div className="absolute rounded-full inset-[3px] border-[2.5px] border-white" />
          {/* Avatar */}
          <div
            className={`absolute rounded-full flex items-center justify-center overflow-hidden inset-[7px] transition-[filter] duration-200 bg-[${client.bgColor}] ${client.seen ? "filter grayscale-[0.3] opacity-70" : ""}`}
          >
            <img src={client.initials} alt="" />
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
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#8e8e93] border-2 border-white flex items-center justify-center cursor-pointer p-0 z-10"
              >
                <X size={8} color="white" strokeWidth={3} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <span
          className={`truncate w-full text-center text-[11px] leading-[1.3] transition-[color,font-weight] duration-200 ${
            client.seen
              ? "font-normal text-[#8e8e93]"
              : "font-medium text-[#1a1a1a]"
          }`}
        >
          {client.name}
        </span>
      </motion.div>
    </div>
  );
}

function StoryViewer({ client, onClose, onSeen }) {
  const [storyIdx, setStoryIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const total = client.stories.length;

  const startTimer = useCallback(
    (idx) => {
      if (timerRef.current) clearInterval(timerRef.current);
      setProgress(0);
      const step = (50 / STORY_DURATION_MS) * 100;
      timerRef.current = setInterval(() => {
        setProgress((p) => {
          if (p + step >= 100) {
            clearInterval(timerRef.current);
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
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && storyIdx < total - 1)
        setStoryIdx((i) => i + 1);
      if (e.key === "ArrowLeft" && storyIdx > 0) setStoryIdx((i) => i - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [storyIdx, total, onClose]);

  return <></>;
}

// ─── Desktop Carousel ─────────────────────────────────────────────────────────

function DesktopCarousel({ clients, onStoryClick, onDismiss }) {
  const [offset, setOffset] = useState(0);
  const x = useMotionValue(0);
  const dragStartX = useRef(0);
  const canPrev = offset > 0;
  const canNext = offset + VISIBLE_DESKTOP < clients.length;
  const itemStride = ITEM_W + ITEM_GAP;

  const slideTo = useCallback(
    (newOffset) => {
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
        className={`relative flex items-center w-[${VISIBLE_DESKTOP * itemStride - ITEM_GAP}px]`}
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
              className="absolute z-10 flex items-center justify-center rounded-full bg-white cursor-pointer w-7 h-7 -left-[14px] top-[calc(50%-16px)] -translate-y-1/2 shadow-[0_1px_6px_rgba(0,0,0,0.15)] border-[0.5px] border-[#e0e0e0]"
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
              className="absolute z-10 flex items-center justify-center rounded-full bg-white cursor-pointer w-7 h-7 -right-[14px] top-[calc(50%-16px)] -translate-y-1/2 shadow-[0_1px_6px_rgba(0,0,0,0.15)] border-[0.5px] border-[#e0e0e0]"
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

function MobileCarousel({ clients, onStoryClick, onDismiss }) {
  return (
    <div className="flex gap-4 py-4 overflow-x-auto px-4 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
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
}) {
  const [clients, setClients] = useState(initialClients);
  const [activeClient, setActiveClient] = useState(null);
  const isMobile = useIsMobile();

  const handleStoryClick = (client) => {
    setActiveClient(client);
    onStoryClick?.(client.id);
  };

  const handleSeen = (id) => {
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
