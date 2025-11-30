import Touchable from "@/components/ui/touchable";
import BookingForm from "./booking-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function BookingModal() {
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Touchable buttonType="secondary">
            Clique aqui para agendar uma consulta
          </Touchable>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[90%] sha  dow-default h-[90%] bg-green-light bg-[url('/background-image.webp')] bg-cover bg-center bg-no-repeat">
          <div className="backdrop-blur-md bg-white/25 shadow-2xl p-10 rounded-lg flex flex-col gap-10 overflow-y-auto scrollbar-hide">
            <DialogHeader className="max-w-full flex items-center">
              <DialogTitle className="text-center text-3xl font-poppins font-light p-1 w-80">
                AGENDAMENTO
              </DialogTitle>
            </DialogHeader>

            <BookingForm />
          </div>
        </DialogContent>
    </Dialog>
  );
}