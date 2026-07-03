// Add these imports at the top alongside existing ones
import { useState, useEffect, useRef, useCallback } from "react";
import { Toaster } from "sonner";
import { Sidebar } from "./pages/common/Sidebar";
import { StoriesCarousel } from "./pages/home/StoriesCarousel";
import { StoryViewer } from "./pages/home/StoryViewer";
import { FeedCard } from "./pages/home/FeedCard";
import { RightPanel } from "./pages/home/RightPanel";
import { ChatbotWidget } from "./pages/common/ChatbotWidget";
import { MoreModal } from "./pages/more/MoreModal";
import { MobileHeader } from "./pages/common/mobile/MobileHeader";
import { MobileBottomNav } from "./pages/common/mobile/MobileBottomNav";
import { MobileMessagesView } from "./pages/common/mobile/MobileMessagesView";
import { ProfileView } from "./pages/profile/ProfileView";
import { EventsSection } from "./pages/events/Eventssection";

import logo from "./assets/images/logo.jpg";
import { DataPrivacyView } from "./pages/more/DataPrivacyView";
import { CaseStudiesView } from "./pages/more/CaseStudiesView";
import {
  clients,
  feedPosts,
  upcomingEvents,
  caseStudies,
  awards,
} from "../public/home/home";
import { AwardsView } from "./pages/more/AwardsView";
import { PrivacyPolicyView } from "./pages/more/PrivacyPolicyView";
import { TermsView } from "./pages/more/TermsPAGE";
import { DigitalSection } from "./pages/digital/DigitalSection";
import { ExhibitionSection } from "./pages/exhibitions/ExhibitonSection";
import { ActivationSection } from "./pages/activations/ActivationSection";
import PageLoader from "./app/components/ui/Pageloader";
import { ArrowRight } from "lucide-react";
import { PresenceSection } from "./pages/presence/PresenseSection";
import { AboutView } from "./pages/more/AboutView";
// ── Feed with infinite scroll ─────────────────────────────────────────────────

const FEED_PAGE_SIZE = 3; // how many posts to load per batch

function FeedWithInfiniteScroll({
  onNavigate,
  logo,
}: {
  onNavigate: (s: string) => void;
  logo: string;
}) {
  const [visibleCount, setVisibleCount] = useState(FEED_PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const visiblePosts = feedPosts.slice(0, visibleCount);
  const hasMore = visibleCount < feedPosts.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + FEED_PAGE_SIZE, feedPosts.length),
      );
      setIsLoading(false);
    }, 600);
  }, [isLoading, hasMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "300px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="flex flex-col gap-4 px-4 pt-4">
      {visiblePosts.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}

      {/* ── Sentinel + spinner ── */}
      {hasMore && (
        <div
          ref={sentinelRef}
          className="flex flex-col items-center py-6 gap-2"
        >
          {isLoading && (
            <>
              {/* Skeleton cards while loading */}
              {Array.from({ length: FEED_PAGE_SIZE }).map((_, i) => (
                <div
                  key={i}
                  className="w-full rounded-2xl overflow-hidden bg-white"
                  style={{ border: "1px solid #f0f0f5" }}
                >
                  {/* Header skeleton */}
                  <div className="flex items-center gap-3 p-3">
                    <div
                      className="rounded-full shrink-0"
                      style={{
                        width: 42,
                        height: 42,
                        background: "#f0f0f5",
                        animation: "pulse 1.4s ease-in-out infinite",
                      }}
                    />
                    <div className="flex flex-col gap-2 flex-1">
                      <div
                        style={{
                          height: 12,
                          width: "40%",
                          borderRadius: 6,
                          background: "#f0f0f5",
                          animation: "pulse 1.4s ease-in-out infinite",
                        }}
                      />
                      <div
                        style={{
                          height: 10,
                          width: "25%",
                          borderRadius: 6,
                          background: "#f5f5f7",
                          animation: "pulse 1.4s ease-in-out infinite 0.2s",
                        }}
                      />
                    </div>
                  </div>
                  {/* Image skeleton */}
                  <div
                    style={{
                      aspectRatio: "1/1",
                      background: "#f5f5f7",
                      animation: "pulse 1.4s ease-in-out infinite 0.1s",
                    }}
                  />
                  {/* Caption skeleton */}
                  <div className="p-3 flex flex-col gap-2">
                    <div
                      style={{
                        height: 11,
                        width: "80%",
                        borderRadius: 6,
                        background: "#f0f0f5",
                        animation: "pulse 1.4s ease-in-out infinite",
                      }}
                    />
                    <div
                      style={{
                        height: 11,
                        width: "55%",
                        borderRadius: 6,
                        background: "#f5f5f7",
                        animation: "pulse 1.4s ease-in-out infinite 0.15s",
                      }}
                    />
                  </div>
                </div>
              ))}
              <style>{`
                @keyframes pulse {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.45; }
                }
              `}</style>
            </>
          )}
        </div>
      )}

      {/* ── End-of-feed footer ── */}
      {!hasMore && (
        <div className="flex flex-col items-center py-8 gap-2">
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: 48,
              height: 48,
              background: "linear-gradient(135deg, #d4456a 0%, #f9a8c9 100%)",
            }}
          >
            <img src={logo} alt="" />
          </div>
          <p style={{ fontSize: 13, color: "#8e8e93", textAlign: "center" }}>
            You've seen all feeds.
          </p>
          <button
            onClick={() => onNavigate("events")}
            className="mt-0 flex items-center gap-2 font-base flex-row justify-center cursor-pointer"
            style={{ color: "#579F63" }}
          >
            Explore More
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [moreModalOpen, setMoreModalOpen] = useState(false);
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 770);
      setIsTablet(window.innerWidth < 1160);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const handleNavigate = (section: string) => {
    if (section === "presence") {
      setOpen(true);
      setActiveSection("presence");
      return;
    }

    setOpen(false);

    if (section === activeSection) return;

    setLoading(true);
    console.log("loading started");
    window.scrollTo({ top: 0, behavior: "auto" });

    setTimeout(() => {
      setActiveSection(section);
      setLoading(false);
      console.log("loading ended");
    }, 500);
  };
  const SIDEBAR_W = 72;

  // Sections that should hide the right panel
  const hideRightPanel = activeSection !== "home";

  return (
    <div className="bg-background min-h-screen">
      {loading && <PageLoader />}
      {/* Mobile Header */}
      {isMobile && (
        <MobileHeader
          onMessageClick={() => setActiveSection("messages")}
          onLogoClick={() => setActiveSection("home")}
          onNavigate={handleNavigate}
        />
      )}

      {/* Desktop/Tablet Left Sidebar */}
      {!isMobile && (
        <Sidebar
          activeSection={activeSection}
          onNavigate={(section) => {
            if (section === "messages") {
              setChatOpen(true);
              return;
            }
            handleNavigate(section);
          }}
          onMoreClick={() => setMoreModalOpen(true)}
        />
      )}

      {/* Main scrollable content */}
      <div
        style={{
          marginLeft: isMobile ? 0 : SIDEBAR_W,
          display: "flex",
          alignItems: "flex-start",
          minHeight: "100vh",
        }}
      >
        {/* Left gap spacer */}
        {!isMobile && !isTablet && <div style={{ flex: 4, minWidth: 0 }} />}

        <main
          style={{
            flex: isMobile || isTablet ? 1 : "0 0 630px",
            width: isMobile || isTablet ? undefined : 630,
            paddingTop: isMobile ? 56 : 0,
            paddingBottom: isMobile ? 80 : 0,
            minWidth: 0,
          }}
        >
          <div style={{ padding: "0 0 32px" }}>
            {/* ── Profile ── */}
            {activeSection === "profile" ? (
              <ProfileView onNavigate={handleNavigate} />
            ) : /* ── Events ── */
            activeSection === "events" ? (
              <EventsSection onNavigate={setActiveSection} />
            ) : activeSection === "digital" ? (
              <DigitalSection onNavigate={setActiveSection} />
            ) : activeSection === "exhibition" ? (
              <ExhibitionSection onNavigate={setActiveSection} />
            ) : activeSection === "activation" ? (
              <ActivationSection onNavigate={setActiveSection} />
            ) : activeSection === "terms" ? ( // ← add this block
              <TermsView onNavigate={setActiveSection} />
            ) : activeSection === "dataprivacy" ? ( // ← add this
              <DataPrivacyView onNavigate={setActiveSection} />
            ) : activeSection === "privacypolicy" ? ( // ← add this
              <PrivacyPolicyView onNavigate={setActiveSection} />
            ) : activeSection === "about" ? ( // ← add this
              <AboutView onNavigate={setActiveSection} />
            ) : activeSection === "casestudies" ? ( // ← add this
              <CaseStudiesView onNavigate={setActiveSection} />
            ) : activeSection === "awards" ? (
              <AwardsView onNavigate={setActiveSection} />
            ) : isMobile && activeSection === "messages" ? (
              <MobileMessagesView onBack={() => setActiveSection("home")} />
            ) : (
              /* ── Home feed ── */
              <>
                <StoriesCarousel
                  clients={clients}
                  onStoryClick={(id) => setActiveStory(id)}
                />

                <FeedWithInfiniteScroll
                  onNavigate={setActiveSection}
                  logo={logo}
                />
              </>
            )}
          </div>
        </main>
        <PresenceSection
          onNavigate={setActiveSection}
          open={open}
          setOpen={(val: boolean) => {
            setOpen(val);
            if (!val) setActiveSection("home"); // ← reset to home when closing
          }}
        />
        {/* Middle gap spacer */}
        {!isMobile && !isTablet && <div style={{ flex: 0.5, minWidth: 0 }} />}

        {/* Right Panel — desktop only, home only */}
        {!isTablet && (
          <div style={{ visibility: hideRightPanel ? "hidden" : "visible" }}>
            <RightPanel
              events={upcomingEvents}
              caseStudies={caseStudies}
              awards={awards}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* Right gap spacer */}
        {!isMobile && !isTablet && <div style={{ flex: 5, minWidth: 0 }} />}
      </div>

      {/* Story Viewer Modal */}
      {activeStory !== null && (
        <StoryViewer
          clients={clients}
          activeClientId={activeStory}
          onClose={() => setActiveStory(null)}
        />
      )}

      {/* More Modal */}
      <MoreModal
        isOpen={moreModalOpen}
        onClose={() => setMoreModalOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Mobile Bottom Nav */}
      {isMobile && (
        <MobileBottomNav
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />
      )}

      {/* Chatbot / Contact Widget (desktop only) */}
      {!isMobile && (
        <ChatbotWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      )}

      <Toaster position="bottom-center" richColors />
    </div>
  );
}
