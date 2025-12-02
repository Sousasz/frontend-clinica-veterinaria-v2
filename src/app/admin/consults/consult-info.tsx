import ConsultDetailsModal from "@/modals/consults-details";
import FormData from "@/components/shared/form-data";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GoTrash } from "react-icons/go";
import { showToast } from "@/lib/utils/toast";
import { BACKEND_URL } from "@/lib/config";

type Consult = {
  consultType: string;
  clientName: string;
  adress: string;
  date: string;
  hour: string;
  raw?: any;
};

type ConsultInfoProps = {
  consult: Consult;
  onDelete?: () => Promise<void> | void;
};

export default function ConsultInfo({
  consult,
  onDelete,
}: ConsultInfoProps) {
  const handleDelete = async () => {
    try {
      const ok = confirm('Deseja excluir este agendamento? Esta ação é irreversível.');
      if (!ok) return;
      const id = consult.raw?._id || consult.raw?.id || undefined;
      if (!id) {
        showToast('ID do agendamento não encontrado.', 'error');
        return;
      }
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`${BACKEND_URL}/api/appointments/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}`, 'x-auth-token': token } : {}),
        },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        showToast(data?.message || 'Erro ao deletar agendamento.', 'error');
        return;
      }
      showToast('Agendamento excluído.', 'success');
      if (onDelete) await onDelete();
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error);
      showToast('Erro ao deletar agendamento.', 'error');
    }
  };
  return (
    <div
      className="bg-gray-50 shadow-xl/20 border-1 border-gray-200 pt-5 pr-5 pl-5 rounded-4xl w-full"
    >
      <span className="font-bold underline">{consult.consultType}</span>

      <div className="flex flex-col my-5">
        <div className="flex flex-col">
          <FormData className="max-[600px]:truncate" fieldLabel="CPF">
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

          <div className="flex items-center gap-2">
            <ConsultDetailsModal consult={consult} />
            <button onClick={handleDelete} title="Excluir consulta" className="text-red-600 hover:text-red-800">
              <GoTrash className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
