"use client";

import Title from "@/components/ui/title";
import EditUser from "@/modals/edit-user";
import EditPet from "@/modals/edit-pet";
import ActionButton from "@/components/shared/action-button";
import UserConsults from "@/app/user/user-consults";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import axios from "axios"; 
import type { AxiosError } from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Users() {
  const router = useRouter();
  const { logout, user } = useAuth();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    handleLogout();
  };


  const handleDeleteAccount = async () => {
    if (!user) return;
    setLoading(true);
    setDeleteMessage("");
    try {
      await axios.delete(
        "https://backend-clinica-veterinaria.onrender.com/api/auth/delete-account",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      logout();
      router.push("/");
      setDeleteMessage("Conta excluída com sucesso."); 
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error("Erro ao excluir conta:", error.response?.data || error.message);
      setDeleteMessage(
        error.response?.data?.message || "Erro ao excluir conta. Tente novamente."
      );
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
    }
  };


  return (
    <section className="w-full h-full font-poppins">
      <div className="flex flex-col max-w-screen mx-14 my-10 gap-14">
        <div className="flex flex-col gap-10">
          <Title>Editar informações</Title>

          <div className="flex flex-col gap-8 w-fit max-[600px]:items-center max-[600px]:w-full">
            <EditUser />
            <EditPet />


            <Dialog
              open={isDeleteModalOpen}
              onOpenChange={setIsDeleteModalOpen}
            >
              <DialogTrigger asChild>
                <ActionButton className="flex items-center gap-1 cursor-pointer max-w-fit cursor font-medium underline" onClick={() => setIsDeleteModalOpen(true)}>
                  <span>Excluir conta</span>
                </ActionButton>
              </DialogTrigger>
              <DialogContent className="shadow-default bg-green-light bg-[url('/background-image.webp')] bg-cover bg-center bg-no-repeat rounded-4xl">
                <div className="backdrop-blur-md bg-white/25 shadow-2xl p-10 rounded-4xl flex flex-col gap-5">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-poppins font-light">
                      Confirmar Exclusão
                    </DialogTitle>
                  </DialogHeader>
                  <p className="text-center">
                    Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.
                  </p>
                  <DialogFooter className="flex gap-4 justify-center">
                    <ActionButton
                      onClick={() => setIsDeleteModalOpen(false)}
                      disabled={loading}
                    >
                      <span>Não</span>
                    </ActionButton>
                    <ActionButton
                      onClick={handleDeleteAccount}
                      disabled={loading}
                    >
                      <span>{loading ? "Excluindo..." : "Sim"}</span>
                    </ActionButton>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog> 

            {deleteMessage && (
              <p className={`text-center mt-4 ${deleteMessage.includes("sucesso") ? "text-green-500" : "text-red-500"}`}>
                {deleteMessage}
              </p>
            )}
           
            <Dialog
              open={isLogoutModalOpen}
              onOpenChange={setIsLogoutModalOpen}
            >
              <DialogTrigger asChild>
                <ActionButton className="flex items-center gap-1 cursor-pointer max-w-fit cursor font-medium underline" onClick={() => setIsLogoutModalOpen(true)}>
                  <span>Sair da conta</span>
                </ActionButton>
              </DialogTrigger>
              <DialogContent className="shadow-default bg-green-light bg-[url('/background-image.webp')] bg-cover bg-center bg-no-repeat rounded-4xl">
                <div className="backdrop-blur-md bg-white/25 shadow-2xl p-10 rounded-4xl flex flex-col gap-5">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-poppins font-light">
                      Confirmar Logout
                    </DialogTitle>
                  </DialogHeader>
                  <p className="text-center">
                    Tem certeza de que deseja sair da conta?
                  </p>
                  <DialogFooter className="flex gap-4 justify-center">
                    <ActionButton onClick={() => setIsLogoutModalOpen(false)}>
                      <span>Não</span>
                    </ActionButton>
                    <ActionButton onClick={handleConfirmLogout}>
                      <span>Sim</span>
                    </ActionButton>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col gap-2">
            <Title className="py-5">Suas consultas</Title>
            <UserConsults />
          </div>
        </div>
      </div>
    </section>
  );
}
