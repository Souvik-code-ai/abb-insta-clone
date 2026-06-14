import { useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  Cookie,
  BarChart2,
  ExternalLink,
  Smartphone,
  Lock,
  Users,
  UserCog,
  RefreshCw,
  Info,
} from "lucide-react";

// ── Sub-components ────────────────────────────────────────────────────────────

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
    <p
      style={{
        fontSize: 12,
        color: "var(--muted-foreground)",
        lineHeight: 1.7,
        margin: "0 0 8px",
      }}
    >
      {children}
    </p>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function PrivacyPolicyView({ onNavigate }: { onNavigate: (view: string) => void }) {
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
          Legal Document
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
          Privacy Policy
        </h1>
        <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>
          Abybaby Events · How we handle your privacy across our website and applications
        </p>
      </div>

      <div className="flex flex-col gap-6 px-4">

        {/* 1. Introduction */}
        <section>
          <SectionHeader num={1} title="Introduction" />
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(87,159,99,0.04)",
              border: "0.5px solid rgba(87,159,99,0.2)",
            }}
          >
            <BodyText>
              This Privacy Policy explains how Abybaby Events collects, uses, stores, and protects
              user information while providing services through its website and applications.
            </BodyText>
          </div>
        </section>

        {/* 2. Cookies Policy */}
        <section>
          <SectionHeader num={2} title="Cookies Policy" />
          <BodyText>The website uses the following types of cookies:</BodyText>
          <div className="flex flex-wrap gap-2 mb-3">
            {[
              "Strictly Necessary",
              "Analytical / Performance",
              "Functionality",
              "Targeting",
            ].map((c) => (
              <RegPill key={c} label={c} />
            ))}
          </div>
          <ClauseCard label="Cookie Controls">
            Users may disable cookies through browser settings, although some services may not
            function properly as a result.
          </ClauseCard>
        </section>

        {/* 3. Google Analytics */}
        <section>
          <SectionHeader num={3} title="Google Analytics" />
          <InfoCard icon={<BarChart2 size={14} />} label="How we use Google Analytics">
            <BulletList
              items={[
                "Measure website traffic",
                "Analyze user behavior",
                "Improve user experience",
              ]}
            />
          </InfoCard>
          <BodyText>
            Google may process anonymized visitor data according to its own privacy practices.
          </BodyText>
        </section>

        {/* 4. External Links */}
        <section>
          <SectionHeader num={4} title="External Links" />
          <BodyText>
            The website may contain links to third-party websites. Regarding those websites, we:
          </BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "Do not control third-party websites",
                "Are not responsible for their privacy practices",
                "Recommend reviewing their privacy policies before sharing information",
              ]}
            />
          </ClauseCard>
        </section>

        {/* 5. Device Permissions */}
        <section>
          <SectionHeader num={5} title="Device Permissions" />
          <BodyText>The application may request access to:</BodyText>
          <div className="flex flex-wrap gap-2 mb-3">
            {["Location", "Camera", "Device Storage", "SMS", "PDF Viewer"].map((p) => (
              <RegPill key={p} label={p} />
            ))}
          </div>
          <ClauseCard label="Purpose">
            Permissions are used solely to provide the requested functionality and are not shared
            without user consent.
          </ClauseCard>
        </section>

        {/* 6. Confidentiality */}
        <section>
          <SectionHeader num={6} title="Confidentiality" />
          <BodyText>
            All personal information is treated as confidential and disclosed only:
          </BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "With user consent",
                "To authorized service providers",
                "When required by law",
              ]}
            />
          </ClauseCard>
        </section>

        {/* 7. Third-Party Information Collectors */}
        <section>
          <SectionHeader num={7} title="Third-Party Information Collectors" />
          <ClauseCard>
            Third-party advertisers and service providers may collect information under their own
            privacy policies. Users should review those policies independently before engaging with
            such services.
          </ClauseCard>
        </section>

        {/* 8. Profile Access and Modification */}
        <section>
          <SectionHeader num={8} title="Profile Access and Modification" />
          <BodyText>Registered users may:</BodyText>
          <ClauseCard>
            <BulletList
              items={[
                "Review profile information",
                "Update personal details",
                "Request removal of certain information",
              ]}
            />
          </ClauseCard>
          <ClauseCard label="Restrictions">
            Email ID and mobile number may have restrictions on modification. Please contact us for
            assistance with such changes.
          </ClauseCard>
        </section>

        {/* 9. Policy Updates */}
        <section>
          <SectionHeader num={9} title="Policy Updates" />
          <ClauseCard label="Amendments">
            The Privacy Policy may be updated periodically. Continued use of the website after
            updates constitutes acceptance of the revised policy. We recommend reviewing this page
            regularly.
          </ClauseCard>
        </section>

        {/* 10. Contact Information */}
        <section>
          <SectionHeader num={10} title="Contact Information" />
          <BodyText>For any privacy-related queries, please reach out to us:</BodyText>
          <div
            className="rounded-xl p-4"
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
              Get in Touch
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