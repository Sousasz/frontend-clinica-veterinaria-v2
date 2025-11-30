import ConsultDetailsModal from "@/modals/consults-details";
import FormData from "@/components/shared/form-data";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Consult = {
  consultType: string;
  clientName: string;
  adress: string;
  date: string;
  hour: string;
};

type ConsultInfoProps = {
  consult: Consult;
};

export default function ConsultInfo({
  consult,
}: ConsultInfoProps) {
  return (
    <div
      className="bg-gray-50 shadow-xl/20 border-1 border-gray-200 pt-5 pr-5 pl-5 rounded-4xl w-full"
    >
      <span className="font-bold underline">{consult.consultType}</span>

      <div className="flex flex-col my-5">
        <div className="flex flex-col">
          <FormData className="max-[600px]:truncate" fieldLabel="Nome">
            {consult.clientName}
          </FormData>

          <FormData className="max-[600px]:truncate" fieldLabel="Endereço">
            {consult.adress}
          </FormData>
        </div>

        <div className="flex max-[600px]:flex-col max-[600px]:gap-5 justify-between w-full">
          <div className="flex max-[600px]:flex-col max-[600px]:gap-0.5 gap-3">
            <FormData fieldLabel="Data">
              {format(consult.date, "dd/MM/yyyy", { locale: ptBR })}
            </FormData>
            <FormData fieldLabel="Hora">{consult.hour}</FormData>
          </div>

          <ConsultDetailsModal consult={consult} />
        </div>
      </div>
    </div>
  );
}
