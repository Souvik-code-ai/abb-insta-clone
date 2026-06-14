import { useEffect } from "react";
import { ArrowLeft, Headphones, CheckCircle, ArrowRight, MessageSquare, BarChart2, Zap } from "lucide-react";

// ── Sub-components ────────────────────────────────────────────────────────────

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.75, margin: "0 0 8px" }}>
      {children}
    </p>
  );
}

function StepCard({
  num,
  icon,
  title,
  desc,
}: {
  num: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-2"
      style={{
        background: "color-mix(in srgb, var(--accent) 4%, var(--background))",
        border: "0.5px solid rgba(87,159,99,0.18)",
      }}
    >
      {/* Step number + icon row */}
      <div className="flex items-center justify-between">
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "rgba(87,159,99,0.18)",
            lineHeight: 1,
            fontFamily: "var(--font-family-body)",
          }}
        >
          {num}
        </span>
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: 36,
            height: 36,
            background: "rgba(87,159,99,0.12)",
          }}
        >
          <span style={{ color: "#579F63" }}>{icon}</span>
        </div>
      </div>
      {/* Title */}
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}>{title}</div>
      {/* Description */}
      <div style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.65 }}>{desc}</div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function AboutView({ onNavigate }: { onNavigate: (view: string) => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col pb-12 px-4 pt-4 w-[100%] min-[1160px]:mx-50 min-[770px]:mx-16 mx-0">

      {/* Back button */}
      <button
        onClick={() => onNavigate("home")}
        className="mt-0 flex items-center gap-2 font-base flex-row justify-start cursor-pointer px-2"
        style={{ color: "#579F63" }}
      >
        <ArrowLeft size={16} />
        Return back
      </button>

      {/* Hero */}
      <div className="flex flex-col items-start px-4 pt-8 pb-6">
        <div
          className="inline-block rounded-full mb-3"
          style={{
            background: "rgba(87,159,99,0.12)",
            color: "#3d7a4a",
            fontSize: 11,
            fontWeight: 600,
            padding: "3px 12px",
          }}
        >
          About Us
        </div>
        <h1
          style={{
            fontFamily: "var(--font-family-body)",
            color: "var(--foreground)",
            fontSize: 22,
            fontWeight: 700,
            margin: "0 0 12px",
            lineHeight: 1.3,
          }}
        >
          We turn Ideas into{" "}
          <span style={{ color: "#579F63" }}>Business Brilliance</span>,
          where ideas meet impact!
        </h1>

        {/* Main description */}
        <div
          className="rounded-xl p-4 mb-4 w-full"
          style={{
            background: "rgba(87,159,99,0.04)",
            border: "0.5px solid rgba(87,159,99,0.2)",
          }}
        >
          <BodyText>
            We blend business potential with human insight to craft transformative experiences that
            inspire your audience. Through strategic branding and innovative marketing, we unlock the
            power of your brand, creating breakthrough connections that resonate deeply.
          </BodyText>
          <BodyText>
            Our dedicated team ensures flawless execution, exceeding expectations in every detail.
            From concept to logistics, BTL activation to product launches — we bring creativity and
            precision to every aspect, ensuring your vision is not just realized but elevated for
            memorable experiences.
          </BodyText>
        </div>

        {/* Feature pills */}
        <div className="flex flex-row gap-3 flex-wrap">
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-2"
            style={{
              background: "rgba(87,159,99,0.1)",
              border: "0.5px solid rgba(87,159,99,0.25)",
            }}
          >
            <CheckCircle size={14} style={{ color: "#579F63" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#3d7a4a" }}>
              First Working Process
            </span>
          </div>
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-2"
            style={{
              background: "rgba(87,159,99,0.1)",
              border: "0.5px solid rgba(87,159,99,0.25)",
            }}
          >
            <Headphones size={14} style={{ color: "#579F63" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#3d7a4a" }}>
              24/7 Live Support
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "0.5px", background: "var(--border)", margin: "0 16px 24px" }} />

      {/* How it works */}
      <div className="flex flex-col gap-4 px-4">
        <div className="flex flex-col gap-1 mb-2">
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#579F63",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            See How It Works!
          </span>
          <h2
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "var(--foreground)",
              margin: 0,
              fontFamily: "var(--font-family-body)",
            }}
          >
            Easy steps for business growth
          </h2>
        </div>

        {/* Step cards */}
        <StepCard
          num="01"
          icon={<MessageSquare size={18} />}
          title="Discussion"
          desc="Growth is the aim of every business and the prime reason behind every decision that affects the daily workflow of an organization both internally and externally. It is impacted by consumer graphs, opportunities in the market and discussions within company leadership."
        />

        {/* Connector arrow */}
        <div className="flex justify-center">
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 28,
              height: 28,
              background: "rgba(87,159,99,0.12)",
            }}
          >
            <ArrowRight size={14} style={{ color: "#579F63", transform: "rotate(90deg)" }} />
          </div>
        </div>

        <StepCard
          num="02"
          icon={<BarChart2 size={18} />}
          title="Analysis"
          desc="As per requirements we analyze the marketing strategy in accordance with consumer requisites. We identify and structure the solutions that will boost the value of deliverance to its stakeholders."
        />

        {/* Connector arrow */}
        <div className="flex justify-center">
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 28,
              height: 28,
              background: "rgba(87,159,99,0.12)",
            }}
          >
            <ArrowRight size={14} style={{ color: "#579F63", transform: "rotate(90deg)" }} />
          </div>
        </div>

        <StepCard
          num="03"
          icon={<Zap size={18} />}
          title="Implementation"
          desc="We utilize a set of steps to define how a strategic plan is implemented within organizational activities for the achievement of single or multiple plan objectives."
        />
      </div>

      {/* CTA */}
      <div className="px-4 pt-8">
        <button
          onClick={() => onNavigate("profile")}
          className="w-full rounded-xl py-3 flex items-center justify-center gap-2 transition-opacity cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #579F63 0%, #7CFC58 100%)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.opacity = "0.88")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
          }
        >
          View Our Portfolio
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Footer */}
      <footer className="pt-6 pb-2 flex flex-col justify-center items-center">
        <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
          {[
            "Home",
            "About",
            "Presence",
            "Privacy Policy",
            "Data Privacy",
            "Terms & Conditions",
          ].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: 11,
                color: "var(--muted-foreground)",
                textDecoration: "none",
                fontFamily: "var(--font-family-body)",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "var(--muted-foreground)")
              }
            >
              {link}
            </a>
          ))}
        </div>
        <p
          style={{
            fontSize: 11,
            color: "var(--muted-foreground)",
            opacity: 0.6,
            marginTop: 12,
            fontFamily: "var(--font-family-body)",
          }}
        >
          © 2026 ABY Baby Events. All rights reserved.
        </p>
      </footer>
    </div>
  );
}