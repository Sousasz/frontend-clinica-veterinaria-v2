'use client'

import BookingInputs from "./booking-inputs";
import BookingDetails from "./booking-details";
import { useState } from 'react';
import { BACKEND_URL } from '@/lib/config';
import { useAppointments } from '@/contexts/appointments-context';
import Touchable from "@/components/ui/touchable";
import Link from "next/link";

export default function BookingForm() {
  const [petName, setPetName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState('10:30');
  const [consultType, setConsultType] = useState('Consulta clínica');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { refreshAppointments } = useAppointments();

  async function submitBooking() {
    setMessage(null);
    if (!petName) return setMessage('Informe o nome do pet.');
    if (!description) return setMessage('Informe uma descrição do agendamento.');
    if (!date) return setMessage('Selecione uma data.');
    if (!hour) return setMessage('Informe o horário.');

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) return setMessage('Você precisa estar logado para agendar.');

    const dateStr = date.toISOString().slice(0,10); // YYYY-MM-DD

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ petName, consultType, description, date: dateStr, hour })
      });

      const body = await res.json().catch(()=>({}));
      if (!res.ok) {
        setMessage(body?.message || 'Erro ao criar agendamento.');
      } else {
        let msg = 'Agendamento criado com sucesso.';
        if (body?.googleEvent) msg += ` Evento criado no Google: ${body.googleEvent.link || body.googleEvent.id}`;
        // refresh global appointments so user's list updates
        try { await refreshAppointments(); } catch {};
        setMessage(msg);
      }
    } catch (err) {
      console.error('Erro agendamento front:', err);
      setMessage('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex w-full justify-between items-center max-[1335px]:flex-col max-[1335px]:gap-20">
          <div className="grid gap-10">
          <BookingInputs petName={petName} onPetNameChange={setPetName} />

          <span className="flex flex-col justify-center font-poppins text-sm text-center">
            <p>
              Caso ainda nao tenha seu animal cadastrado, clique neste botão
              para cadastrá-lo
            </p>

            <Link href="/signup-pet" className="font-bold text-center underline">
              Cadastrar Novo Animal
            </Link>
          </span>
        </div>

        <BookingDetails description={description} setDescription={setDescription} date={date} setDate={setDate} hour={hour} setHour={setHour} />
      </div>

      <div className="flex flex-col items-center">
        {message && <div className="mb-2 text-sm text-center text-black">{message}</div>}
        <Touchable onClick={submitBooking} disabled={loading}>{loading ? 'Enviando...' : 'Concluir agendamento'}</Touchable>
      </div>
    </div>
  );
}
