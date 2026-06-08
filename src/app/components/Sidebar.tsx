import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Calendar,
  Monitor,
  LayoutGrid,
  Zap,
  Globe,
  MessageSquare,
  User,
  MoreHorizontal,
} from "lucide-react";
import logo from "../../assets/logo.jpg";
interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onMoreClick: () => void;
}

const allNavItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "events", icon: Calendar, label: "Events" },
  { id: "digital", icon: Monitor, label: "Digital" },
  { id: "exhibition", icon: LayoutGrid, label: "Exhibition" },
  { id: "activation", icon: Zap, label: "Activation" },
  { id: "presence", icon: Globe, label: "Presence" },
  { id: "messages", icon: MessageSquare, label: "Messages" },
  { id: "profile", icon: User, label: "Profile" },
];

export function Sidebar({
  activeSection,
  onNavigate,
  onMoreClick,
}: SidebarProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.aside
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      animate={{ width: expanded ? 260 : 72 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed left-0 top-0 bottom-0 z-50 flex flex-col bg-white overflow-hidden"
      style={{}}
    >
      <nav className="flex flex-col py-3 px-3 flex-1">
        {/* Logo row */}
        <button
          onClick={() => onNavigate("home")}
          className="relative flex items-center rounded-xl transition-all duration-150 shrink-0"
          style={{ height: 44, padding: "0 10px" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "rgba(0,0,0,0.04)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "transparent")
          }
        >
          <div
            className="shrink-0 rounded-xl flex items-center justify-center cursor-pointer "
            style={{
              background:
                "linear-gradient(135deg, var(--accent) 0%, #f9a8c9 100%)",
            }}
          >
            <img
              src={logo}
              alt=""
              className="overflow-hidden rounded-lg h-12 w-12 border-r border-b border-black"
            />
          </div>
        </button>

        {/* 8 nav items — centered vertically with flex-1 above and below */}
        <div className="flex-1" />
        <div className="flex flex-col gap-1">
          {allNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const isProfile = item.id === "profile";

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative flex items-center rounded-xl transition-all duration-150 shrink-0"
                style={{
                  height: 44,
                  padding: "0 10px",
                  background: isActive
                    ? "color-mix(in srgb, var(--accent) 8%, transparent)"
                    : "transparent",
                  color: isActive ? "var(--accent)" : "var(--foreground)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                }}
              >
                <div
                  className="shrink-0 flex items-center justify-center"
                  style={{ width: 28, height: 28 }}
                >
                  {isProfile ? (
                    /* Profile shows avatar circle instead of plain icon */
                    <div
                      className="rounded-full flex items-center justify-center"
                      style={{
                        width: 26,
                        height: 26,
                        background: isActive
                          ? "linear-gradient(135deg, var(--accent) 0%, #f9a8c9 100%)"
                          : "var(--muted)",
                        fontSize: 10,
                        fontWeight: 700,
                        color: isActive ? "#fff" : "var(--muted-foreground)",
                        fontFamily: "var(--font-family-body)",
                      }}
                    >
                      <img src={logo} alt="" />
                    </div>
                  ) : (
                    <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
                  )}
                </div>
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.15 }}
                      className="ml-3 whitespace-nowrap overflow-hidden"
                      style={{
                        fontSize: 15,
                        fontWeight: isActive ? 600 : 400,
                        fontFamily: "var(--font-family-body)",
                      }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
        <div className="flex-1" />

        {/* More — pinned to bottom */}
        <button
          onClick={onMoreClick}
          className="relative flex items-center rounded-xl transition-all duration-150 shrink-0"
          style={{ height: 44, padding: "0 10px", color: "var(--foreground)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "rgba(0,0,0,0.04)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "transparent")
          }
        >
          <div
            className="shrink-0 flex items-center justify-center"
            style={{ width: 28, height: 28 }}
          >
            <MoreHorizontal size={22} strokeWidth={1.8} />
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.15 }}
                className="ml-3 whitespace-nowrap overflow-hidden"
                style={{ fontSize: 15, fontFamily: "var(--font-family-body)" }}
              >
                More
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>
    </motion.aside>
  );
}
