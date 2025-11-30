// import { AddedUserInformations } from "./added-user-informations";
import ActionButton from "@/components/shared/action-button";
import Title from "@/components/ui/title";
import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";

import UserDetails from "./user-details";

export default function EditUser() {
  return (
    <Dialog>
      <DialogTrigger>
        <ActionButton className="flex items-center gap-1 cursor-pointer max-w-fit cursor font-medium underline">
          <span>Editar informações</span>
          <Pencil className="size-5" />
        </ActionButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[90%] shadow-default h-[90%] bg-green-light bg-[url('/background-image.webp')] bg-cover bg-center bg-no-repeat">
        <div className="backdrop-blur-md bg-white/25 shadow-2xl p-10 rounded-lg flex flex-col gap-10 overflow-y-auto scrollbar-hide">
          <DialogHeader>
            <DialogTitle>
              <Title>Suas informações</Title>
            </DialogTitle>
          </DialogHeader>

          <UserDetails />
        </div>
      </DialogContent>
    </Dialog>
  );
}
