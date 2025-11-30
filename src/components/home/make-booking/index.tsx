import About from "./about";
import Title from "@/components/ui/title";
import BookingModal from "@/modals/booking";

export default function MakeBooking() {
  return (
    <section className="flex flex-col items-center gap-10 w-full" id="booking">
      <Title>Faça seu agendamento</Title>
      <About />
      <BookingModal />
    </section>
  );
}
