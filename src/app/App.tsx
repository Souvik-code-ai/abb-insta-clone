// import { useState, useEffect } from "react";
// import { Toaster } from "sonner";
// import { Sidebar } from "./components/Sidebar";
// import { StoriesCarousel } from "./components/StoriesCarousel";
// import { StoryViewer } from "./components/StoryViewer";
// import { FeedCard } from "./components/FeedCard";
// import { RightPanel } from "./components/RightPanel";
// import { ChatbotWidget } from "./components/ChatbotWidget";
// import { MoreModal } from "./components/MoreModal";
// import { MobileHeader } from "./components/MobileHeader";
// import { MobileBottomNav } from "./components/MobileBottomNav";
// import { MobileMessagesView } from "./components/MobileMessagesView";
// import { ProfileView } from "./components/ProfileView";
// import { clients, feedPosts, upcomingEvents, caseStudies, awards } from "./data/mockData";

// export default function App() {
//   const [activeSection, setActiveSection] = useState("home");
//   const [moreModalOpen, setMoreModalOpen] = useState(false);
//   const [activeStory, setActiveStory] = useState<number | null>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);
//   const [chatOpen, setChatOpen] = useState(false);

//   useEffect(() => {
//     const checkSize = () => {
//       setIsMobile(window.innerWidth < 770);
//       setIsTablet(window.innerWidth < 1160);
//     };
//     checkSize();
//     window.addEventListener("resize", checkSize);
//     return () => window.removeEventListener("resize", checkSize);
//   }, []);

//   const SIDEBAR_W = 72;
//   const RIGHT_W = 320;

//   return (
//     <div className="bg-background min-h-screen">
//       {/* Mobile Header */}
//       {isMobile && (
//         <MobileHeader onMessageClick={() => setActiveSection("messages")} onLogoClick={() => setActiveSection("home")} />
//       )}

//       {/* Desktop/Tablet Left Sidebar */}
//       {!isMobile && (
//         <Sidebar
//           activeSection={activeSection}
//           onNavigate={setActiveSection}
//           onMoreClick={() => setMoreModalOpen(true)}
//         />
//       )}

//       {/* Main scrollable content */}
//       <div
//         style={{
//           marginLeft: isMobile ? 0 : SIDEBAR_W,
//           display: "flex",
//           alignItems: "flex-start",
//           minHeight: "100vh",
//         }}
//       >
//         {/* Left gap spacer — 0.8R (flex 4 of 10) */}
//         {!isMobile && !isTablet && <div style={{ flex: 4, minWidth: 0 }} />}

//       <main
//         style={{
//           flex: isMobile || isTablet ? 1 : "0 0 630px",
//           width: isMobile || isTablet ? undefined : 630,
//           paddingTop: isMobile ? 56 : 0,
//           paddingBottom: isMobile ? 80 : 0,
//           minWidth: 0,
//         }}
//       >
//         <div
//           style={{
//             padding: "0 0 32px",
//           }}
//         >
//           {/* Profile section */}
//           {activeSection === "profile" ? (
//             <ProfileView />
//           ) : /* Messages view (mobile) — same UI as ChatbotWidget contact form */
//           isMobile && activeSection === "messages" ? (
//             <MobileMessagesView onBack={() => setActiveSection("home")} />
//           ) : (
//             <>
//           {/* Stories */}
//           <StoriesCarousel
//             clients={clients}
//             onStoryClick={(id) => setActiveStory(id)}
//           />

//           {/* Feed */}
//           <div className="flex flex-col gap-4 px-4 pt-4">
//             {feedPosts.map((post) => (
//               <FeedCard key={post.id} post={post} />
//             ))}

//             {/* End-of-feed message */}
//             <div className="flex flex-col items-center py-8 gap-2">
//               <div
//                 className="rounded-full flex items-center justify-center"
//                 style={{
//                   width: 48, height: 48,
//                   background: "linear-gradient(135deg, #d4456a 0%, #f9a8c9 100%)",
//                 }}
//               >
//                 <span style={{ color: "#fff", fontFamily: "var(--font-family-display)", fontSize: 20 }}>A</span>
//               </div>
//               <p style={{ fontSize: 13, color: "#8e8e93", textAlign: "center" }}>
//                 You've seen all recent projects.<br />
//                 <a href="#" style={{ color: "#d4456a", fontWeight: 600 }}>Explore our full portfolio →</a>
//               </p>
//             </div>
//           </div>
//             </>
//           )}
//         </div>
//       </main>

//       {/* Middle gap spacer — 0.1R (flex 0.5 of 10) */}
//       {!isMobile && !isTablet && <div style={{ flex: 0.5, minWidth: 0 }} />}

//       {/* Right Panel — desktop only */}
//       {!isTablet && (
//         <div style={{ visibility: activeSection === "home" ? "visible" : "hidden" }}>
//           <RightPanel
//             events={upcomingEvents}
//             caseStudies={caseStudies}
//             awards={awards}
//           />
//         </div>
//       )}

//       {/* Right gap spacer — R (flex 5 of 10) */}
//       {!isMobile && !isTablet && <div style={{ flex: 5, minWidth: 0 }} />}
//       </div>

//       {/* Story Viewer Modal */}
//       {activeStory !== null && (
//         <StoryViewer
//           clients={clients}
//           activeClientId={activeStory}
//           onClose={() => setActiveStory(null)}
//         />
//       )}

//       {/* More Modal */}
//       <MoreModal
//         isOpen={moreModalOpen}
//         onClose={() => setMoreModalOpen(false)}
//       />

//       {/* Mobile Bottom Nav */}
//       {isMobile && (
//         <MobileBottomNav
//           activeSection={activeSection}
//           onNavigate={setActiveSection}
//         />
//       )}

//       {/* Chatbot / Contact Widget (desktop only) */}
//       {!isMobile && (
//         <ChatbotWidget
//           triggerOpen={activeSection === "messages"}
//           onTriggered={() => setActiveSection("home")}
//         />
//       )}

//       <Toaster position="bottom-center" richColors />
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { Sidebar } from "./components/Sidebar";
import { StoriesCarousel } from "./components/StoriesCarousel";
import { StoryViewer } from "./components/StoryViewer";
import { FeedCard } from "./components/FeedCard";
import { RightPanel } from "./components/RightPanel";
import { ChatbotWidget } from "./components/ChatbotWidget";
import { MoreModal } from "./components/MoreModal";
import { MobileHeader } from "./components/MobileHeader";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { MobileMessagesView } from "./components/MobileMessagesView";
import { ProfileView } from "./components/ProfileView";
import { EventsSection } from "./components/Eventssection";
import logo from "../assets/logo.jpg";
import {
  clients,
  feedPosts,
  upcomingEvents,
  caseStudies,
  awards,
} from "./data/mockData";
import { DigitalSection } from "./components/DigitalSection";
import { ExhibitionSection } from "./components/ExhibitonSection";
import { ActivationSection } from "./components/ActivationSection";
import PageLoader from "./components/ui/Pageloader";
import { ArrowRight } from "lucide-react";
import { PresenceSection } from "./components/PresenseSection";
export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [moreModalOpen, setMoreModalOpen] = useState(false);
  const [activeStory, setActiveStory] = useState<number | null>(null);
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
  // const handleNavigate = (section) => {
  //   if (section === activeSection) return;

  //   setLoading(true);

  //   window.scrollTo({
  //     top: 0,
  //     behavior: "auto",
  //   });

  //   setTimeout(() => {
  //     setActiveSection(section);
  //     setLoading(false);
  //   }, 500);
  // };
  const handleNavigate = (section: string) => {
    if (section === "presence") {
      setOpen(true); // ← was setPresenceOpen
    } else {
      setOpen(false); // ← was setPresenceOpen
      setActiveSection(section);
    }
  };
  const SIDEBAR_W = 72;

  // Sections that should hide the right panel
  const hideRightPanel = activeSection !== "home";
  // useEffect(() => {
  //   if (activeSection === "presence") {
  //     setOpen(true);
  //   }
  // }, [activeSection]);
  return (
    <div className="bg-background min-h-screen">
      {loading && <PageLoader />}
      {/* Mobile Header */}
      {isMobile && (
        <MobileHeader
          onMessageClick={() => setActiveSection("messages")}
          onLogoClick={() => setActiveSection("home")}
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
              <ProfileView onNavigate={setActiveSection} />
            ) : /* ── Events ── */
            activeSection === "events" ? (
              <EventsSection onNavigate={setActiveSection} />
            ) : activeSection === "digital" ? (
              <DigitalSection onNavigate={setActiveSection} />
            ) : activeSection === "exhibition" ? (
              <ExhibitionSection onNavigate={setActiveSection} />
            ) : activeSection === "activation" ? (
              <ActivationSection onNavigate={setActiveSection} />
            ) : // ) : activeSection === "presence" ? (
            //   <>
            //     <PresenceSection
            //       onNavigate={setActiveSection}
            //       open={open}
            //       setOpen={setOpen}
            //     />
            //   </>
            // ) : /* ── Mobile Messages ── */
            isMobile && activeSection === "messages" ? (
              <MobileMessagesView onBack={() => setActiveSection("home")} />
            ) : (
              /* ── Home feed ── */
              <>
                <StoriesCarousel
                  clients={clients}
                  onStoryClick={(id) => setActiveStory(id)}
                />

                <div className="flex flex-col gap-4 px-4 pt-4">
                  {feedPosts.map((post) => (
                    <FeedCard key={post.id} post={post} />
                  ))}

                  {/* End-of-feed */}
                  <div className="flex flex-col items-center py-8 gap-2">
                    <div
                      className="rounded-full flex items-center justify-center"
                      style={{
                        width: 48,
                        height: 48,
                        background:
                          "linear-gradient(135deg, #d4456a 0%, #f9a8c9 100%)",
                      }}
                    >
                      <img src={logo} alt="" />
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#8e8e93",
                        textAlign: "center",
                      }}
                    >
                      You've seen all feeds.
                      <br />
                      {/* <a
                        href="#"
                        style={{ color: "#d4456a", fontWeight: 600 }}
                      >
                        Explore our full portfolio →
                      </a> */}
                    </p>
                    <button
                      onClick={() => setActiveSection("events")}
                      className="mt-0 flex items-center gap-2 font-base flex-row justify-center cursor-pointer"
                      style={{ color: "#579F63" }}
                    >
                      Explore More
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
        <PresenceSection
          onNavigate={setActiveSection}
          open={open}
          setOpen={setOpen}
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
