import { CaptureMode } from "@/components/CaptureMode";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/hero/Hero";
import { Landscape } from "@/components/landscape/Landscape";
import { Nav } from "@/components/Nav";
import { RevealObserver } from "@/components/RevealObserver";
import { AnnotateSection } from "@/components/sections/AnnotateSection";
import { Bento } from "@/components/sections/Bento";
import { CaptureFeature } from "@/components/sections/CaptureFeature";
import { Cta } from "@/components/sections/Cta";
import { Faq } from "@/components/sections/Faq";
import { LogoMarquee, Statement } from "@/components/sections/Intro";
import { Pricing } from "@/components/sections/Pricing";
import { RecordFeature } from "@/components/sections/RecordFeature";
import { Reviews } from "@/components/sections/Reviews";
import { Stats } from "@/components/sections/Stats";
import { Testimonial } from "@/components/sections/Testimonial";
import { WhySwitch } from "@/components/sections/WhySwitch";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <LogoMarquee />
        <Statement />
        <CaptureFeature />
        <AnnotateSection />
        <Testimonial />
        <Stats />
        <RecordFeature />
        <Bento />
        <WhySwitch />
        <Reviews />
        <Pricing featuredArt={<Landscape scene="dusk" uid="pricing" align="xMidYMax" />} />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <CaptureMode />
      <RevealObserver />
    </>
  );
}
