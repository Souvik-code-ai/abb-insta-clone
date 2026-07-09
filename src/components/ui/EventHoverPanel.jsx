import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
export default function EventHoverPanel({ hoveredEvent }) {
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
