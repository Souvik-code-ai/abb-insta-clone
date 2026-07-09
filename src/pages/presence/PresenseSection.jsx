import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import logo from "../../assets/images/download.jpg";
import email from "../../assets/images/email.webp";
import addressLogo from "../../assets/images/address_logo.jpg";
import phone from "../../assets/images/phone.webp";
import { Globe, Recycle } from "lucide-react";
import { LOCATIONS } from "../../../public/presence/presence";
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


// ---------- FullscreenModal ----------

import FullscreenModal from "../../components/ui/FullScreenModal";

// ---------- SidePanel ----------

import SidePanel from "../../components/ui/SidePanel";

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
