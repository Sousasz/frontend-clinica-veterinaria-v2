import Hero from "@/components/home/hero";
import ServicesCarousel from "@/components/home/carousel";
import MakeBooking from "@/components/home/make-booking";
import Regions from "@/components/home/regions";
import ClientsRating from "@/components/home/clients-rating";
import Chatbot from "@/components/home/chatbot";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-36 p-8" id="home">
      <Hero />
      <ServicesCarousel />
      <MakeBooking />
      <ClientsRating />
      <Regions />
      <Chatbot />
    </main>
  );
}
