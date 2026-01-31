import Background from "@/components/Background";
import Hero from "@/components/Hero";
import BioCarousel from "@/components/BioCarousel";
import ConnectSection from "@/components/ConnectSection";
import MediaFooter from "@/components/MediaFooter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen text-white overflow-x-hidden selection:bg-gold selection:text-black">
      {/* Background is Fixed, z-index -10 */}
      <Background />

      {/* Scrollable Content */}
      <div className="relative z-10 flex flex-col w-full">
        <Hero />
        <BioCarousel />
        <MediaFooter />
        <ConnectSection />
        <Footer />
      </div>
    </main>
  );
}
