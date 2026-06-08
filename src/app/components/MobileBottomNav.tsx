import { motion } from "motion/react";
import { Home, Calendar, Monitor, LayoutGrid, Zap, User } from "lucide-react";

interface MobileBottomNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "events", icon: Calendar, label: "Events" },
  { id: "digital", icon: Monitor, label: "Digital" },
  { id: "exhibition", icon: LayoutGrid, label: "Exhibition" },
  { id: "activation", icon: Zap, label: "Activate" },
  { id: "profile", icon: User, label: "Profile" },
];

export function MobileBottomNav({ activeSection, onNavigate }: MobileBottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center"
      style={{
        height: 64,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 relative"
            style={{ height: "100%", color: isActive ? "#d4456a" : "#8e8e93" }}
          >
            {isActive && (
              <motion.div
                layoutId="mobile-nav-indicator"
                className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
                style={{ width: 20, height: 2, background: "#d4456a" }}
              />
            )}
            <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
