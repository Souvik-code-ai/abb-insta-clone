// Add these imports at the top alongside existing ones
import { useState, useEffect, useRef, useCallback } from "react";
import { Toaster } from "sonner";

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
import { Sidebar } from "./app/dashboard/Sidebar";
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
import PageLoader from "./components/ui/Pageloader";
import { ArrowRight } from "lucide-react";
import { PresenceSection } from "./pages/presence/PresenseSection";
import { AboutView } from "./pages/more/AboutView";
// ── Feed with infinite scroll ─────────────────────────────────────────────────
// how many posts to load per batch

import FeedWithInfiniteScroll from "./pages/home/FeedWithInfiniteScroll";
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
