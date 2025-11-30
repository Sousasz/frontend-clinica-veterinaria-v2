import { useEffect, useState, useCallback } from "react";
import { BACKEND_URL } from "@/lib/config";

export function useAllAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    } catch (err) {
      setError(err as any);
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
