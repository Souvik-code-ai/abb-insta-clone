import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Client } from "../data/mockData";

interface StoriesCarouselProps {
  clients: Client[];
  onStoryClick: (clientId: number) => void;
}

const VISIBLE = 6;

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

export function StoriesCarousel({ clients, onStoryClick }: StoriesCarouselProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileStoriesCarousel clients={clients} onStoryClick={onStoryClick} />;
  }
  return <DesktopStoriesCarousel clients={clients} onStoryClick={onStoryClick} />;
}

function MobileStoriesCarousel({ clients, onStoryClick }: StoriesCarouselProps) {
  return (
    <div
      className="flex gap-4 py-4 overflow-x-auto"
      style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch", paddingLeft: 16, paddingRight: 16 }}
    >
      {clients.map((client) => (
        <StoryCircle key={client.id} client={client} onClick={() => onStoryClick(client.id)} />
      ))}
    </div>
  );
}

function DesktopStoriesCarousel({ clients, onStoryClick }: StoriesCarouselProps) {
  const [offset, setOffset] = useState(0);
  const canPrev = offset > 0;
  const canNext = offset + VISIBLE < clients.length;
  const visible = clients.slice(offset, offset + VISIBLE);

  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative flex items-center gap-4">
        <AnimatePresence>
          {canPrev && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setOffset((o) => Math.max(0, o - 1))}
              className="absolute z-10 flex items-center justify-center rounded-full bg-white shadow-md border border-border"
              style={{ width: 28, height: 28, top: "calc(50% - 16px)", transform: "translateY(-50%)", left: -10 }}
            >
              <ChevronLeft size={14} />
            </motion.button>
          )}
        </AnimatePresence>

        {visible.map((client) => (
          <StoryCircle key={client.id} client={client} onClick={() => onStoryClick(client.id)} />
        ))}

        <AnimatePresence>
          {canNext && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setOffset((o) => Math.min(clients.length - VISIBLE, o + 1))}
              className="absolute z-10 flex items-center justify-center rounded-full bg-white shadow-md border border-border"
              style={{ width: 28, height: 28, top: "calc(50% - 16px)", transform: "translateY(-50%)", right: -10 }}
            >
              <ChevronRight size={14} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SegmentedRing({ total, seen, size = 66 }: { total: number; seen: boolean; size?: number }) {
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const gap = total > 1 ? 4 : 0;
  const segmentLength = (circumference - total * gap) / total;
  const gradientId = `sg-${total}-${seen ? 1 : 0}`;

  return (
    <svg
      width={size}
      height={size}
      style={{ position: "absolute", top: 0, left: 0 }}
      viewBox={`0 0 ${size} ${size}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="33%" stopColor="#dc2743" />
          <stop offset="66%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      {Array.from({ length: total }).map((_, i) => {
        const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
        const offsetAlong = i * (segmentLength + gap);
        return (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={seen ? "#dbdbdb" : `url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
            strokeDashoffset={circumference / 4 - offsetAlong}
          />
        );
      })}
    </svg>
  );
}

function StoryCircle({ client, onClick }: { client: Client; onClick: () => void }) {
  const total = client.stories?.length ?? 1;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 shrink-0"
      style={{ width: 72 }}
    >
      {/* Ring + avatar */}
      <div className="relative" style={{ width: 66, height: 66 }}>
        <SegmentedRing total={total} seen={client.seen} size={66} />
        {/* White gap ring */}
        <div
          className="absolute rounded-full"
          style={{
            top: 2.5,
            left: 2.5,
            right: 2.5,
            bottom: 2.5,
            border: "2px solid white",
          }}
        />
        {/* Avatar */}
        <div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            top: 5,
            left: 5,
            right: 5,
            bottom: 5,
            background: client.bgColor,
          }}
        >
          <span style={{ color: client.color, fontSize: 15, fontWeight: 700, fontFamily: "var(--font-family-body)" }}>
            {client.initials}
          </span>
        </div>
        {/* Unseen dot */}
        {!client.seen && (
          <div
            className="absolute bottom-0 right-0 rounded-full border-2 border-white"
            style={{ width: 14, height: 14, background: "#d4456a" }}
          />
        )}
      </div>
      {/* Name */}
      <span
        className="truncate w-full text-center"
        style={{
          fontSize: 11,
          fontWeight: client.seen ? 400 : 600,
          color: client.seen ? "#8e8e93" : "#1a1a1a",
          lineHeight: 1.3,
        }}
      >
        {client.name}
      </span>
    </motion.button>
  );
}
