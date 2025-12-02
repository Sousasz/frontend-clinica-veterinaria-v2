"use client";

import FormData from "@/components/shared/form-data";
import { useAppointments } from "@/contexts/appointments-context";
import { useAuth } from "@/contexts/auth-context";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function UserConsults() {
  const { appointments, loading } = useAppointments();
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-2">
      {loading && <div>Carregando suas consultas...</div>}

      {!loading && appointments.length === 0 && (
        <div className="text-sm text-gray-600">Você ainda não possui consultas agendadas.</div>
      )}

      {!loading && appointments.map((consult) => {
        const dateVal = consult.scheduledAt ? new Date(consult.scheduledAt) : undefined;
        const petName = typeof consult.pet === 'string' ? 'Seu animal' : consult.pet?.name || 'Seu animal';
        const address = user ? `${user.addressStreet}, ${user.addressNumber} - ${user.addressNeighborhood}` : '';

        return (
          <div
            key={consult._id}
            className="bg-gray-50 shadow-xl/20 border-1 border-gray-200 pt-5 pr-5 pl-5 rounded-4xl w-full"
          >
            <span className="font-bold underline">{consult.consultType}</span>

            <div className="flex flex-col my-5">
              <div className="flex flex-col">
                <FormData className="max-[600px]:truncate" fieldLabel="Nome">
                  {petName}
                </FormData>

                <FormData className="max-[600px]:truncate" fieldLabel="Endereço">
                  {address}
                </FormData>
              </div>

              <div className="flex max-[600px]:flex-col max-[600px]:gap-5 justify-between w-full">
                <div className="flex max-[600px]:flex-col max-[600px]:gap-0.5 gap-3">
                  <FormData fieldLabel="Data">
                    {dateVal ? format(dateVal, 'dd/MM/yyyy', { locale: ptBR }) : '--/--/----'}
                  </FormData>

                  <FormData fieldLabel="Hora">
                    {consult.hour || (dateVal ? dateVal.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--')}
                  </FormData>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
