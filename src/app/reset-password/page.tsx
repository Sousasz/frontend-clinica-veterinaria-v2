"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import petIconImage from "../../../public/images/pet-icon.webp";
import { Input } from "@/components/ui/input";
import Touchable from "@/components/ui/touchable";
import InputOTPValidation from "@/components/ui/input-otp-validation";
import { BACKEND_URL } from '@/lib/config';

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const API_BASE = `${BACKEND_URL}/api/auth`;

  async function handleForgotPassword() {
    if (!identifier) {
      setError("Digite o username ou telefone.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_BASE}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(data.msg);
        setStep(2); // Vai para etapa de OTP
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError("Erro de conexão.");
    }
    setLoading(false);
  }

  async function handleVerifyOTP() {
    if (!otp) {
      setError("Digite o código OTP completo (6 dígitos).");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_BASE}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(data.msg);
        setUserId(data.userId); // Armazena o userId retornado
        setStep(3); // Vai para etapa de nova senha
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError("Erro de conexão.");
    }
    setLoading(false);
  }

  async function handleResetPassword() {
    if (newPassword !== confirmPassword) {
      setError("Senhas não coincidem.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_BASE}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(data.msg);
        setTimeout(() => router.push("/?openLogin=true"), 2000);
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError("Erro de conexão.");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-green-light bg-cover bg-center bg-no-repeat bg-[url('/images/background-image.webp')] gap-5">
      <Image src={petIconImage} alt="Ícone de um cachorro" />
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-3xl text-center">Redefinir Senha</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        {loading && <p>Carregando...</p>}

        {step === 1 && (
          <div className="flex flex-col gap-5">
            <p>Insira seu username ou telefone para receber o código.</p>
            <Input
              placeholder="Username ou Telefone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <Touchable onClick={handleForgotPassword}>Enviar Código</Touchable>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5">
            <p>Insira o código OTP recebido.</p>
            <InputOTPValidation value={otp} onChange={setOtp} />{" "}
            {/* Passa setOtp diretamente */}
            <Touchable onClick={handleVerifyOTP}>Verificar Código</Touchable>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-5">
            <p>Defina uma nova senha.</p>
            <Input
              type="password"
              placeholder="Nova Senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Touchable onClick={handleResetPassword}>Redefinir Senha</Touchable>
          </div>
        )}
      </div>
    </div>
  );
}
