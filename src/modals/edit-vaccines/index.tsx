'use client'

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddVaccinesModal from "../add-vaccines";
import { FaCheck } from "react-icons/fa6";

import { useState, FormEvent } from "react";
import { v4 } from "uuid";

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

  function addVacine(e: FormEvent) {
    e.preventDefault();

    const trimmedName = vaccineName.trim();
    if (!trimmedName) return;

    const duplicate = vaccines.some((v) => v.vaccineName === trimmedName);
    if (duplicate) return;

    const newVaccine: Vaccine = {
      id: v4(),
      vaccineName: trimmedName,
      description,
      vaccineType,
    };

    setVaccines((prev) => [...prev, newVaccine]);
    resetForm();
  }

  function startInlineEditing(id: string, currentName: string) {
    setEditingItemId(id);
    setTempName(currentName);
  }

  function saveInlineEdit(id: string) {
    if (!tempName.trim()) return;
    setVaccines((prev) =>
      prev.map((v: Vaccine) =>
        v.id === id ? { ...v, vacineName: tempName.trim() } : v
      )
    );
    setEditingItemId(null);
    setTempName("");
  }

  function cancelInlineEdit() {
    setEditingItemId(null);
    setTempName("");
  }

  function deleteVacine(id: string) {
    setVaccines((prev) => prev.filter((v) => v.id !== id));
    if (editingItemId === id) cancelInlineEdit();
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