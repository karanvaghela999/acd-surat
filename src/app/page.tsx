import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tickets from "@/components/Tickets";
import Sponsors from "@/components/Sponsors";
import Speakers from "@/components/Speakers";
import Agenda from "@/components/Agenda";
import Gallery from "@/components/Gallery";
import Champions from "@/components/Champions";
import FAQ from "@/components/FAQ";
import CoreTeam from "@/components/Volunteers";
import VolunteerTeam from "@/components/VolunteerTeam";
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
        <Speakers />
        <Agenda />
        <Gallery />
        <Champions />
        <FAQ />
        <CoreTeam />
        <VolunteerTeam />
        <CommunityPartners />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
