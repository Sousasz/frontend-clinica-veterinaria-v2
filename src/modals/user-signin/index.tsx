"use client";

import avatarImage from "../../../public/images/avatar.webp";
import Image from "next/image";
import Touchable from "@/components/ui/touchable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignInUserForm from "./signin-user-form";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import type { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useAppointments } from "@/contexts/appointments-context";
import { Spinner } from "@/components/ui/spinner";
import { BACKEND_URL } from '@/lib/config';

function UserSignInContent() {
  const [documentId, setDocumentId] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, login } = useAuth();
  const { refreshAppointments } = useAppointments();

  useEffect(() => {
    if (searchParams.get("openLogin") === "true") {
      setOpen(true);
    }
  }, [searchParams]);

  const handleLogin = async () => {
    if (!documentId.trim() || !password.trim()) {
      alert("CPF/RG e senha são obrigatórios.");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/login`,
        {
          cpf: documentId.replace(/\D/g, ""),
          password,
        }
      );

      // use AuthContext.login to store token and fetch profile
      if (login) {
        await login(response.data.token);
      } else {
        localStorage.setItem("token", response.data.token);
      }

      alert("Login realizado com sucesso!");
      // refresh appointments so user dashboard shows current data
      try { await refreshAppointments(); } catch (e) { /* ignore */ }
      setOpen(false);
      router.push("/user");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error("Erro no login:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          "Erro ao fazer login. Verifique suas credenciais."
      );
    }
  };

  if (user) {
  const greeting = user.role === "admin" ? `Olá administrador` : `Olá, usuário`;
  return (
    <button
      onClick={() => router.push("/user")}
      className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
    >
      <span className="text-sm font-medium">{greeting}</span>
      <Image className="size-10" src={avatarImage} alt="Imagem do usuário" />
    </button>
  );
}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="cursor-pointer">
          <Image
            className="size-10"
            src={avatarImage}
            alt="Imagem do usuário"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="shadow-default bg-green-light bg-[url('/background-image.webp')] bg-cover bg-center bg-no-repeat rounded-4xl">
        <div className="backdrop-blur-md bg-white/25 shadow-2xl p-10 rounded-4xl flex flex-col gap-5 overflow-y-auto scrollbar-hide">
          <DialogHeader className="max-w-full flex items-center">
            <DialogTitle className="text-center text-3xl font-poppins font-light p-1 w-80">
              Login
            </DialogTitle>
          </DialogHeader>

          <SignInUserForm
            documentId={documentId}
            setDocumentId={setDocumentId}
            password={password}
            setPassword={setPassword}
          />

          {error && <p className="text-red-500 text-center">{error}</p>}

          <Touchable onClick={handleLogin}>Entrar</Touchable>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function UserSignIn() {
  return (
    <Suspense fallback={<Spinner className="size-6 text-green-dark" />}>
      <UserSignInContent />
    </Suspense>
  );
}
