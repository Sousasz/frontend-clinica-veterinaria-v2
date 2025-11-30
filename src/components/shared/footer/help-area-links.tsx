import { Phone } from "lucide-react";

export function HelpAreaLinks() {
  return (
    <div className="flex flex-col gap-4">
      <span>FAQ</span>

      <span>FALE DIRETAMENTE COM A JOYCE</span>

      <span className="flex items-center gap-2">
        <Phone className="size-7" color="#00FF88" />
        <a href="#">(11) 9****-****</a>
      </span>

      <p className="max-w-[314px]">
        Nosso serviço de atendimento ao consumidor está disponível para
        atendê-lo de segunda a sexta-feira das 8h às 17h.
      </p>
    </div>
  );
}
