import Title from "@/components/ui/title";
import { Textarea } from "@/components/ui/textarea";
import BookingCalendar from "./booking-calendar";

interface BookingDetailsProps {
  description: string;
  setDescription: (s: string) => void;
  date?: Date | undefined;
  setDate?: (d?: Date) => void;
  hour?: string;
  setHour?: (h: string) => void;
}

export default function BookingDetails({ description, setDescription, date, setDate, hour, setHour }: BookingDetailsProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-14 w-[60%]">
      <div className="flex flex-col gap-5 w-full justify-center items-center">
        <Title>Descrição breve</Title>
        <Textarea className="max-[520px]:w-72 max-[410px]:w-56" placeholder="Descrição breve" value={description} onChange={(e) => setDescription((e.target as HTMLTextAreaElement).value)} />
      </div>

      <div className="flex flex-col gap-5">
        <Title>Data e hora</Title>
        <BookingCalendar date={date} setDate={setDate} hour={hour} setHour={setHour} />
      </div>
    </div>
  );
}
