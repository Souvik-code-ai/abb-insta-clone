import { useEffect } from "react";
import {
  ArrowLeft,
  Headphones,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  BarChart2,
  Zap,
} from "lucide-react";

// ── Sub-components ────────────────────────────────────────────────────────────

function BodyText({ children }) {
  return (
    <p className="text-[13px] text-[color:var(--muted-foreground)] leading-[1.75] m-0 mb-2">
      {children}
    </p>
  );
}

function StepCard({ num, icon, title, desc }) {
  return (
    <div className="rounded-xl p-4 flex flex-col gap-2 bg-[color-mix(in_srgb,var(--accent)_4%,var(--background))] border-[0.5px] border-[rgba(87,159,99,0.18)]">
      {/* Step number + icon row */}
      <div className="flex items-center justify-between">
        <span className="text-[28px] font-bold text-[rgba(87,159,99,0.18)] leading-none font-[family-name:var(--font-family-body)]">
          {num}
        </span>
        <div className="flex items-center justify-center rounded-xl w-9 h-9 bg-[rgba(87,159,99,0.12)]">
          <span className="text-[#579F63]">{icon}</span>
        </div>
      </div>
      {/* Title */}
      <div className="text-sm font-semibold text-[color:var(--foreground)]">
        {title}
      </div>
      {/* Description */}
      <div className="text-xs text-[color:var(--muted-foreground)] leading-[1.65]">
        {desc}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function AboutView({ onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col pb-12 px-4 pt-4 w-[100%] min-[1160px]:mx-50 min-[770px]:mx-16 mx-0">
      {/* Back button */}
      <button
        onClick={() => onNavigate("home")}
        className="mt-0 flex items-center gap-2 font-base flex-row justify-start cursor-pointer px-2 text-[#579F63]"
      >
        <ArrowLeft size={16} />
        Return back
      </button>

      {/* Hero */}
      <div className="flex flex-col items-start px-4 pt-8 pb-6">
        <div className="inline-block rounded-full mb-3 bg-[rgba(87,159,99,0.12)] text-[#3d7a4a] text-[11px] font-semibold px-3 py-[3px]">
          About Us
        </div>
        <h1 className="font-[family-name:var(--font-family-body)] text-[color:var(--foreground)] text-[22px] font-bold m-0 mb-3 leading-[1.3]">
          We turn Ideas into{" "}
          <span className="text-[#579F63]">Business Brilliance</span>, where
          ideas meet impact!
        </h1>

        {/* Main description */}
        <div className="rounded-xl p-4 mb-4 w-full bg-[rgba(87,159,99,0.04)] border-[0.5px] border-[rgba(87,159,99,0.2)]">
          <BodyText>
            We blend business potential with human insight to craft
            transformative experiences that inspire your audience. Through
            strategic branding and innovative marketing, we unlock the power of
            your brand, creating breakthrough connections that resonate deeply.
          </BodyText>
          <BodyText>
            Our dedicated team ensures flawless execution, exceeding
            expectations in every detail. From concept to logistics, BTL
            activation to product launches — we bring creativity and precision
            to every aspect, ensuring your vision is not just realized but
            elevated for memorable experiences.
          </BodyText>
        </div>

        {/* Feature pills */}
        <div className="flex flex-row gap-3 flex-wrap">
          <div className="flex items-center gap-2 rounded-xl px-4 py-2 bg-[rgba(87,159,99,0.1)] border-[0.5px] border-[rgba(87,159,99,0.25)]">
            <CheckCircle size={14} className="text-[#579F63]" />
            <span className="text-xs font-semibold text-[#3d7a4a]">
              First Working Process
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-xl px-4 py-2 bg-[rgba(87,159,99,0.1)] border-[0.5px] border-[rgba(87,159,99,0.25)]">
            <Headphones size={14} className="text-[#579F63]" />
            <span className="text-xs font-semibold text-[#3d7a4a]">
              24/7 Live Support
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[0.5px] bg-[color:var(--border)] mx-4 mb-6 mt-0" />

      {/* How it works */}
      <div className="flex flex-col gap-4 px-4">
        <div className="flex flex-col gap-1 mb-2">
          <span className="text-[11px] font-semibold text-[#579F63] uppercase tracking-[0.06em]">
            See How It Works!
          </span>
          <h2 className="text-[17px] font-bold text-[color:var(--foreground)] m-0 font-[family-name:var(--font-family-body)]">
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
          <div className="flex items-center justify-center rounded-full w-7 h-7 bg-[rgba(87,159,99,0.12)]">
            <ArrowRight size={14} className="text-[#579F63] rotate-90" />
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
          <div className="flex items-center justify-center rounded-full w-7 h-7 bg-[rgba(87,159,99,0.12)]">
            <ArrowRight size={14} className="text-[#579F63] rotate-90" />
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
          className="w-full rounded-xl py-3 flex items-center justify-center gap-2 transition-opacity cursor-pointer bg-[linear-gradient(135deg,#579F63_0%,#7CFC58_100%)] text-white text-[13px] font-semibold"
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          View Our Portfolio
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Footer */}
      <footer className="pt-6 pb-2 flex flex-col justify-center items-center">
        <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
          {[
            { title: "Home", link: "home" },
            { title: "About", link: "about" },
            { title: "Profile", link: "profile" },
            { title: "Privacy Policy", link: "privacypolicy" },
            { title: "Data Privacy ", link: "dataprivacy" },
            { title: "Terms & Conditions ", link: "terms" },
          ].map((item) => (
            <a
              key={item.title}
              onClick={() => onNavigate(item.link)}
              className="text-[11px] text-[color:var(--muted-foreground)] no-underline font-[family-name:var(--font-family-body)] transition-colors duration-150"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted-foreground)")
              }
              className="cursor-pointer"
            >
              {item.title}
            </a>
          ))}
        </div>
        <p className="text-[11px] text-[color:var(--muted-foreground)] opacity-60 mt-3 font-[family-name:var(--font-family-body)]">
          © 2026 ABY Baby Events. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
