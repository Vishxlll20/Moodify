import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "../../shared/components/Loader";
import { useHome } from "../hooks/useHome";

// Sub-components
import FloatingVinyl from "./FloatingVinyl";
import FloatingNav from "./FloatingNav";
import FloatingControls from "./FloatingControls";
import HeroSection from "./HeroSection";
import ConceptGrid from "./ConceptGrid";
import VibeScanner from "./VibeScanner";
import VibePlayer from "./VibePlayer";
import PartnerTicker from "./PartnerTicker";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HomeContent = () => {
  const {
    user,
    loading,
    vinylRef,
    activeSection,
    setActiveSection,
    isPlaying,
    currentSong,
    detectedMood,
    getMoodColor,
    scrollToSection
  } = useHome();

  // Scroll active section listener (for bottom nav pills)
useEffect(() => {
  if (loading || !user) return;

  window.scrollTo(0, 0);

  const isMobile = window.innerWidth <= 1000;
  const isSmallMobile = window.innerWidth <= 480;

  // Initial position — center of hero on all devices
  gsap.set(vinylRef.current, {
    left: 0,
    top: 0,
    xPercent: -50,
    yPercent: -50,
    x: "50vw",
    y: isMobile ? "40vh" : "52vh",
  });

  gsap.fromTo(".floating-nav-top",
    { y: -80, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.4, ease: "power4.out" }
  );
  gsap.fromTo(".floating-controls-bottom",
    { y: 80, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.4, ease: "power4.out", delay: 0.2 }
  );
  gsap.fromTo(".floating-vinyl-record",
    { scale: 0, rotation: -180 },
    { scale: 1, rotation: 0, duration: 1.6, ease: "elastic.out(1, 0.75)" }
  );

  const target = document.querySelector(".turntable-slot-target");
  const section = document.getElementById("section-player");

  let targetLeft = isMobile ? "50vw" : "77.5vw";
  let targetTop = isMobile ? "38vh" : "44.5vh";

  if (target && section) {
    const targetRect = target.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    const relativeTop = (targetRect.top + targetRect.height / 2) - sectionRect.top;

    targetLeft = () => {
      const rect = target.getBoundingClientRect();
      return rect.left + rect.width / 2;
    };
    targetTop = () => relativeTop;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".home-page-container",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
    }
  });

  if (isMobile) {
    // Mobile: vinyl stays centered, moves vertically, shrinks and exits
    tl.to(vinylRef.current, {
      x: "50vw",
      y: "45vh",
      scale: isSmallMobile ? 0.6 : 0.75,
      rotation: 240,
      ease: "power1.inOut"
    })
    .to(vinylRef.current, {
      x: "50vw",
      y: "42vh",
      scale: isSmallMobile ? 0.5 : 0.65,
      rotation: 520,
      ease: "power1.inOut"
    })
    .to(vinylRef.current, {
      x: "50vw",
      y: "38vh",
      scale: isSmallMobile ? 0.55 : 0.7,
      rotation: 840,
      ease: "power1.inOut"
    })
    .to(vinylRef.current, {
      x: "50vw",
      y: "160vh",
      scale: 0,
      rotation: 1080,
      ease: "power2.in"
    });
  } else {
    // Desktop: original path
    tl.to(vinylRef.current, {
      x: "12vw",
      y: "50vh",
      scale: 0.75,
      rotation: 240,
      ease: "power1.inOut"
    })
    .to(vinylRef.current, {
      x: "85vw",
      y: "50vh",
      scale: 0.65,
      rotation: 520,
      ease: "power1.inOut"
    })
    .to(vinylRef.current, {
      x: targetLeft,
      y: targetTop,
      scale: 0.88,
      rotation: 840,
      ease: "power1.inOut"
    })
    .to(vinylRef.current, {
      x: "67vw",
      y: "160vh",
      scale: 0,
      rotation: 1080,
      ease: "power2.in"
    });
  }

  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}, [loading, user, vinylRef]);

  if (loading) {
    return <Loader text="Syncing audio elements..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="home-page-container">
      {/* Dynamic 5-Section Floating Vinyl Record (Scroll-tied) */}
      <FloatingVinyl ref={vinylRef} />

      {/* Floating Viewport Navigation - Top */}
      <FloatingNav />

      {/* Floating Viewport Controls - Bottom */}
      <FloatingControls />

      {/* Main Scrollytelling Sections Wrap */}
      <div className="scrollytelling-wrapper">
        {/* Section 1: Hero Section */}
        <HeroSection />

        {/* Section 2: Vibe Grid (About Moodify) */}
        <ConceptGrid />

        {/* Section 3: AI Vibe Scanner */}
        <VibeScanner />

        {/* Section 4: Premium Music Player */}
        <VibePlayer />

        {/* Section 5: Loop Partner Ticker */}
        <PartnerTicker />
      </div>
    </div>
  );
};

export default HomeContent;
