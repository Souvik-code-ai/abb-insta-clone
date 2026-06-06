import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, ChevronDown, Facebook, Instagram, Linkedin } from "lucide-react";

interface MobileHeaderProps {
  onMessageClick: () => void;
  onLogoClick: () => void;
}

export function MobileHeader({ onMessageClick, onLogoClick }: MobileHeaderProps) {
  const [socialOpen, setSocialOpen] = useState(false);

  const socials = [
    { icon: Facebook, label: "Facebook", color: "#1877F2", url: "https://facebook.com/abybabyevents" },
    { icon: Instagram, label: "Instagram", color: "#E1306C", url: "https://instagram.com/abybabyevents" },
    { icon: Linkedin, label: "LinkedIn", color: "#0A66C2", url: "https://linkedin.com/company/abybabyevents" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
      style={{
        height: 56,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {/* Logo */}
      <button onClick={onLogoClick} className="flex items-center gap-2" style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
        <div
          className="rounded-xl flex items-center justify-center"
          style={{
            width: 34, height: 34,
            background: "linear-gradient(135deg, #d4456a 0%, #f9a8c9 100%)",
          }}
        >
          <span style={{ color: "#fff", fontFamily: "var(--font-family-display)", fontSize: 14 }}>A</span>
        </div>
      </button>

      {/* Right actions */}
      <div className="flex items-center gap-2 relative">
        <button
          onClick={onMessageClick}
          className="rounded-full flex items-center justify-center"
          style={{ width: 36, height: 36, background: "rgba(212,69,106,0.08)" }}
        >
          <MessageCircle size={18} style={{ color: "#d4456a" }} />
        </button>

        <div className="relative">
          <button
            onClick={() => setSocialOpen((o) => !o)}
            className="rounded-full flex items-center gap-1 px-3"
            style={{ height: 36, background: "rgba(0,0,0,0.05)", fontSize: 13, fontWeight: 500 }}
          >
            Social
            <ChevronDown size={14} style={{ transform: socialOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>

          <AnimatePresence>
            {socialOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl overflow-hidden"
                style={{ width: 180, border: "1px solid rgba(0,0,0,0.08)" }}
              >
                {socials.map(({ icon: Icon, label, color, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 transition-colors"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#fafafa")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "transparent")}
                  >
                    <div
                      className="rounded-lg flex items-center justify-center"
                      style={{ width: 28, height: 28, background: color }}
                    >
                      <Icon size={14} style={{ color: "#fff" }} />
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}>{label}</span>
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
