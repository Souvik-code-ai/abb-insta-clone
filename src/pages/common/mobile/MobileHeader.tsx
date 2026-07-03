import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoreModal } from "./MoreModal";
import { Info, BookOpen, Shield, FileText, Lock, Award } from "lucide-react";
import {
  MessageCircle,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  MoreHorizontal,
} from "lucide-react";
import logo from "../../../assets/images/logo.jpg";
interface MobileHeaderProps {
  onMessageClick: () => void;
  onLogoClick: () => void;
  onNavigate: (view: string) => void;
}
const sidebarItems: {
  icon: React.ElementType;
  label: string;
  desc: string;
  view: string;
}[] = [
  {
    icon: Info,
    label: "About Us",
    desc: "Our story and mission",
    view: "about",
  },
  {
    icon: BookOpen,
    label: "Case Studies",
    desc: "Premium event portfolios",
    view: "casestudies",
  },
  {
    icon: Award,
    label: "Awards and Recognitions",
    desc: "Our achievements",
    view: "awards",
  },
  {
    icon: Shield,
    label: "Privacy Policy",
    desc: "How we protect your data",
    view: "privacypolicy",
  },
  {
    icon: FileText,
    label: "Terms & Conditions",
    desc: "Usage guidelines",
    view: "terms",
  },
  {
    icon: Lock,
    label: "Data Privacy",
    desc: "GDPR & data rights",
    view: "dataprivacy",
  },
];
import { X } from "lucide-react";
export function MobileHeader({
  onMessageClick,
  onLogoClick,
  onNavigate,
}: MobileHeaderProps) {
  const [socialOpen, setSocialOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const socials = [
    {
      icon: Facebook,
      label: "Facebook",
      color: "#1877F2",
      url: "https://facebook.com/abybabyevents",
    },
    {
      icon: Instagram,
      label: "Instagram",
      color: "#E1306C",
      url: "https://instagram.com/abybabyevents",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      color: "#0A66C2",
      url: "https://linkedin.com/company/abybabyevents",
    },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 bg-white"
        style={{
          height: 56,

          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => setDrawerOpen(true)}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
          className="flex items-center gap-2"
        >
          <div
            className="rounded-sm flex items-center justify-center overflow-hidden"
            style={{
              width: 40,
              height: 40,
              background: "linear-gradient(135deg, #d4456a 0%, #f9a8c9 100%)",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              className="overflow-hidden rounded-lg h-12 w-12"
            />
          </div>
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-2 relative">
          <div className="relative">
            <button
              onClick={() => setSocialOpen((o) => !o)}
              className="rounded-full flex items-center gap-1 px-3"
              style={{
                height: 36,
                background: "rgba(0,0,0,0.05)",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              Social
              <ChevronDown
                size={14}
                style={{
                  transform: socialOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                }}
              />
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
                      onMouseEnter={(e) =>
                        ((
                          e.currentTarget as HTMLAnchorElement
                        ).style.background = "#fafafa")
                      }
                      onMouseLeave={(e) =>
                        ((
                          e.currentTarget as HTMLAnchorElement
                        ).style.background = "transparent")
                      }
                    >
                      <div
                        className="rounded-lg flex items-center justify-center"
                        style={{ width: 28, height: 28, background: color }}
                      >
                        <Icon size={14} style={{ color: "#fff" }} />
                      </div>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: "#1a1a1a",
                        }}
                      >
                        {label}
                      </span>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* <button
            onClick={() => setMoreOpen((o) => !o)}
            className="rounded-full flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              background: "rgba(212,69,106,0.08)",
            }}
          ></button> */}
        </div>
      </header>
      <button
        onClick={onMessageClick}
        className="fixed flex items-center justify-center rounded-xl bottom-18 right-3"
        style={{
          width: 36,
          height: 36,
          background: "linear-gradient(135deg, #579F63 0%, #7CFC58 100%)",
          boxShadow: "0 4px 16px rgba(44,112,72,0.35)",
          zIndex: 60,
          border: "none",
          cursor: "pointer",
        }}
      >
        <MessageCircle size={18} style={{ color: "#fff" }} />
      </button>
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[70]"
              style={{ background: "rgba(0,0,0,0.35)" }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Sidebar panel sliding in from left */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 380 }}
              className="fixed top-0 left-0 bottom-0 z-[71] bg-white flex flex-col"
              style={{ width: 280, boxShadow: "4px 0 24px rgba(0,0,0,0.12)" }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-4"
                style={{
                  height: 64,
                  borderBottom: "1px solid rgba(0,0,0,0.07)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="rounded-sm flex items-center justify-center overflow-hidden"
                    style={{
                      width: 36,
                      height: 36,
                      background:
                        "linear-gradient(135deg, #d4456a 0%, #f9a8c9 100%)",
                    }}
                  >
                    <img
                      src={logo}
                      alt=""
                      className="rounded-lg h-10 w-10 overflow-hidden"
                    />
                  </div>
                  <span
                    style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a" }}
                  >
                    Menu
                  </span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 32,
                    height: 32,
                    background: "rgba(0,0,0,0.05)",
                  }}
                >
                  <X size={16} style={{ color: "#444" }} />
                </button>
              </div>

              {/* Drawer items */}
              <nav className="flex-1 overflow-y-auto py-2">
                {sidebarItems.map(({ icon: Icon, label, desc, view }) => (
                  <button
                    key={view}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                    onClick={() => {
                      setDrawerOpen(false);
                      onNavigate(view);
                    }}
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
                        width: 40,
                        height: 40,
                        background: "rgba(212,69,106,0.08)",
                      }}
                    >
                      <Icon size={18} style={{ color: "#2C7048" }} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: "#1a1a1a",
                        }}
                      >
                        {label}
                      </div>
                      <div style={{ fontSize: 12, color: "#8e8e93" }}>
                        {desc}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
