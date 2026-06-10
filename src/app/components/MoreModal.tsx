import { motion, AnimatePresence } from "motion/react";
import { Info, BookOpen, Shield, FileText, Lock, X } from "lucide-react";

interface MoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const items = [
  { icon: Info, label: "About Us", desc: "Our story and mission" },
  { icon: BookOpen, label: "Case Studies", desc: "Premium event portfolios" },
  { icon: Shield, label: "Privacy Policy", desc: "How we protect your data" },
  { icon: FileText, label: "Terms & Conditions", desc: "Usage guidelines" },
  { icon: Lock, label: "Data Privacy", desc: "GDPR & data rights" },
];

export function MoreModal({ isOpen, onClose }: MoreModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.01 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="fixed z-[61] bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{
              bottom: 80,
              left: 16,
              width: 260,
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "var(--font-family-body)",
                }}
              >
                More Options
              </span>
              <button onClick={onClose}>
                <X size={16} />
              </button>
            </div>
            {items.map(({ icon: Icon, label, desc }) => (
              <button
                key={label}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "#fafafa")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "transparent")
                }
              >
                <div
                  className="rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: "rgba(212,69,106,0.08)",
                  }}
                >
                  <Icon size={16} style={{ color: "#2C7048" }} />
                </div>
                <div>
                  <div
                    style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}
                  >
                    {label}
                  </div>
                  <div style={{ fontSize: 12, color: "#8e8e93" }}>{desc}</div>
                </div>
              </button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
