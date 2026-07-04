import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tickets from "@/components/Tickets";
import Sponsors from "@/components/Sponsors";
import Agenda from "@/components/Agenda";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import Volunteers from "@/components/Volunteers";
import CommunityPartners from "@/components/CommunityPartners";
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
        <Agenda />
        <Gallery />
        <FAQ />
        <Volunteers />
        <CommunityPartners />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
