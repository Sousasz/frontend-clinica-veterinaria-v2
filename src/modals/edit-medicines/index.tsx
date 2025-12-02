"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddMedicinesModal from "../add-medicines";
import { FaCheck } from "react-icons/fa6";

import { useState, FormEvent, useEffect } from "react";
import { BACKEND_URL } from "@/lib/config";

import { GoPencil, GoTrash } from "react-icons/go";

type MedicineType = "injectables-medicines" | "no-injectables-medicines";

type Medicine = {
  id: string;
  medicineName: string;
  description: string;
  medicineType: MedicineType;
};

export default function EditMedicinesModal() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  const [medicineName, setMedicineName] = useState("");
  const [description, setDescription] = useState("");
  const [medicineType, setMedicineType] = useState<MedicineType>(
    "no-injectables-medicines"
  );

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [tempName, setTempName] = useState("");

  function resetForm() {
    setMedicineName("");
    setDescription("");
    setMedicineType("no-injectables-medicines");
  }

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/medicines`)
      .then((res) => res.json())
      .then((data) => {
        type FetchedMed = { _id?: string; name?: string; description?: string; type?: MedicineType };
        const mapped = (Array.isArray(data) ? data as FetchedMed[] : []).map((m) => ({
          id: m._id || '',
          medicineName: m.name || '',
          description: m.description || "",
          medicineType: (m.type as MedicineType) || 'no-injectables-medicines',
        }));
        setMedicines(mapped);
      })
      .catch((err) => console.error("Erro carregando medicamentos:", err));
  }, []);

  async function addMedicine(e: FormEvent) {
    e.preventDefault();

    const trimmedName = medicineName.trim();
    if (!trimmedName) return;

    const duplicate = medicines.some((m) => m.medicineName === trimmedName);
    if (duplicate) return;

    try {
      const token = localStorage.getItem('token');
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        headers['x-auth-token'] = token;
      }

      const res = await fetch(`${BACKEND_URL}/api/medicines`, {
        method: "POST",
        headers,
        body: JSON.stringify({ name: trimmedName, description, type: medicineType }),
      });
      const result = await res.json();
      if (res.status === 201 && result.medicine) {
        const newMed: Medicine = {
          id: result.medicine._id,
          medicineName: result.medicine.name,
          description: result.medicine.description || "",
          medicineType: result.medicine.type,
        };
        setMedicines((prev) => [...prev, newMed]);
        // Dispara evento na mesma aba
        window.dispatchEvent(new Event('servicesUpdated'));
        // Notifica outras abas via localStorage
        localStorage.setItem('medicinesUpdated', Date.now().toString());
        resetForm();
        try { (await import('@/lib/utils/toast')).showToast('Medicamento adicionado', 'success'); } catch(_) {}
      } else {
        console.error("Falha criando medicamento:", result);
        try { (await import('@/lib/utils/toast')).showToast('Falha ao criar medicamento', 'error'); } catch(_) {}
      }
    } catch (err) {
      console.error("Erro ao criar medicamento:", err);
      try { (await import('@/lib/utils/toast')).showToast('Erro ao criar medicamento', 'error'); } catch(_) {}
    }
  }

  function startInlineEditing(id: string, currentName: string) {
    setEditingItemId(id);
    setTempName(currentName);
  }

  async function saveInlineEdit(id: string) {
    if (!tempName.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        headers['x-auth-token'] = token;
      }
      const res = await fetch(`${BACKEND_URL}/api/medicines/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ name: tempName.trim() }),
      });
      const result = await res.json();
      if (res.status === 200 && result.medicine) {
        setMedicines((prev) => prev.map((m) => (m.id === id ? { ...m, medicineName: result.medicine.name } : m)));
        // Dispara evento na mesma aba
        window.dispatchEvent(new Event('servicesUpdated'));
        // Notifica outras abas via localStorage
        localStorage.setItem('medicinesUpdated', Date.now().toString());
        try { (await import('@/lib/utils/toast')).showToast('Medicamento atualizado', 'success'); } catch(_) {}
      } else {
        console.error("Falha atualizando medicamento:", result);
        try { (await import('@/lib/utils/toast')).showToast('Falha ao atualizar medicamento', 'error'); } catch(_) {}
      }
    } catch (err) {
      console.error("Erro ao atualizar medicamento:", err);
      try { (await import('@/lib/utils/toast')).showToast('Erro ao atualizar medicamento', 'error'); } catch(_) {}
    }
    setEditingItemId(null);
    setTempName("");
  }

  function cancelInlineEdit() {
    setEditingItemId(null);
    setTempName("");
  }

  async function deleteMedicine(id: string) {
    try {
      const token = localStorage.getItem('token');
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        headers['x-auth-token'] = token;
      if (res.status === 200) {
        setMedicines((prev) => prev.filter((m) => m.id !== id));
        // Dispara evento na mesma aba
        window.dispatchEvent(new Event('servicesUpdated'));
        // Notifica outras abas via localStorage
        localStorage.setItem('medicinesUpdated', Date.now().toString());
        if (editingItemId === id) cancelInlineEdit();
        try { (await import('@/lib/utils/toast')).showToast('Medicamento removido', 'success'); } catch(_) {}
      } else {
        console.error("Falha removendo medicamento:", result);
        try { (await import('@/lib/utils/toast')).showToast('Falha ao remover medicamento', 'error'); } catch(_) {}
      } else {
        console.error("Falha removendo medicamento:", result);
        try { (await import('@/lib/utils/toast')).showToast('Falha ao remover medicamento', 'error'); } catch(_) {}
      }
    } catch (err) {
      console.error("Erro ao remover medicamento:", err);
      try { (await import('@/lib/utils/toast')).showToast('Erro ao remover medicamento', 'error'); } catch(_) {}
    }
  }

  function renderSection(title: string, type: MedicineType) {
    return (
      <div className="flex flex-col gap-2">
        <h4 className="font-bold text-2xl">{title}</h4>
        <div>
          <ul className="flex flex-col gap-3">
            {medicines
              .filter((m) => m.medicineType === type)
              .map((medicine) => (
                <div key={medicine.id} className="flex flex-col gap-1">
                  <div className="flex gap-4 justify-between items-center">
                    <li className="underline list-disc text-xl">
                      {editingItemId === medicine.id ? (
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveInlineEdit(medicine.id);
                            if (e.key === "Escape") cancelInlineEdit();
                          }}
                          autoFocus
                          className="border border-gray-400 rounded px-2 py-1"
                        />
                      ) : (
                        medicine.medicineName
                      )}
                    </li>

                    <div className="flex gap-3">
                      {editingItemId === medicine.id ? (
                        <>
                          <button
                            onClick={() => saveInlineEdit(medicine.id)}
                            title="Salvar"
                          >
                            <FaCheck />
                          </button>
                          <button onClick={cancelInlineEdit} title="Cancelar">
                            ✖
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="cursor-pointer"
                            onClick={() =>
                              startInlineEditing(
                                medicine.id,
                                medicine.medicineName
                              )
                            }
                            aria-label="Editar medicamento"
                            title="Editar"
                          >
                            <GoPencil className="size-5" />
                          </button>

                          <button
                            className="cursor-pointer"
                            onClick={() => deleteMedicine(medicine.id)}
                            aria-label="Remover medicamento"
                            title="Excluir"
                          >
                            <GoTrash className="size-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <p>{medicine.description}</p>
                </div>
              ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <DialogContent className="sm:max-w-[90%] shadow-default h-[90%] bg-green-light font-poppins bg-[url('/background-image.webp')] bg-cover bg-center bg-no-repeat">
      <div className="backdrop-blur-md bg-white/25 shadow-2xl p-10 rounded-lg flex flex-col gap-10 overflow-y-auto scrollbar-hide">
        <DialogHeader className="max-w-full flex items-center">
          <DialogTitle>MEDICAMENTOS</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-14">
          {renderSection("Não injetáveis:", "no-injectables-medicines")}
          {renderSection("Injetáveis:", "injectables-medicines")}
        </div>

        <AddMedicinesModal
          addMedicine={addMedicine}
          medicineType={medicineType}
          setDescription={setDescription}
          setMedicineName={setMedicineName}
          setMedicineType={setMedicineType}
        />
      </div>
    </DialogContent>
  );
}
