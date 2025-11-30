"use client";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MedicinesFirstList from "../injectables-medicines/medicines-first-list";
import { useMedicines } from "@/lib/hooks/useServices";


export default function InjectablesMedicineModal() {
  const { medicines, loading, error } = useMedicines();
  // Filtrar apenas os injetáveis, se houver campo tipo/categoria
  const injectables = medicines.filter(m => m.type === "injectables-medicines");
  return (
    <DialogContent className="sm:max-w-[90%] shadow-default h-[90%] bg-green-light font-poppins bg-[url('/background-image.webp')] bg-cover bg-center bg-no-repeat">
      <div className="backdrop-blur-md bg-white/25 shadow-2xl p-10 rounded-lg flex flex-col gap-10 overflow-y-auto scrollbar-hide">
        <DialogHeader className="max-w-full flex items-center">
          <DialogTitle>MEDICAMENTOS</DialogTitle>
        </DialogHeader>
        {loading ? <span>Carregando...</span> : error ? <span>Erro ao carregar</span> : <MedicinesFirstList medicines={injectables} />}
      </div>
    </DialogContent>
  );
}
