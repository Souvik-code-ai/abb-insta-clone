import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Facebook, Instagram, Linkedin, ChevronUp } from "lucide-react";

interface ChatbotWidgetProps {
  triggerOpen?: boolean;
  onTriggered?: () => void;
}

export function ChatbotWidget({ triggerOpen, onTriggered }: ChatbotWidgetProps = {}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (triggerOpen) {
      setOpen(true);
      onTriggered?.();
    }
  }, [triggerOpen]);
  const [socialOpen, setSocialOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setOpen(false); setForm({ name: "", email: "", phone: "", message: "" }); }, 2500);
  };

  const socials = [
    { icon: Facebook, label: "Facebook", color: "#1877F2", url: "https://facebook.com/abybabyevents" },
    { icon: Instagram, label: "Instagram", color: "#E1306C", url: "https://instagram.com/abybabyevents" },
    { icon: Linkedin, label: "LinkedIn", color: "#0A66C2", url: "https://linkedin.com/company/abybabyevents" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end gap-2">
      {/* Contact modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 380 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ width: 320, border: "1px solid rgba(0,0,0,0.08)" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ background: "linear-gradient(135deg, #d4456a 0%, #f07398 100%)" }}
            >
              <div>
                <div style={{ color: "#fff", fontFamily: "var(--font-family-display)", fontSize: 18 }}>Let's Connect</div>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>We'll respond within 2 hours</div>
              </div>
              <button onClick={() => setOpen(false)} style={{ color: "rgba(255,255,255,0.8)" }}>
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 px-6">
                <div
                  className="rounded-full flex items-center justify-center mb-3"
                  style={{ width: 56, height: 56, background: "rgba(212,69,106,0.1)" }}
                >
                  <Send size={22} style={{ color: "#d4456a" }} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#1a1a1a", marginBottom: 6 }}>Message Sent!</div>
                <div style={{ fontSize: 13, color: "#8e8e93", textAlign: "center" }}>Our team will get back to you soon.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-5 py-4 flex flex-col gap-3">
                {(["name", "email", "phone"] as const).map((field) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={form[field]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    required={field !== "phone"}
                    className="w-full rounded-xl px-4 outline-none"
                    style={{ height: 42, background: "#f5f5f7", fontSize: 14, border: "none" }}
                  />
                ))}
                <textarea
                  placeholder="Your message..."
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  required
                  className="w-full rounded-xl px-4 py-3 outline-none resize-none"
                  style={{ background: "#f5f5f7", fontSize: 14, border: "none", height: 90 }}
                />
                <button
                  type="submit"
                  className="w-full rounded-xl py-3 flex items-center justify-center gap-2 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #d4456a 0%, #f07398 100%)", color: "#fff", fontWeight: 600, fontSize: 15 }}
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social dropdown */}
      <AnimatePresence>
        {socialOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-2"
          >
            {socials.map(({ icon: Icon, label, color, url }) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-end gap-2"
              >
                <span
                  className="px-3 py-1 rounded-full"
                  style={{ background: "#fff", fontSize: 12, fontWeight: 500, boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
                >
                  {label}
                </span>
                <div
                  className="rounded-full flex items-center justify-center shrink-0"
                  style={{ width: 40, height: 40, background: color, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                >
                  <Icon size={18} style={{ color: "#fff" }} />
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget buttons */}
      <div className="flex items-center gap-2">
        {/* Social toggle */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setSocialOpen((o) => !o)}
          className="rounded-full flex items-center justify-center shadow-lg"
          style={{
            width: 48, height: 48,
            background: socialOpen ? "#1a1a1a" : "#fff",
            color: socialOpen ? "#fff" : "#1a1a1a",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <ChevronUp size={18} style={{ transform: socialOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
        </motion.button>

        {/* Message button */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setOpen((o) => !o)}
          className="rounded-full flex items-center justify-center shadow-xl"
          style={{
            width: 56, height: 56,
            background: open
              ? "#1a1a1a"
              : "linear-gradient(135deg, #d4456a 0%, #f07398 100%)",
          }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }} transition={{ duration: 0.15 }}>
                <X size={22} style={{ color: "#fff" }} />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }} transition={{ duration: 0.15 }}>
                <MessageCircle size={22} style={{ color: "#fff" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
