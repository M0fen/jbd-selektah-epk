import BackgroundLazy from "@/components/BackgroundLazy";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BioCarousel from "@/components/BioCarousel";
import Stats from "@/components/Stats";
import MultimediaCarousels from "@/components/MultimediaCarousels";
import Press from "@/components/Press";
import TourDates from "@/components/TourDates";
import Merch from "@/components/Merch";
import PressKit from "@/components/PressKit";
import ConnectSection from "@/components/ConnectSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import AudioToggle from "@/components/AudioToggle";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen text-white overflow-x-hidden selection:bg-gold selection:text-black">
      {/* Background is Fixed, z-index -10 — lazy client-only chunk */}
      <BackgroundLazy />

      {/* Fixed Navbar */}
      <Navbar />

      {/* Scrollable Content */}
      <div className="relative z-10 flex flex-col w-full">
        <Hero />
        <BioCarousel />
        <Stats />
        <MultimediaCarousels />
        <Press />
        <TourDates />
        <Merch />
        <PressKit />
        <ConnectSection />
        <Footer />
      </div>

      {/* Floating controls */}
      <AudioToggle />
      <WhatsAppFloat />
    </main>
  );
}
