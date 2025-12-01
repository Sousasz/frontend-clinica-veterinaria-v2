'use client'

import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/lib/config";

export function useMedicines() {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchMedicines = () => {
      setLoading(true);
      fetch(`${BACKEND_URL}/api/medicines`)
        .then((res) => res.json())
        .then((data: any) => {
          if (!mounted) return;
          console.log("Medicines fetched:", data); // Log para depuração
          setMedicines(data);
          setLoading(false);
        })
        .catch((err: Error) => {
          if (!mounted) return;
          console.error("Error fetching medicines:", err); // Log para depuração
          setError(err);
          setLoading(false);
        });
    };

    fetchMedicines();

    // re-fetch when another part of the app signals an update
    const handler = () => fetchMedicines();
    window.addEventListener("servicesUpdated", handler);

    return () => {
      mounted = false;
      window.removeEventListener("servicesUpdated", handler);
    };
  }, []);

  return { medicines, loading, error };
}

export function useVaccines() {
  const [vaccines, setVaccines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchVaccines = () => {
      setLoading(true);
      fetch(`${BACKEND_URL}/api/vaccines`)
        .then((res) => res.json())
        .then((data: any) => {
          if (!mounted) return;
          console.log("Vaccines fetched:", data); // Log para depuração
          setVaccines(data);
          setLoading(false);
        })
        .catch((err: Error) => {
          if (!mounted) return;
          console.error("Error fetching vaccines:", err); // Log para depuração
          setError(err);
          setLoading(false);
        });
    };

    fetchVaccines();

    const handler = () => fetchVaccines();
    window.addEventListener("servicesUpdated", handler);

    return () => {
      mounted = false;
      window.removeEventListener("servicesUpdated", handler);
    };
  }, []);

  return { vaccines, loading, error };
}
