"use client";

import * as React from "react";
import { format } from "date-fns";
import { FiCalendar } from "react-icons/fi";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { useAllAppointments, FetchedAppointment } from "@/lib/hooks/useAllAppointments";

import ConsultInfo from "./consult-info";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ConsultsFilter() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);

  const { appointments, loading, error, refresh } = useAllAppointments();

  // transforma appointments para o formato esperado por ConsultInfo
  const getString = (obj: Record<string, unknown> | undefined, key: string) => {
    const v = obj?.[key];
    return typeof v === 'string' ? v : undefined;
  };

  const transformed = appointments.map((appt: FetchedAppointment) => {
    const client = appt.client as Record<string, unknown> | undefined;
    const pet = appt.pet as Record<string, unknown> | undefined;
    const addressParts = [getString(client, 'addressStreet'), getString(client, 'addressNumber'), getString(client, 'addressNeighborhood')]
      .filter(Boolean)
      .join(', ');

    const scheduled = appt.scheduledAt ?? appt.date ?? undefined;
    const dateObj = scheduled ? new Date(String(scheduled)) : null;

    return {
      consultType: appt.consultType,
      clientName: getString(client, 'username') || '—',
      adress: addressParts || '—',
      date: dateObj ? format(dateObj, 'yyyy-MM-dd', { locale: ptBR }) : '—',
      hour: appt.hour || (dateObj ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''),
      raw: appt,
    };
  });

  const filteredConsults = transformed.filter((consult: { date: string; raw: FetchedAppointment }) => {
    if (!consult.date || consult.date === '—') return false;
    const apptDate = new Date(consult.date);
    if (dateRange?.from && apptDate < dateRange.from) return false;
    if (dateRange?.to && apptDate > dateRange.to) return false;
    return true;
  });

  // auto refresh for admin view so new bookings appear
  React.useEffect(() => {
    const id = setInterval(() => {
      refresh().catch(() => {});
    }, 10_000);
    return () => clearInterval(id);
  }, [refresh]);

  return (
    <div className="flex flex-col p-4 space-y-4">
      <div className="flex flex-col max-[520px]:items-center">
        <span>Filtrar por data:</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="max-w-72 max-[320px]:w-48 text-left justify-start font-normal"
            >
              <FiCalendar className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange?.to ? (
                  <>
                    {format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                    {format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}
                  </>
                ) : (
                  format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
                )
              ) : (
                <span>Selecione o período</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              className="font-poppins"
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              locale={ptBR}
              formatters={{
                formatWeekdayName: (day) => {
                  return format(day, "EEEEE", { locale: ptBR });
                },
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="text-sm text-red-500">Erro ao carregar consultas.</p>
        ) : filteredConsults.length > 0 ? (
          filteredConsults.map((consult, index) => (
            <ConsultInfo consult={consult} key={index} />
          ))
        ) : (
          <p className="text-sm text-gray-500">Nenhuma consulta encontrada.</p>
        )}
      </div>
    </div>
  );
}
