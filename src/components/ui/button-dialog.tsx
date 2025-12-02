"use client";

import { JSX, useState } from "react";
import ActionButton from "../shared/action-button";
import { IconType } from "react-icons/lib";
import EditMedicinesModal from "@/modals/edit-medicines";
import RatingsModal from "@/modals/ratings";
import EditVaccinesModal from "@/modals/edit-vaccines";

import { Dialog, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

const modalComponent: Record<string, JSX.Element> = {
  Medicamento: <EditMedicinesModal />,
  Vacina: <EditVaccinesModal />,
  Avaliação: <RatingsModal />,
};

type ActionButtonProps = {
  type: string;
  text: string;
  icon: IconType;
};

type ButtonsProps = {
  Button: ActionButtonProps;
};

export default function ButtonDialog({ Button }: ButtonsProps) {
  const ModalComponent = modalComponent[Button.type] || null;
  const { logout } = useAuth();
  const router = useRouter();

  function LogoutModal() {
    const [loading, setLoading] = useState(false);

    const handleConfirm = () => {
      setLoading(true);
      try {
        logout();
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    return (
      <DialogContent className="shadow-default bg-green-light bg-[url('/background-image.webp')] bg-cover bg-center bg-no-repeat rounded-4xl">
        <div className="backdrop-blur-md bg-white/25 shadow-2xl p-10 rounded-4xl flex flex-col gap-5">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-poppins font-light">
              Sair da conta
            </DialogTitle>
          </DialogHeader>
          <p className="text-center">
            Tem certeza de que deseja sair da conta?
          </p>
          <DialogFooter className="flex gap-4 justify-center">
            <DialogClose asChild>
              <ActionButton disabled={loading}>
                <span>Não</span>
              </ActionButton>
            </DialogClose>
            <ActionButton onClick={handleConfirm} disabled={loading}>
              <span>{loading ? "Saindo..." : "Sim"}</span>
            </ActionButton>
          </DialogFooter>
        </div>
      </DialogContent>
    );
  }

  return (
    <Dialog>
      <DialogTrigger>
        <ActionButton>
          <span>{Button.text}</span>
          <Button.icon />
        </ActionButton>
      </DialogTrigger>

      {Button.type === "Logout" ? <LogoutModal /> : ModalComponent}
    </Dialog>
  );
}
