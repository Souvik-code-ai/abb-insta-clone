import { useState } from "react";
import { Send, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MobileMessagesViewProps {
  onBack: () => void;
}

export function MobileMessagesView({ onBack }: MobileMessagesViewProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 2500);
  };

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 136px)" }}>
      {/* Gradient header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ background: "linear-gradient(135deg, #d4456a 0%, #f07398 100%)" }}
      >
        <button onClick={onBack} style={{ color: "rgba(255,255,255,0.85)" }}>
          <ChevronLeft size={22} />
        </button>
        <div className="flex-1 ml-2">
          <div style={{ color: "#fff", fontFamily: "var(--font-family-display)", fontSize: 18 }}>Let's Connect</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontFamily: "var(--font-family-body)" }}>We'll respond within 2 hours</div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col justify-center px-5 py-0">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-3 py-10"
            >
              <div
                className="rounded-full flex items-center justify-center"
                style={{ width: 64, height: 64, background: "rgba(212,69,106,0.1)" }}
              >
                <Send size={26} style={{ color: "#d4456a" }} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, color: "var(--foreground)", fontFamily: "var(--font-family-body)" }}>Message Sent!</div>
              <div style={{ fontSize: 13, color: "var(--muted-foreground)", textAlign: "center", fontFamily: "var(--font-family-body)" }}>
                Our team will get back to you soon.
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
            >
              {(["name", "email", "phone"] as const).map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                  required={field !== "phone"}
                  className="w-full rounded-xl px-4 outline-none"
                  style={{
                    height: 48,
                    background: "var(--muted)",
                    fontSize: 14,
                    border: "none",
                    fontFamily: "var(--font-family-body)",
                    color: "var(--foreground)",
                  }}
                />
              ))}
              <textarea
                placeholder="Your message..."
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                required
                className="w-full rounded-xl px-4 py-3 outline-none resize-none"
                style={{
                  background: "var(--muted)",
                  fontSize: 14,
                  border: "none",
                  height: 110,
                  fontFamily: "var(--font-family-body)",
                  color: "var(--foreground)",
                }}
              />
              <button
                type="submit"
                className="w-full rounded-xl py-3 flex items-center justify-center gap-2 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, #d4456a 0%, #f07398 100%)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 15,
                  fontFamily: "var(--font-family-body)",
                }}
              >
                <Send size={16} />
                Send Message
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
