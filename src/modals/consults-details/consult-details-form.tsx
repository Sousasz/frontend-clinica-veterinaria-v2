import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import SubTitle from "@/components/ui/subtitle";
import { CalendarCheck } from "lucide-react";
import { ClockFading } from "lucide-react";

type Consult = {
  consultType?: string;
  clientName?: string;
  adress?: string;
  date?: any;
  hour?: string;
  raw?: any;
  description?: string;
};

export default function ConsultDetailsForm({ consult }: { consult: Consult }) {
  const d = consult?.date ? new Date(consult.date) : consult?.raw?.scheduledAt ? new Date(consult.raw.scheduledAt) : null;
  const time = consult?.hour || (consult?.raw?.scheduledAt ? new Date(consult.raw.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—');

  return (
    <div className="flex justify-between max-[990px]:flex-col max-[990px]:text-center max-[990px]:items-center gap-10 font-poppins">
      <div className="w-full max-w-[35rem]">
        <h4 className="font-bold mb-2">Dados do pet</h4>
        <div className="bg-white/70 p-4 rounded-lg shadow-sm">
          <p className="font-semibold">Nome: {consult?.raw?.pet?.name || '—'}</p>
          <p>Espécie: {consult?.raw?.pet?.species || '—'}</p>
        </div>
      </div>

      <div className="w-full max-w-[35rem]">
        <h4 className="font-bold mb-2">Dados do cliente</h4>
        <div className="bg-white/70 p-4 rounded-lg shadow-sm">
          <p className="font-semibold">Nome: {consult?.clientName || consult?.raw?.client?.username || '—'}</p>
          <p>Endereço: {consult?.adress || [consult?.raw?.client?.addressStreet, consult?.raw?.client?.addressNumber, consult?.raw?.client?.addressNeighborhood].filter(Boolean).join(', ') || '—'}</p>
        </div>
      </div>

      <div className="w-full max-w-[30rem]">
        <div className="flex flex-col gap-4">
          <SubTitle>Descrição</SubTitle>
          <p className="max-w-[30rem] text-start my-2">{consult?.raw?.description || consult?.description || '—'}</p>
        </div>

        <div className="flex justify-center gap-3 m-5">
          <div className="flex gap-1 items-center">
            <CalendarCheck className="size-8" />
            <span>{d ? format(d, 'dd/MM/yyyy', { locale: ptBR }) : 'Data não definida'}</span>
          </div>

          <div className="flex gap-1 items-center">
            <ClockFading className="size-8" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
