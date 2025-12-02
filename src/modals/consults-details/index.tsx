"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Title from "@/components/ui/title";
import ConsultDetailsForm from "./consult-details-form";

type Consult = {
  consultType?: string;
  clientName?: string;
  adress?: string;
  date?: string | Date | null;
  hour?: string;
  raw?: Record<string, unknown> | null;
};

export default function ConsultDetailsModal({ consult }: { consult: Consult }) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button className="underline cursor-pointer max-[330px]:text-start">
            Ver mais...
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[90%] shadow-default h-[90%] bg-green-light bg-[url('/background-image.webp')] bg-cover bg-center bg-no-repeat">
          <div className="backdrop-blur-md bg-white/25 shadow-2xl p-10 rounded-4xl flex flex-col gap-14 overflow-y-auto scrollbar-hide max-[340px]:-m-3">
            <DialogHeader className="max-w-full flex items-center">
              <DialogTitle className="text-center text-3xl font-poppins font-light p-1 w-80">
                <Title className="max-[340px]:text-xl">Detalhes da consulta</Title>
              </DialogTitle>
            </DialogHeader>

                <ConsultDetailsForm consult={consult} />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}