import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send } from "lucide-react";

interface Comment {
  id: number;
  author: string;
  text: string;
  time: string;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  postTitle: string;
}

export function CommentModal({ isOpen, onClose }: CommentModalProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", message: "" });
      onClose();
    }, 2500);
  };

  const formBody = (
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
            style={{ width: 56, height: 56, background: "rgba(212,69,106,0.1)" }}
          >
            <Send size={22} style={{ color: "#d4456a" }} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "var(--foreground)", fontFamily: "var(--font-family-body)" }}>Message Sent!</div>
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
                height: 42,
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
              height: 90,
              fontFamily: "var(--font-family-body)",
              color: "var(--foreground)",
            }}
          />
          <button
            type="submit"
            className="w-full rounded-xl py-3 flex items-center justify-center gap-2"
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
  );

  const header = (
    <div
      className="flex items-center justify-between px-5 py-4 shrink-0"
      style={{ background: "linear-gradient(135deg, #d4456a 0%, #f07398 100%)" }}
    >
      <div>
        <div style={{ color: "#fff", fontFamily: "var(--font-family-display)", fontSize: 18 }}>Let's Connect</div>
        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontFamily: "var(--font-family-body)" }}>We'll respond within 2 hours</div>
      </div>
      <button onClick={onClose} style={{ color: "rgba(255,255,255,0.8)" }}>
        <X size={18} />
      </button>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80]"
            style={{ background: "rgba(0,0,0,0.5)" }}
            onClick={onClose}
          />

          {isMobile ? (
            /* Mobile: left sidebar panel */
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="fixed top-0 left-0 bottom-0 z-[81] bg-white flex flex-col"
              style={{ width: "100vw" }}
            >
              {header}
              <div className="flex-1 overflow-y-auto px-5 py-5">
                {formBody}
              </div>
            </motion.div>
          ) : (
            /* Desktop: centered backdrop modal */
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 28, stiffness: 380 }}
              className="fixed inset-0 z-[81] flex items-center justify-center pointer-events-none"
            >
              <div
                className="bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
                style={{ width: 360, maxHeight: "90vh", display: "flex", flexDirection: "column" }}
              >
                {header}
                <div className="flex-1 overflow-y-auto px-5 py-5">
                  {formBody}
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
