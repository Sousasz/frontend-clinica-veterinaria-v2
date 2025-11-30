"use client";
import MaskedInput from "@/components/shared/masked-input";
import { Input } from "@/components/ui/input";
import { InputMaskChangeEvent } from "primereact/inputmask";
import Link from "next/link";

interface SignInUserFormProps {
  documentId: string;
  setDocumentId: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignInUserForm({
  documentId,
  setDocumentId,
  password,
  setPassword,
}: SignInUserFormProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col gap-3 w-[90%]">
        <MaskedInput
          name="cpf-rg"
          placeholder="CPF/RG"
          mask="999.999.999-99"
          value={documentId}
          onChange={(e: InputMaskChangeEvent) =>
            setDocumentId(e.target.value ?? "")
          }
        />

        <Input
          name="password"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </div>

      <span className="flex flex-col justify-center font-poppins text-sm text-center">
        <Link href="/reset-password" className="font-medium underline">
          Esqueceu a senha?
        </Link>

        <Link href="/signup-user" className="font-medium underline">
          Não tem um login? Cadastre-se
        </Link>
      </span>
      {/* O botão Touchable está no componente pai UserSignIn, então a função handleLogin deve ser passada para ele */}
    </div>
  );
}
