import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle
} from "@/components/ui/dialog";
import Touchable from "@/components/ui/touchable";
import AddVaccinesForm from "./add-vaccines-form";
import { FormEvent } from "react";

type VacineType = "for-dogs" | "for-cats";

type AddVaccinesModalProps = {
  addVaccine: (e: FormEvent) => void;
  setVaccineName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  vaccineType: string;
  setVaccineType: React.Dispatch<React.SetStateAction<VacineType>>;
};

export default function AddVaccinesModal({
  addVaccine,
  setVaccineName,
  setDescription,
  vaccineType,
  setVaccineType,
}: AddVaccinesModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Touchable>Adicionar vacina</Touchable>
      </DialogTrigger>

      <DialogContent className="shadow-default bg-green-light bg-[url('/background-image.webp')] bg-cover bg-center bg-no-repeat rounded-4xl font-poppins">
        <DialogTitle></DialogTitle>
        <div className="backdrop-blur-md bg-white/25 shadow-2xl p-10 rounded-4xl flex flex-col gap-5 max-h-[80vh] overflow-y-auto scrollbar-hide">
          <AddVaccinesForm
            addVaccine={addVaccine}
            vaccineType={vaccineType}
            setVaccineName={setVaccineName}
            setDescription={setDescription}
            setVaccineType={setVaccineType}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}