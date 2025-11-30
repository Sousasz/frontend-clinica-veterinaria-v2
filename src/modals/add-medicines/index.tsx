"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import Touchable from "@/components/ui/touchable";
import AddMedicinesForm from "./add-medicines-form";
import { FormEvent } from "react";

type MedicineType = "injectables-medicines" | "no-injectables-medicines";

type AddMedicinesModalProps = {
  addMedicine: (e: FormEvent) => void;
  setMedicineName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  medicineType: string;
  setMedicineType: React.Dispatch<React.SetStateAction<MedicineType>>;
};

export default function AddMedicinesModal({
  addMedicine,
  setMedicineName,
  setDescription,
  medicineType,
  setMedicineType,
}: AddMedicinesModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Touchable>Adicionar medicamento</Touchable>
      </DialogTrigger>

      <DialogContent className="shadow-default bg-green-light bg-[url('/background-image.webp')] bg-cover bg-center bg-no-repeat rounded-4xl font-poppins">
        <DialogTitle></DialogTitle>
        <div className="backdrop-blur-md bg-white/25 shadow-2xl p-10 rounded-4xl flex flex-col gap-5 max-h-[80vh] overflow-y-auto scrollbar-hide">
          <AddMedicinesForm
            addMedicine={addMedicine}
            medicineType={medicineType}
            setMedicineName={setMedicineName}
            setDescription={setDescription}
            setMedicineType={setMedicineType}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
