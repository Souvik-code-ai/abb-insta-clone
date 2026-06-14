import { useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  User,
  Monitor,
  Target,
  Database,
  Share2,
  Clock,
  ShieldCheck,
  UserCheck,
  Download,
} from "lucide-react";

// ── Sub-components (same as TermsView) ───────────────────────────────────────

function SectionHeader({ num, title }: { num: number; title: string }) {
  return (
    <div
      className="flex items-center gap-2 mb-3 pb-2"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div
        className="flex items-center justify-center rounded-full shrink-0"
        style={{
          width: 22,
          height: 22,
          background: "rgba(87,159,99,0.15)",
          color: "#3d7a4a",
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        {num}
      </div>
      <span style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}>
        {title}
      </span>
    </div>
  );
}

function ClauseCard({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-3 mb-2 last:mb-0"
      style={{ background: "color-mix(in srgb, var(--accent) 4%, var(--background))" }}
    >
      {label && (
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#579F63",
            marginBottom: 4,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {label}
        </div>
      )}
      <div style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.65 }}>
        {children}
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl p-3 mb-2 last:mb-0"
      style={{
        background: "rgba(87,159,99,0.05)",
        border: "0.5px solid rgba(87,159,99,0.25)",
      }}
    >
      <div
        className="flex items-center gap-2 mb-1"
        style={{ fontSize: 12, fontWeight: 600, color: "var(--foreground)" }}
      >
        <span style={{ color: "#579F63" }}>{icon}</span>
        {label}
      </div>
      <div style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.65 }}>
        {children}
      </div>
    </div>
  );
}

function RegPill({ label }: { label: string }) {
  return (
    <span
      className="rounded-full"
      style={{
        background: "rgba(87,159,99,0.1)",
        color: "#3d7a4a",
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 10px",
      }}
    >
      {label}
    </span>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => (
        <span key={item}>• {item}</span>
      ))}
    </div>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.7, margin: "0 0 8px" }}>
      {children}
    </p>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function DataPrivacyView({ onNavigate }: { onNavigate: (view: string) => void }) {
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
      <div
        className="py-6 px-4"
        style={{ borderBottom: "1px solid var(--border)", marginBottom: "1.5rem" }}
      >
        <div
          className="inline-block rounded-full mb-2"
          style={{
            background: "rgba(87,159,99,0.12)",
            color: "#3d7a4a",
            fontSize: 11,
            fontWeight: 600,
            padding: "3px 12px",
          }}
        >
          GDPR & Data Rights
        </div>
        <h1
          style={{
            fontFamily: "var(--font-family-body)",
            color: "var(--foreground)",
            fontSize: 22,
            fontWeight: 600,
            margin: "0 0 4px",
          }}
        >
          Data Privacy
        </h1>
        <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>
          How we collect, use, store, and protect your personal data
        </p>
      </div>

      <div className="flex flex-col gap-6 px-4">

        {/* 1. Information We Collect */}
        <section>
          <SectionHeader num={1} title="Information We Collect" />
          <InfoCard icon={<User size={14} />} label="Personal Information">
            <div className="flex flex-wrap gap-2 mt-1">
              {["Name", "Phone Number", "Email Address", "Date of Birth", "Gender", "City", "Geo-location", "Photograph"].map(
                (f) => <RegPill key={f} label={f} />
              )}
            </div>
          </InfoCard>
          <InfoCard icon={<Monitor size={14} />} label="Technical Information">
            <div className="flex flex-wrap gap-2 mt-1">
              {["IP Address", "Device ID", "Browser Information", "Referring & Exit URLs", "Website Interaction Data"].map(
                (f) => <RegPill key={f} label={f} />
              )}
            </div>
          </InfoCard>
        </section>

        {/* 2. Purpose of Data Collection */}
        <section>
          <SectionHeader num={2} title="Purpose of Data Collection" />
          <BodyText>We collect data to:</BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "Provide requested services",
                "Personalize user experience",
                "Deliver customer support",
                "Communicate service-related updates",
                "Improve website functionality",
                "Comply with legal obligations",
                "Send promotional offers (with consent)",
              ]}
            />
          </ClauseCard>
        </section>

        {/* 3. How Information is Collected */}
        <section>
          <SectionHeader num={3} title="How Information is Collected" />
          <ClauseCard>
            <BulletList
              items={[
                "Registration forms",
                "User interactions on the website",
                "Cookies and tracking technologies",
                "Analytics tools",
                "Device permissions",
              ]}
            />
          </ClauseCard>
        </section>

        {/* 4. Use of Personal Information */}
        <section>
          <SectionHeader num={4} title="Use of Personal Information" />
          <BodyText>User data may be used for:</BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "Service delivery",
                "Record maintenance",
                "Service improvement",
                "Legal and regulatory compliance",
                "User authentication",
                "Personalized content and advertising",
              ]}
            />
          </ClauseCard>
        </section>

        {/* 5. Data Sharing and Disclosure */}
        <section>
          <SectionHeader num={5} title="Data Sharing and Disclosure" />
          <BodyText>Information may be shared with:</BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "Authorized third-party service providers",
                "Business partners necessary for service fulfillment",
                "Government authorities when legally required",
                "Law enforcement agencies in compliance with applicable laws",
              ]}
            />
          </ClauseCard>
          <div
            className="rounded-xl p-3 mt-2"
            style={{
              background: "rgba(87,159,99,0.07)",
              border: "0.5px solid rgba(87,159,99,0.3)",
              fontSize: 12,
              fontWeight: 600,
              color: "#3d7a4a",
            }}
          >
            ✓ We do not sell or rent personal information.
          </div>
        </section>

        {/* 6. Data Retention */}
        <section>
          <SectionHeader num={6} title="Data Retention" />
          <ClauseCard label="Retention Period">
            Personal information is retained only as long as necessary for the stated purposes.
          </ClauseCard>
          <ClauseCard label="Deletion">
            Information may be deleted upon withdrawal of consent, subject to applicable legal
            requirements.
          </ClauseCard>
        </section>

        {/* 7. User Rights */}
        <section>
          <SectionHeader num={7} title="User Rights" />
          <BodyText>Users have the right to:</BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "Access their personal data",
                "Request corrections",
                "Withdraw consent",
                "Object to data processing",
                "Request deletion of data",
                "Lodge complaints with supervisory authorities",
              ]}
            />
          </ClauseCard>
        </section>

        {/* 8. Data Security */}
        <section>
          <SectionHeader num={8} title="Data Security" />
          <BodyText>
            We implement industry-standard security measures to protect personal information against:
          </BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "Unauthorized access",
                "Data loss",
                "Misuse",
                "Disclosure",
              ]}
            />
          </ClauseCard>
          <BodyText>
            However, no internet-based system can guarantee absolute security.
          </BodyText>
        </section>

        {/* 9. Consent Withdrawal, Data Download & Removal */}
        <section>
          <SectionHeader num={9} title="Consent Withdrawal, Data Download & Removal" />
          <BodyText>Users may request:</BodyText>
          <ClauseCard>
            <BulletList items={["Consent withdrawal", "Data download", "Data deletion"]} />
          </ClauseCard>

          {/* Contact card */}
          <div
            className="rounded-xl p-4 mt-2"
            style={{
              background: "rgba(87,159,99,0.06)",
              border: "0.5px solid rgba(87,159,99,0.3)",
            }}
          >
            <div
              className="flex items-center gap-2 mb-3"
              style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}
            >
              <Mail size={14} style={{ color: "#579F63" }} />
              Contact Us to Exercise Your Rights
            </div>
            <div className="flex flex-col gap-2">
              <div
                className="flex items-center gap-2"
                style={{ fontSize: 12, color: "var(--muted-foreground)" }}
              >
                <Mail size={13} style={{ color: "#579F63", flexShrink: 0 }} />
                <a
                  href="mailto:sucheta@abybaby.co.in"
                  style={{ color: "#579F63", textDecoration: "none" }}
                >
                  sucheta@abybaby.co.in
                </a>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ fontSize: 12, color: "var(--muted-foreground)" }}
              >
                <Mail size={13} style={{ color: "#579F63", flexShrink: 0 }} />
                <a
                  href="mailto:shaw.vijay@abybaby.co.in"
                  style={{ color: "#579F63", textDecoration: "none" }}
                >
                  shaw.vijay@abybaby.co.in
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="pt-6 pb-2 flex flex-col justify-center items-center">
        <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
          {["Home", "About", "Presence", "Privacy Policy", "Data Privacy", "Terms & Conditions"].map(
            (link) => (
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
            )
          )}
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