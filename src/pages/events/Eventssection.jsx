import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import logo from "../../assets/images/logo.jpg";
import { EVENTS } from "../../../public/events/events";
import { Link } from "react-router-dom";
function EventCard({ event, showType, onHover, onLeave }) {
  const [hoveredProject, setHoveredProject] = useState(null);
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm "
      onMouseEnter={() => onHover?.(event)}
      onMouseLeave={() => onLeave?.()}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={event.image}
          alt={event.name}
          className="w-full object-cover h-[200px]"
        />
        {showType && (
          <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-linear-to-r from-lime-800 to-lime-600  text-[11px] text-white ">
            {event.type}
          </span>
        )}
        {/* Expired overlay */}
        {event.status === "expired" && (
          <div className="absolute inset-0 flex items-end p-3 bg-black/0.18">
            <span className="px-2 py-0.5 rounded-full text-xs font-medium text-white bg-black/0.55 text-[11px]">
              Past event
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 leading-snug line-clamp-1 font-sans text-[15px]">
          {event.name}
        </h3>

        <div className="mt-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-gray-500 text-[13px]">
            <Calendar size={13} className="text-lime-600 flex-0" />
            {event.date}
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-[13px]">
            <MapPin size={13} className="text-lime-600 flex-0" />
            {event.location}
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-[13px]">
            <Users size={13} className="text-lime-600 flex-0" />
            {event.attendees.toLocaleString()} Attendance
          </div>
        </div>
      </div>
    </motion.div>
  );
}
function EventHoverPanel({ hoveredEvent }) {
  return (
    <div className="hidden xl:block w-64 2xl:w-100 fixed flex-shrink-0 right-[10vw] top-[15vh]">
      <AnimatePresence mode="wait">
        {hoveredEvent ? (
          <motion.div
            key={hoveredEvent.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl bg-white  border-gray-100 p-5 border "
          >
            {/* Preview Image */}
            <img
              src={hoveredEvent.image}
              alt={hoveredEvent.name}
              className="w-full rounded-xl object-cover mb-4 h-[150px]"
            />

            {/* Name */}
            <h3 className="font-semibold text-gray-900 font-sans text-sm mb-3">
              {hoveredEvent.name}
            </h3>

            {/* Stats */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400 mb-1">Date</p>
                <p className="text-xs font-semibold text-gray-800">
                  {hoveredEvent.date}
                </p>
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400 mb-1">Attendance</p>
                <p className="text-xs font-semibold text-gray-800">
                  {hoveredEvent.attendees.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Details */}
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">
              Details
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 flex-shrink-0" />
                {hoveredEvent.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 flex-shrink-0" />
                {hoveredEvent.type}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 flex-shrink-0" />
                {hoveredEvent.status === "upcoming" ? "Upcoming" : "Past event"}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
// ── Progress bar item ─────────────────────────────────────────────────────────
function ProgressItem({ title, value }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5 text-[14px]">
        <span className="text-gray-700 font-medium">{title}</span>
        <span className="text-lime-600 font-extrabold">{value}%</span>
      </div>
      <div className="rounded-full overflow-hidden h-1.5 bg-white">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[#65A30D] to-[#ECFCCB]"
        />
      </div>
    </div>
  );
}

// ── Highlights tab ────────────────────────────────────────────────────────────
function EventHighlights() {
  const featured = EVENTS.slice(0, 4);

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-start">
      {/* Metrics */}
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-gray-900 font-sans text-[18px]">
            Event performance
          </h2>
          <p className="text-gray-500 mt-1 font-sans text-[13px]">
            Aggregated across all managed events
          </p>
        </div>

        {/* Stat pills */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Events managed", value: "120+" },
            { label: "Total attendees", value: "48K" },
            { label: "Cities covered", value: "22" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-3 text-center bg-lime-100 border border-[#f5e0e7]"
            >
              <p className="font-bold text-lime-600 text-[20px]">
                {stat.value}
              </p>
              <p className="text-gray-500 leading-tight mt-0.5 text-[11px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <ProgressItem title="Client satisfaction" value={95} />
          <ProgressItem title="On-time delivery" value={92} />
          <ProgressItem title="Repeat clients" value={88} />
        </div>
      </div>

      {/* Gallery */}
      <div>
        <div className="mb-4">
          <h2 className="font-semibold text-gray-900 font-sans text-[18px]">
            Gallery
          </h2>
          <p className="text-gray-500 mt-1 font-sans text-[13px]">
            Moments from our events
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featured.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="relative overflow-hidden rounded-xl group aspect-[4/3]"
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <p className="absolute bottom-0 left-0 right-0 p-2.5 text-white font-medium leading-tight line-clamp-2 text-[12px]">
                {event.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ label }) {
  return (
    <div className="flex flex-col items-center py-16 gap-3">
      <div className="rounded-full flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#d4456a] to-[#f9a8c9]">
        <Calendar size={22} color="#fff" />
      </div>
      <p className="text-gray-500 text-center text-[14px]">
        No {label} events at the moment.
      </p>
    </div>
  );
}
const ITEMS_PER_PAGE = 2;
// ── Root export ───────────────────────────────────────────────────────────────
export function EventsSection({ onNavigate }) {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE); // ✅ tracks how many to show
  const loaderRef = useRef(null);
  const TABS = [
    { key: "upcoming", label: "Upcoming" },
    { key: "expired", label: "Past events" },
    { key: "highlights", label: "Highlights" },
  ];

  const [activeTab, setActiveTab] = useState("upcoming");
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeTab]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // use "auto" for instant jump
    });
  }, []);
  const upcoming = EVENTS.filter((e) => e.status === "upcoming");
  const expired = EVENTS.filter((e) => e.status === "expired");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
        }
      },
      { threshold: 1.0 },
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [activeTab]);

  const currentList = activeTab === "upcoming" ? upcoming : expired;
  const visibleEvents = currentList.slice(0, visibleCount); // ✅ sliced list
  const hasMore = visibleCount < currentList.length;
  return (
    <div className="w-full min-h-screen bg-background min-[1160px]:mx-20 min-[770px]:mx-16 mx-0">
      {/* Page header — matches ProfileView / other section headings */}
      <div className="sticky top-0 z-10 px-4 pt-4 pb-3 bg-[var(--color-background,#fff)]">
        <h1 className="font-semibold text-gray-900 font-sans lg:text-3xl md:text-2xl text-xl var(--font-family-body) tracking-[-0.01em]">
          Events
        </h1>
        <p className="text-gray-500 mt-0.5 text-[13px]">
          Explore our latest events and achievements
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mt-3">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1.5 rounded-full transition-all text-sm md:font-medium font-sm ${activeTab === tab.key ? "bg-[#2C7048] text-white border-none" : "bg-transparent text-[#8e8e93] border border-[#e5e5ea]"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="px-2 py-5"
        >
          {(activeTab === "upcoming" || activeTab === "expired") &&
            (visibleEvents.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-2">
                  {visibleEvents.map(
                    (
                      event, // ✅ visibleEvents instead of full list
                    ) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        showType={activeTab === "upcoming"}
                        onHover={setHoveredEvent}
                        onLeave={() => setHoveredEvent(null)}
                      />
                    ),
                  )}
                </div>
                {hasMore ? (
                  <div ref={loaderRef} className="flex justify-center py-6">
                    <div className="w-6 h-6 rounded-full border-2 border-lime-600 border-t-transparent animate-spin" />
                  </div>
                ) : (
                  <p className="text-center text-gray-400 text-sm py-6"></p>
                )}
                <EventHoverPanel hoveredEvent={hoveredEvent} />
              </>
            ) : (
              <EmptyState
                label={activeTab === "upcoming" ? "upcoming" : "past"}
              />
            ))}

          {/* {activeTab === "expired" &&
            (expired.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {expired.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      showType={false}
                      onHover={setHoveredEvent}
                      onLeave={() => setHoveredEvent(null)}
                    />
                  ))}
                </div>
                <EventHoverPanel hoveredEvent={hoveredEvent} />
              </>
            ) : (
              <EmptyState label="past" />
            ))} */}

          {activeTab === "highlights" && <EventHighlights />}
        </motion.div>
      </AnimatePresence>

      {/* End-of-section footer — same as feed */}
      <div className="flex flex-col items-center py-8 gap-2">
        <div className="rounded-full flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#d4456a] to-[#f9a8c9]">
          <img src={logo} alt="" />
        </div>
        <p className="text-[13px] text-[#8e8e93] text-center">
          You've seen all recent events.
          <br />
        </p>
        <Link
          to={"/digital"}
          className="mt-0 flex items-center gap-2 font-base flex-row justify-center cursor-pointer text-[#579F63]"
        >
          Explore More
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
