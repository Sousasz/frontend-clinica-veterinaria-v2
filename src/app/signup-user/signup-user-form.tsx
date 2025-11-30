"use client";
import Touchable from "@/components/ui/touchable";
import MaskedInput from "@/components/shared/masked-input";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from '@/lib/config';
import type { AxiosError } from "axios";
import { InputMaskChangeEvent } from "primereact/inputmask";
import { useCepSearch } from "@/lib/hooks/useCepSearch";

export default function SignUpUserForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [addressComplement, setAddressComplement] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressNeighborhood, setAddressNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState<string | string[]>("");
  const [success, setSuccess] = useState("");
  const [cepMessage, setCepMessage] = useState("");

  const { loading: cepLoading, error: cepError, fetchAddressFromCep } = useCepSearch();

  const handleCepChange = async (e: InputMaskChangeEvent) => {
    const cepValue = e.target.value ?? "";
    setCep(cepValue);
    setCepMessage("");

    // Busca endereço quando CEP tiver 8 dígitos
    if (cepValue.replace(/\D/g, "").length === 8) {
      const addressData = await fetchAddressFromCep(cepValue);
      if (addressData) {
        setAddressStreet(addressData.street);
        setAddressNeighborhood(addressData.neighborhood);
        setCity(addressData.city);
        setState(addressData.state);
        setCepMessage("✅ Endereço preenchido automaticamente!");
       } else {
         setCepMessage("❌ CEP não encontrado");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const requiredFields = [
      { value: documentId, label: "CPF/RG" },
      { value: username, label: "Nome completo" },
      { value: dateOfBirth, label: "Data de nascimento" },
      { value: phone, label: "Telefone" },
      { value: cep, label: "CEP" },
      { value: addressStreet, label: "Endereço" },
      { value: addressNeighborhood, label: "Bairro" },
      { value: city, label: "Cidade" },
      { value: state, label: "Estado" },
      { value: password, label: "Senha" },
    ];

    const missingFields = requiredFields.filter(field => !field.value.trim());
    if (missingFields.length > 0) {
      setError(missingFields.map(field => `${field.label} é obrigatório.`));
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/register`,
        {
          username: documentId.replace(/\D/g, ""),
          password,
          documentId: documentId.replace(/\D/g, ""),
          dateOfBirth,
          phone: phone.replace(/\D/g, ""),
          cep: cep.replace(/\D/g, ""),
          addressNumber,
          addressComplement,
          addressStreet,
          addressNeighborhood,
          city,
          state,
        }
      );

      setSuccess(response.data.message || "Cadastro realizado com sucesso!");

      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      const error = err as AxiosError<{
        message?: string;
        errors?: Record<string, string>;
      }>;

      console.error("Erro no cadastro:", error.response?.data || error.message);

      // Coleta múltiplas mensagens de erro
      const errorMessages: string[] = [];
      if (error.response?.data?.message) {
        errorMessages.push(error.response.data.message);
      }
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.values(errors).forEach(msg => errorMessages.push(msg));
      }
      if (errorMessages.length === 0) {
        errorMessages.push("Erro ao registrar usuário.");
      }

      setError(errorMessages);
      // Opcional: Limpar mensagens de erro após 5 segundos
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center w-[60%] gap-3">
        <div className="flex justify-center">
          <div className="flex flex-col gap-3 w-full">
            <MaskedInput
              placeholder="CPF/RG"
              mask="999.999.999-99"
              value={documentId}
              onChange={(e: InputMaskChangeEvent) =>
                setDocumentId(e.target.value ?? "")
              }
            />
            <Input
              type="text"
              placeholder="Nome completo"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
            <Input
              type="date"
              placeholder="Data de nascimento"
              value={dateOfBirth}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDateOfBirth(e.target.value)
              }
            />
            <MaskedInput
              placeholder="Telefone"
              mask="(99) 99999-9999"
              value={phone}
              onChange={(e: InputMaskChangeEvent) =>
                setPhone(e.target.value ?? "")
              }
            />
            <MaskedInput
              placeholder="CEP"
              mask="99999-999"
              value={cep}
              onChange={handleCepChange}
              disabled={cepLoading}
            />
            {cepMessage && (
              <p className={cepMessage.includes("❌") ? "text-red-500 text-center" : "text-green-500 text-center"}>
                {cepMessage}
              </p>
            )}

            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Número"
                value={addressNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAddressNumber(e.target.value)
                }
              />
              <Input
                type="text"
                placeholder="Complemento"
                value={addressComplement}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAddressComplement(e.target.value)
                }
              />
            </div>

            <Input
              type="text"
              placeholder="Endereço"
              value={addressStreet}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddressStreet(e.target.value)
              }
            />
            <Input
              type="text"
              placeholder="Bairro"
              value={addressNeighborhood}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddressNeighborhood(e.target.value)
              }
            />
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Cidade"
                value={city}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCity(e.target.value)
                }
              />
              <Input
                type="text"
                placeholder="Estado (UF)"
                value={state}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setState(e.target.value)
                }
                maxLength={2}
              />
            </div>
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-center">
            {Array.isArray(error) ? (
              <ul className="list-disc list-inside">
                {error.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            ) : (
              <p>{error}</p>
            )}
          </div>
        )}

        {success && <p className="text-green-500 text-center">{success}</p>}

        <Touchable onClick={handleSubmit}>Concluído</Touchable>
      </div>
    </div>
  );
}