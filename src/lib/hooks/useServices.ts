'use client'

import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/lib/config";

export function useMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/medicines`)
      .then((res) => res.json())
      .then((data) => {
        setMedicines(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { medicines, loading, error };
}

export function useVaccines() {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/vaccines`)
      .then((res) => res.json())
      .then((data) => {
        setVaccines(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { vaccines, loading, error };
}
