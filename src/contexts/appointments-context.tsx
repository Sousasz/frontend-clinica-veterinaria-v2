'use client'

import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './auth-context';

import { BACKEND_URL } from '@/lib/config';

export type Appointment = {
  _id: string;
  consultType: string;
  description?: string;
  scheduledAt?: string; // ISO
  date?: string;
  hour?: string;
  pet?: { _id?: string; name?: string; species?: string } | string;
  status?: string;
  googleEventId?: string;
};

type AppointmentsContextType = {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  refreshAppointments: () => Promise<void>;
  clearAppointments: () => void;
};

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

export const AppointmentsProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // we can rely on token in localStorage. If auth provider is present, it will load user first.
  const refreshAppointments = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      setAppointments([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/appointments/client`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'x-auth-token': token,
        },
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body?.message || 'Erro ao buscar agendamentos');
        setAppointments([]);
      } else {
        const body = await res.json();
        setAppointments(body || []);
      }
    } catch (err: any) {
      console.error('Erro fetch appointments:', err);
      setError('Erro ao buscar agendamentos');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const clearAppointments = () => setAppointments([]);

  useEffect(() => {
    // refresh automatically on mount so user page shows current list
    refreshAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppointmentsContext.Provider value={{ appointments, loading, error, refreshAppointments, clearAppointments }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export function useAppointments() {
  const ctx = useContext(AppointmentsContext);
  if (!ctx) throw new Error('useAppointments must be used within an AppointmentsProvider');
  return ctx;
}
