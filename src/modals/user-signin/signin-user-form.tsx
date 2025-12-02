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
  documentError?: string | null;
  passwordError?: string | null;
}

export default function SignInUserForm({
  documentId,
  setDocumentId,
  password,
  setPassword,
  documentError = null,
  passwordError = null,
}: SignInUserFormProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full">
      <div className="flex flex-col gap-3 w-[90%]">
        <div>
          <MaskedInput
            name="cpf-rg"
            placeholder="CPF/RG"
            mask="999.999.999-99"
            value={documentId}
            onChange={(e: InputMaskChangeEvent) =>
              setDocumentId(e.target.value ?? "")
            }
            aria-invalid={documentError ? "true" : "false"}
            aria-describedby={documentError ? "document-error" : undefined}
          />
          {documentError ? (
            <p id="document-error" className="text-red-500 text-sm mt-1">
              {documentError}
            </p>
          ) : null}
        </div>

        <div>
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            aria-invalid={passwordError ? "true" : "false"}
            aria-describedby={passwordError ? "password-error" : undefined}
          />
          {passwordError ? (
            <p id="password-error" className="text-red-500 text-sm mt-1">
              {passwordError}
            </p>
          ) : null}
        </div>
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
