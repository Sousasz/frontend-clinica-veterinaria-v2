"use client";

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Title from "@/components/ui/title";

export default function RatingsModal() {
  return (
    <DialogContent className="sm:max-w-[90%] shadow-default h-[90%] bg-green-light bg-[url('/background-image.webp')] bg-cover bg-center bg-no-repeat rounded-4xl">
      <div className="backdrop-blur-md bg-white/25 shadow-2xl p-10 rounded-lg flex flex-col gap-10 overflow-auto">
        <DialogHeader className="max-w-full flex items-center">
          <DialogTitle>
            <Title>Nossas avaliações</Title>
          </DialogTitle>
        </DialogHeader>
      </div>
    </DialogContent>
  );
}
