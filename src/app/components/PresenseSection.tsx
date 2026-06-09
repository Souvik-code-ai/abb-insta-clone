import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import locationImage from "../../assets/location/bengaluru.jpg";
import logo from "../../assets/download.jpg";
import email from "../../assets/email.webp";
import addressLogo from "../../assets/address_logo.jpg";
import phone from "../../assets/phone.webp";
type Panel = "address" | "email" | "phone" | null;
import {
  MapPin,
  Building2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  X,
  Phone,
  Mail,
} from "lucide-react";

interface Location {
  id: number;
  state: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
}

const LOCATIONS: Location[] = [
  {
    id: 1,
    state: "West Bengal",
    city: "Kolkata",
    address: "6A Janak Rd, Opposite Lake Market, Kalighat, Kolkata 700029",
    lat: 22.516429,
    lng: 88.348355,
  },
  {
    id: 2,
    state: "Karnataka",
    city: "Bengaluru",
    address: "Bengaluru Office",
    lat: 12.964982,
    lng: 77.614963,
  },
  {
    id: 3,
    state: "Assam",
    city: "Guwahati",
    address: "30 M. Ahmed Road, Rehabari, Guwahati, Assam 781008",
    lat: 26.173736,
    lng: 91.750856,
  },
  {
    id: 4,
    state: "Bihar",
    city: "Patna",
    address: "Anupma House Apartment, Patliputra, Patna, Bihar",
    lat: 25.6251803,
    lng: 85.1080785,
  },
  {
    id: 5,
    state: "Odisha",
    city: "Bhubaneswar",
    address: "Puri-Cuttack Road, Laxmisagar, Bhubaneswar 751006",
    lat: 20.268402,
    lng: 85.848254,
  },
  {
    id: 6,
    state: "Jharkhand",
    city: "Ranchi",
    address: "Ranchi Office",
    lat: 23.396207,
    lng: 85.344595,
  },
  {
    id: 7,
    state: "Uttar Pradesh",
    city: "Lucknow",
    address: "1/210 Virat Khand, Gomti Nagar, Lucknow 226010",
    lat: 26.851821,
    lng: 81.020259,
  },
  {
    id: 8,
    state: "Tamil Nadu",
    city: "Chennai",
    address:
      "Sabapathy Cross St, Kuppusamy Nagar, Annanagar East, Chennai 600102",
    lat: 13.093143,
    lng: 80.231039,
  },
];

function getMapSrc(lat: number, lng: number, zoom = 13): string {
  return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

// ---------- FullscreenModal ----------

interface FullscreenModalProps {
  loc: Location;
  onClose: () => void;
}

function FullscreenModal({ loc, onClose }: FullscreenModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-[90vw] h-[80vh] rounded-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors"
        >
          <X size={18} />
        </button>
        <iframe
          src={getMapSrc(loc.lat, loc.lng, 15)}
          className="w-full h-full border-none"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

// ---------- SidePanel ----------

function SidePanel({
  setOpen,
  onNavigate,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onNavigate: (page: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [fullscreenLoc, setFullscreenLoc] = useState<Location | null>(null);
  const [carouselOffset, setCarouselOffset] = useState<number>(0);
  const [mapKey, setMapKey] = useState<number>(1);

  const trackRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  const selectedLoc = LOCATIONS.find((l) => l.id === selectedId)!;

  const getMaxOffset = (): number => {
    if (!trackRef.current || !outerRef.current) return 0;
    return Math.max(
      0,
      trackRef.current.scrollWidth - outerRef.current.clientWidth + 32,
    );
  };

  const scrollCarousel = (dir: number) => {
    setCarouselOffset((prev) =>
      Math.max(0, Math.min(getMaxOffset(), prev + dir * 240)),
    );
  };

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${carouselOffset}px)`;
    }
  }, [carouselOffset]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !fullscreenLoc) {
        setOpen(false);
        onNavigate("Home");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setOpen, fullscreenLoc, onNavigate]);

  const selectLocation = (id: number) => {
    if (id === selectedId) return;
    setSelectedId(id);
    setMapKey(id); // triggers AnimatePresence remount → scale animation

    const btn = document.getElementById(`locbtn-${id}`);
    if (btn && outerRef.current && trackRef.current) {
      const btnLeft = btn.offsetLeft;
      const btnRight = btnLeft + btn.offsetWidth;
      const viewLeft = carouselOffset;
      const viewRight = carouselOffset + outerRef.current.clientWidth - 32;
      let newOffset = carouselOffset;
      if (btnLeft < viewLeft) newOffset = Math.max(0, btnLeft - 16);
      else if (btnRight > viewRight) newOffset = btnLeft - 16;
      newOffset = Math.max(0, Math.min(getMaxOffset(), newOffset));
      setCarouselOffset(newOffset);
    }
  };

  const openMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${selectedLoc.lat},${selectedLoc.lng}`,
      "_blank",
    );
  };

  const atStart = carouselOffset <= 0;
  const atEnd = carouselOffset >= getMaxOffset();
  const [active, setActive] = useState<Panel>(null);

  const toggle = (type: Exclude<Panel, null>) =>
    setActive((prev) => (prev === type ? null : type));
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Slide-in panel */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full z-50 flex flex-col bg-background border-r border-border shadow-xl "
        style={{
          width: window.innerWidth < 640 ? "100vw" : "400px",
        }}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-border flex-shrink-0 flex items-start justify-between">
          <button
            onClick={() => {
              setOpen(false);
              onNavigate("Home");
            }}
            className="mt-1 w-8 h-8 rounded-full flex items-center justify-center border border-border hover:bg-secondary transition-colors flex-shrink-0 cursor-pointer"
          >
            <X size={15} />
          </button>
          <div className="flex flex-row justify-center  items-center mx-auto ">
            <div className="flex flex-col justify-center items-center">
              <img
                src={logo}
                alt=""
                className="h-25 w-30 rounded-full absolute top-11"
              />
              <div className="rounded-lg shadow-xl flex flex-col justify-around gap-4 py-4 px-12 pt-12 border mt-20 pb-7">
                {/* <p className="text-2xl mt-1.5 text-black leading-tight font-semibold">
                  Abybaby Events
                </p> */}
                <div className="flex flex-row justify-between items-center gap-5">
                  <button
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => toggle("address")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#48752C"
                    >
                      <path d="M200-200v-200h240v200-200H200v200Zm480-360ZM40-120v-400l280-200 280 200-28.5 28.5L543-463 320-622 120-480v280h80v-200h240v280h-80v-200h-80v200H40Zm880-720v405q-17-18-37-32.5T840-493v-267H480v56l-80-58v-78h520ZM680-600h80v-80h-80v80Zm40 560q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm-20-80h40v-100h100v-40H740v-100h-40v100H600v40h100v100Z" />
                    </svg>
                  </button>
                  <button
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => toggle("email")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#48752C"
                    >
                      <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                    </svg>
                  </button>
                  <button
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => toggle("phone")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#48752C"
                    >
                      <path d="m720-560-58-56 64-64H520v-80h206l-62-62 56-58 160 162-160 158Zm78 440q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        {/* <div className="flex flex-col divide-y divide-border border-b border-border flex-shrink-0">
      
          <div className="flex items-start gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-xl  flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin size={14} className="text-[#7CFC58]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-0.5">
                Address
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                6B, Janak Rd, Lake Market, Kalighat Kolkata-700029, West Bengal
              </p>
            </div>
          </div>

  
          <div className="flex items-start gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-xl  flex items-center justify-center flex-shrink-0 mt-0.5">
              <Mail size={14} className="text-[#7CFC58]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-0.5">
                Email
              </p>
              <div className="flex flex-row gap-2">
                {" "}
                <a
                  href="mailto:sucheta@abybaby.co.in"
                  className="block text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  sucheta@abybaby.co.in
                </a>
                <a
                  href="mailto:shaw.vijay@abybaby.co.in"
                  className="block text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  shaw.vijay@abybaby.co.in
                </a>
              </div>
            </div>
          </div>


          <div className="flex items-start gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-xl  flex items-center justify-center flex-shrink-0 mt-0.5 ">
              <Phone size={14} className="text-[#7CFC58]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-0.5">
                Phone
              </p>
              <div className="flex flex-row gap-3">
                <a
                  href="tel:+919830832000"
                  className="block text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  +91 9830832000
                </a>
                <a
                  href="tel:+919830974955"
                  className="block text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  +91 9830974955
                </a>
              </div>
            </div>
          </div>
        </div> */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="
        absolute
        top-44
        left-1/2
        -translate-x-1/2
        z-50
        w-[90%]
        max-w-[320px]
      "
            >
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl border">
                {/* Magazine Cover */}
                <div className=" relative">
                  <button
                    onClick={() => setActive(null)}
                    className="absolute right-3 top-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-black cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                  {/* <div className="absolute left-5 bottom-4 text-white">
                    <p className="text-[10px] uppercase tracking-[0.25em]">
                      Contact Information
                    </p>

                    <h3 className="text-xl font-bold capitalize">{active}</h3>
                  </div> */}
                </div>

                {/* Content */}
                <div className="p-5">
                  {active === "address" && (
                    <>
                      {/* <img
                        src={addressLogo}
                        className="w-12 h-12 rounded-xl mb-3"
                      /> */}

                      <p className="text-xs uppercase tracking-widest text-[#48752C] font-semibold">
                        Head Office
                      </p>

                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        6B, Janak Rd, Lake Market,
                        <br />
                        Kalighat,
                        <br />
                        Kolkata - 700029
                        <br />
                        West Bengal
                      </p>
                    </>
                  )}

                  {active === "email" && (
                    <>
                      <p className="text-xs uppercase tracking-widest text-[#48752C] font-semibold">
                        Email Us
                      </p>

                      <div className="mt-3 space-y-2">
                        <a
                          href="mailto:sucheta@abybaby.co.in"
                          className="block text-sm text-gray-600 hover:text-[#48752C]"
                        >
                          sucheta@abybaby.co.in
                        </a>

                        <a
                          href="mailto:shaw.vijay@abybaby.co.in"
                          className="block text-sm text-gray-600 hover:text-[#48752C]"
                        >
                          shaw.vijay@abybaby.co.in
                        </a>
                      </div>
                    </>
                  )}

                  {active === "phone" && (
                    <>
                      <p className="text-xs uppercase tracking-widest text-[#48752C] font-semibold">
                        Call Us
                      </p>

                      <div className="mt-3 space-y-2">
                        <a
                          href="tel:+919830832000"
                          className="block text-sm text-gray-600 hover:text-[#48752C]"
                        >
                          +91 98308 32000
                        </a>

                        <a
                          href="tel:+919830974955"
                          className="block text-sm text-gray-600 hover:text-[#48752C]"
                        >
                          +91 98309 74955
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Horizontal Carousel */}
          <div className="relative flex-shrink-0 border-b border-border py-3 bg-background">
            <button
              onClick={() => scrollCarousel(-1)}
              disabled={atStart}
              className={`absolute left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full border border-border bg-background flex items-center justify-center text-foreground  cursor-pointer hover:border-primary hover:text-primary transition-all ${
                atStart ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <ChevronLeft size={14} />
            </button>

            <div ref={outerRef} className="overflow-hidden">
              <div
                ref={trackRef}
                className="flex gap-2 px-4 transition-transform duration-300"
                style={{ willChange: "transform" }}
              >
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    id={`locbtn-${loc.id}`}
                    onClick={() => selectLocation(loc.id)}
                    className={`flex-shrink-0 flex flex-col overflow-hidden items-center gap-1 h-15 w-20 rounded-xl border transition-all duration-300 ${
                      selectedId === loc.id
                        ? "bg-[#2C7048] border-[#2C7048] text-white shadow-md"
                        : "border-gray-200 bg-white text-gray-700 hover:border-[#2C7048] hover:bg-[#f4faf6] hover:text-[#2C7048]"
                    }`}
                  >
                    <img src={locationImage} alt="" className="h-full w-full" />

                    {/* <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {loc.state}
                    </span> */}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => scrollCarousel(1)}
              disabled={atEnd}
              className={`absolute right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full border border-border bg-background flex items-center justify-center cursor-pointer text-foreground  hover:border-primary hover:text-primary transition-all ${
                atEnd ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Animated Map */}
          <div className="px-4 pt-4 pb-2 flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden bg-muted h-52">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mapKey}
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.06, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <iframe
                    src={getMapSrc(selectedLoc.lat, selectedLoc.lng)}
                    className="w-full h-full border-none pointer-events-none"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Fullscreen hint overlay */}
              <button
                onClick={() => setFullscreenLoc(selectedLoc)}
                className="absolute bottom-2 right-2 z-10 flex items-center gap-1 bg-black/60 hover:bg-black/80 text-white text-[10px] px-2 py-1 rounded-lg transition-colors"
              >
                <Maximize2 size={10} /> Full screen
              </button>
            </div>
          </div>

          {/* Selected location info */}
          <div className="px-4 pb-4 flex-shrink-0">
            <div className="bg-secondary border border-border rounded-2xl px-4 py-3 flex items-start gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Building2 size={14} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight">
                  {selectedLoc.city}
                </p>
                <p className="text-[10px] text-primary font-medium mb-1">
                  {selectedLoc.state}
                </p>
                <div className="flex items-start gap-1">
                  <MapPin
                    size={11}
                    className="text-muted-foreground flex-shrink-0 mt-0.5"
                  />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selectedLoc.address}
                  </p>
                </div>
              </div>
              <button
                onClick={openMaps}
                className="flex items-center gap-1 text-[10px] px-2.5 py-1.5 rounded-lg border border-border bg-background hover:bg-primary/10 hover:border-primary hover:text-primary transition-all flex-shrink-0"
              >
                <ExternalLink size={10} /> Maps
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Map Modal */}
      {fullscreenLoc && (
        <FullscreenModal
          loc={fullscreenLoc}
          onClose={() => setFullscreenLoc(null)}
        />
      )}
    </>
  );
}

// ---------- PresenceSection ----------

export function PresenceSection({ onNavigate, open, setOpen }) {
  return (
    <>
      <AnimatePresence>
        {open && <SidePanel setOpen={setOpen} onNavigate={onNavigate} />}
      </AnimatePresence>
    </>
  );
}
