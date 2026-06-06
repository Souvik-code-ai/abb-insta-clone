import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Client } from "../data/mockData";

interface StoryViewerProps {
  clients: Client[];
  activeClientId: number;
  onClose: () => void;
}

export function StoryViewer({ clients, activeClientId, onClose }: StoryViewerProps) {
  const [currentClientId, setCurrentClientId] = useState(activeClientId);
  const [storyIndex, setStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentIndex = clients.findIndex((c) => c.id === currentClientId);
  const currentClient = clients[currentIndex];
  const totalStories = currentClient?.stories.length ?? 0;

  const goNext = useCallback(() => {
    if (storyIndex < totalStories - 1) {
      setStoryIndex((i) => i + 1);
      setProgress(0);
    } else if (currentIndex < clients.length - 1) {
      setCurrentClientId(clients[currentIndex + 1].id);
      setStoryIndex(0);
      setProgress(0);
    } else {
      onClose();
    }
  }, [storyIndex, totalStories, currentIndex, clients, onClose]);

  const goPrev = useCallback(() => {
    if (storyIndex > 0) {
      setStoryIndex((i) => i - 1);
      setProgress(0);
    } else if (currentIndex > 0) {
      setCurrentClientId(clients[currentIndex - 1].id);
      setStoryIndex(0);
      setProgress(0);
    }
  }, [storyIndex, currentIndex, clients]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 2));
    }, 100);
    return () => clearInterval(interval);
  }, [storyIndex, currentClientId]);

  useEffect(() => {
    if (progress >= 100) {
      goNext();
      setProgress(0);
    }
  }, [progress, goNext]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goNext, goPrev]);

  if (!currentClient) return null;

  const prevClients = clients.slice(Math.max(0, currentIndex - 2), currentIndex);
  const nextClients = clients.slice(currentIndex + 1, currentIndex + 3);
  const story = currentClient.stories[storyIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.9)" }}
        onClick={onClose}
      >
        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          {/* Prev adjacent cards */}
          {prevClients.slice(-2).map((client, i) => (
            <AdjacentCard
              key={client.id}
              client={client}
              scale={0.72 + i * 0.08}
              opacity={0.4 + i * 0.15}
              onClick={() => { setCurrentClientId(client.id); setStoryIndex(0); setProgress(0); }}
            />
          ))}

          {/* Main story card */}
          <motion.div
            layoutId={`story-${currentClient.id}`}
            className="relative rounded-2xl overflow-hidden flex flex-col"
            style={{ width: 340, height: 600, background: "#000", flexShrink: 0 }}
          >
            {/* Progress bars */}
            <div className="absolute top-3 left-3 right-3 flex gap-1 z-10">
              {currentClient.stories.map((_, i) => (
                <div key={i} className="flex-1 rounded-full overflow-hidden" style={{ height: 2, background: "rgba(255,255,255,0.35)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      background: "#fff",
                      width: i < storyIndex ? "100%" : i === storyIndex ? `${progress}%` : "0%",
                      transition: i === storyIndex ? "none" : "none",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Header overlay */}
            <div className="absolute top-8 left-3 right-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{ width: 34, height: 34, background: currentClient.bgColor, border: "2px solid #fff" }}
                >
                  <span style={{ color: currentClient.color, fontSize: 11, fontWeight: 700 }}>
                    {currentClient.initials}
                  </span>
                </div>
                <div>
                  <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{currentClient.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>{currentClient.category}</div>
                </div>
              </div>
              <button onClick={onClose} style={{ color: "#fff" }}>
                <X size={20} />
              </button>
            </div>

            {/* Story media */}
            <img
              src={story.url}
              alt={currentClient.name}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 30%, rgba(0,0,0,0.3) 100%)" }}
            />

            {/* Location caption */}
            {story.caption && (
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p style={{ color: "#fff", fontSize: 14, textAlign: "center" }}>{story.caption}</p>
              </div>
            )}
            <div className="absolute bottom-4 left-4 z-10">
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>{currentClient.location}</span>
            </div>

            {/* Tap areas */}
            <div className="absolute inset-0 flex">
              <div className="flex-1 cursor-pointer" onClick={goPrev} />
              <div className="flex-1 cursor-pointer" onClick={goNext} />
            </div>
          </motion.div>

          {/* Next adjacent cards */}
          {nextClients.map((client, i) => (
            <AdjacentCard
              key={client.id}
              client={client}
              scale={0.88 - i * 0.08}
              opacity={0.55 - i * 0.15}
              onClick={() => { setCurrentClientId(client.id); setStoryIndex(0); setProgress(0); }}
            />
          ))}
        </div>

        {/* Side navigation */}
        {currentIndex > 0 && (
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full"
            style={{ width: 40, height: 40, background: "rgba(255,255,255,0.15)", color: "#fff" }}
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {currentIndex < clients.length - 1 && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full"
            style={{ width: 40, height: 40, background: "rgba(255,255,255,0.15)", color: "#fff" }}
            onClick={(e) => { e.stopPropagation(); goNext(); }}
          >
            <ChevronRight size={20} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function AdjacentCard({
  client,
  scale,
  opacity,
  onClick,
}: {
  client: Client;
  scale: number;
  opacity: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: scale + 0.03, opacity: opacity + 0.1 }}
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden cursor-pointer shrink-0"
      style={{
        width: 340 * scale,
        height: 600 * scale,
        opacity,
        background: client.bgColor,
      }}
    >
      <img
        src={client.stories[0]?.url}
        alt={client.name}
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 flex flex-col justify-end p-3"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }}
      >
        <div style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>{client.name}</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 10 }}>{client.category}</div>
      </div>
    </motion.button>
  );
}
