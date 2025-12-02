import { useEffect, useState, useCallback } from "react";
import { BACKEND_URL } from "@/lib/config";

export type FetchedAppointment = {
  _id?: string;
  consultType?: string;
  scheduledAt?: string;
  date?: string;
  hour?: string;
  client?: Record<string, unknown>;
  pet?: Record<string, unknown>;
  [key: string]: unknown;
};

export function useAllAppointments() {
  const [appointments, setAppointments] = useState<FetchedAppointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Read token from localStorage and send in header (accept both forms)
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        headers['x-auth-token'] = token;
      }
      const res = await fetch(`${BACKEND_URL}/api/appointments/all`, { headers });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.message || 'Erro ao buscar agendamentos');
        setAppointments([]);
      } else {
        const data = await res.json();
        setAppointments(data || []);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { appointments, loading, error, refresh: fetchAll };
}
