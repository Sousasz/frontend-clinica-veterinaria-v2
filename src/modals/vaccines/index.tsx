"use client";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import VaccinesList from "./vaccines-list";
import { useVaccines } from "@/lib/hooks/useServices";


export default function VaccinesModal() {
  const { vaccines, loading, error } = useVaccines();
  return (
    <DialogContent className="sm:max-w-[90%] shadow-default h-[90%] bg-green-light font-poppins bg-[url('/background-image.webp')] bg-cover bg-center bg-no-repeat">
      <div className="backdrop-blur-md bg-white/25 shadow-2xl p-10 rounded-lg flex flex-col gap-10 overflow-y-scroll scrollbar-hide">
        <DialogHeader className="max-w-full flex items-center text-3xl">
          <DialogTitle>VACINAS</DialogTitle>
        </DialogHeader>
        {loading ? <span>Carregando...</span> : error ? <span>Erro ao carregar</span> : <VaccinesList vaccines={vaccines} />}
      </div>
    </DialogContent>
  );
}
