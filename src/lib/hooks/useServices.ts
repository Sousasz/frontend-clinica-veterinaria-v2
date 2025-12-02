"use client"

import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/lib/config";

export type MedicineItem = {
  _id?: string;
  name?: string;
  description?: string;
  type?: string;
  [k: string]: unknown;
};

export type VaccineItem = {
  _id?: string;
  name?: string;
  description?: string;
  type?: string;
  [k: string]: unknown;
};

export function useMedicines() {
  const [medicines, setMedicines] = useState<MedicineItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchMedicines = () => {
      setLoading(true);
      fetch(`${BACKEND_URL}/api/medicines`)
        .then((res) => res.json())
        .then((data: MedicineItem[]) => {
          if (!mounted) return;
          console.log("Medicines fetched:", data);
          setMedicines(data || []);
          setLoading(false);
        })
        .catch((err: Error) => {
          if (!mounted) return;
          console.error("Error fetching medicines:", err);
          setError(err);
          setLoading(false);
        });
    };

    fetchMedicines();

    // Listener para eventos dentro da mesma aba
    const handleServicesUpdated = () => fetchMedicines();
    window.addEventListener("servicesUpdated", handleServicesUpdated);

    // Listener para mudanças de localStorage (sincroniza entre abas)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "medicinesUpdated") {
        fetchMedicines();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      mounted = false;
      window.removeEventListener("servicesUpdated", handleServicesUpdated);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { medicines, loading, error };
}

export function useVaccines() {
  const [vaccines, setVaccines] = useState<VaccineItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchVaccines = () => {
      setLoading(true);
      fetch(`${BACKEND_URL}/api/vaccines`)
        .then((res) => res.json())
        .then((data: VaccineItem[]) => {
          if (!mounted) return;
          console.log("Vaccines fetched:", data);
          setVaccines(data || []);
          setLoading(false);
        })
        .catch((err: Error) => {
          if (!mounted) return;
          console.error("Error fetching vaccines:", err);
          setError(err);
          setLoading(false);
        });
    };

    fetchVaccines();

    // Listener para eventos dentro da mesma aba
    const handleServicesUpdated = () => fetchVaccines();
    window.addEventListener("servicesUpdated", handleServicesUpdated);

    // Listener para mudanças de localStorage (sincroniza entre abas)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "vaccinesUpdated") {
        fetchVaccines();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      mounted = false;
      window.removeEventListener("servicesUpdated", handleServicesUpdated);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { vaccines, loading, error };
}
