'use client'

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddVaccinesModal from "../add-vaccines";
import { FaCheck } from "react-icons/fa6";

import { useState, FormEvent, useEffect } from "react";
import { BACKEND_URL } from "@/lib/config";

import { GoPencil, GoTrash } from "react-icons/go";

type VaccineType = "for-dogs" | "for-cats";

type Vaccine = {
  id: string;
  vaccineName: string;
  description: string;
  vaccineType: VaccineType;
};

export default function EditVaccinesModal() {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);

  const [vaccineName, setVaccineName] = useState("");
  const [description, setDescription] = useState("");
  const [vaccineType, setVaccineType] = useState<VaccineType>(
    "for-dogs"
  );

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [tempName, setTempName] = useState("");

  function resetForm() {
    setVaccineName("");
    setDescription("");
    setVaccineType("for-dogs");
  }
  useEffect(() => {
    // carregar vacinas do backend
    fetch(`${BACKEND_URL}/api/vaccines`)
      .then((res) => res.json())
      .then((data: Array<{ _id: string; name: string; description?: string; type: VaccineType }>) => {
        const mapped = data.map((v) => ({
          id: v._id,
          vaccineName: v.name,
          description: v.description || "",
          vaccineType: v.type,
        }));
        setVaccines(mapped);
      })
      .catch((err) => console.error("Erro carregando vacinas:", err));
  }, []);

  async function addVacine(e: FormEvent) {
    e.preventDefault();

    const trimmedName = vaccineName.trim();
    if (!trimmedName) return;

    const duplicate = vaccines.some((v) => v.vaccineName === trimmedName);
    if (duplicate) return;

    try {
      const token = localStorage.getItem('token');
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        headers['x-auth-token'] = token;
      }

      const res = await fetch(`${BACKEND_URL}/api/vaccines`, {
        method: "POST",
        headers,
        body: JSON.stringify({ name: trimmedName, description, type: vaccineType }),
      });
      const result = await res.json();
      if (res.status === 201 && result.vaccine) {
        const newVaccine: Vaccine = {
          id: result.vaccine._id,
          vaccineName: result.vaccine.name,
          description: result.vaccine.description || "",
          vaccineType: result.vaccine.type,
        };
        setVaccines((prev) => [...prev, newVaccine]);
        // Dispara evento na mesma aba
        window.dispatchEvent(new Event('servicesUpdated'));
        // Notifica outras abas via localStorage
        localStorage.setItem('vaccinesUpdated', Date.now().toString());
        resetForm();
        try { (await import('@/lib/utils/toast')).showToast('Vacina adicionada', 'success'); } catch(_) {}
      } else {
        console.error("Falha criando vacina:", result);
        try { (await import('@/lib/utils/toast')).showToast('Falha ao criar vacina', 'error'); } catch(_) {}
      }
    } catch (err) {
      console.error("Erro ao criar vacina:", err);
      try { (await import('@/lib/utils/toast')).showToast('Erro ao criar vacina', 'error'); } catch(_) {}
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

      const res = await fetch(`${BACKEND_URL}/api/vaccines/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ name: tempName.trim() }),
      });
      const result = await res.json();
      if (res.status === 200 && result.vaccine) {
        setVaccines((prev) =>
          prev.map((v: Vaccine) =>
            v.id === id ? { ...v, vaccineName: result.vaccine.name } : v
          )
        );
        // Dispara evento na mesma aba
        window.dispatchEvent(new Event('servicesUpdated'));
        // Notifica outras abas via localStorage
        localStorage.setItem('vaccinesUpdated', Date.now().toString());
        try { (await import('@/lib/utils/toast')).showToast('Vacina atualizada', 'success'); } catch(_) {}
      } else {
        console.error("Falha atualizando vacina:", result);
        try { (await import('@/lib/utils/toast')).showToast('Falha ao atualizar vacina', 'error'); } catch(_) {}
      }
    } catch (err) {
      console.error("Erro ao atualizar vacina:", err);
      try { (await import('@/lib/utils/toast')).showToast('Erro ao atualizar vacina', 'error'); } catch(_) {}
    }
    setEditingItemId(null);
    setTempName("");
  }

  function cancelInlineEdit() {
    setEditingItemId(null);
    setTempName("");
  }

  async function deleteVacine(id: string) {
    try {
      const token = localStorage.getItem('token');
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        headers['x-auth-token'] = token;
      if (res.status === 200) {
        setVaccines((prev) => prev.filter((v) => v.id !== id));
        // Dispara evento na mesma aba
        window.dispatchEvent(new Event('servicesUpdated'));
        // Notifica outras abas via localStorage
        localStorage.setItem('vaccinesUpdated', Date.now().toString());
        if (editingItemId === id) cancelInlineEdit();
        try { (await import('@/lib/utils/toast')).showToast('Vacina removida', 'success'); } catch(_) {}
      } else {
        console.error("Falha removendo vacina:", result);
        try { (await import('@/lib/utils/toast')).showToast('Falha ao remover vacina', 'error'); } catch(_) {}
      } else {
        console.error("Falha removendo vacina:", result);
        try { (await import('@/lib/utils/toast')).showToast('Falha ao remover vacina', 'error'); } catch(_) {}
      }
    } catch (err) {
      console.error("Erro ao remover vacina:", err);
      try { (await import('@/lib/utils/toast')).showToast('Erro ao remover vacina', 'error'); } catch(_) {}
    }
  }

  function renderSection(title: string, type: VaccineType) {
    return (
      <div className="flex flex-col gap-2">
        <h4 className="font-bold text-2xl">{title}</h4>
        <div>
          <ul className="flex flex-col gap-3">
            {vaccines
              .filter((v) => v.vaccineType === type)
              .map((vaccine) => (
                <div key={vaccine.id} className="flex flex-col gap-1">
                  <div className="flex gap-4 justify-between items-center">
                    <li className="underline list-disc text-xl">
                      {editingItemId === vaccine.id ? (
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveInlineEdit(vaccine.id);
                            if (e.key === "Escape") cancelInlineEdit();
                          }}
                          autoFocus
                          className="border border-gray-400 rounded px-2 py-1"
                        />
                      ) : (
                        vaccine.vaccineName
                      )}
                    </li>

                    <div className="flex gap-3">
                      {editingItemId === vaccine.id ? (
                        <>
                          <button
                            onClick={() => saveInlineEdit(vaccine.id)}
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
                                vaccine.id,
                                vaccine.vaccineName
                              )
                            }
                            aria-label="Editar medicamento"
                            title="Editar"
                          >
                            <GoPencil className="size-5" />
                          </button>

                          <button
                            className="cursor-pointer"
                            onClick={() => deleteVacine(vaccine.id)}
                            aria-label="Remover medicamento"
                            title="Excluir"
                          >
                            <GoTrash className="size-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <p>{vaccine.description}</p>
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
          <DialogTitle>VACINAS</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-14">
          {renderSection("Para cães:", "for-dogs")}
          {renderSection("Para gatos:", "for-cats")}
        </div>

        <AddVaccinesModal
          addVaccine={addVacine}
          vaccineType={vaccineType}
          setDescription={setDescription}
          setVaccineName={setVaccineName}
          setVaccineType={setVaccineType}
        />
      </div>
    </DialogContent>
  );
}