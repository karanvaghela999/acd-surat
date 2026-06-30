import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tickets from "@/components/Tickets";
import Sponsors from "@/components/Sponsors";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import FooterCTA from "@/components/FooterCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Tickets />
        <Sponsors />
        <Gallery />
        <FAQ />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
