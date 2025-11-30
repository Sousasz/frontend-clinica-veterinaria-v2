"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddMedicinesModal from "../add-medicines";
import { FaCheck } from "react-icons/fa6";

import { useState, FormEvent } from "react";
import { v4 } from "uuid";

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

  function addMedicine(e: FormEvent) {
    e.preventDefault();

    const trimmedName = medicineName.trim();
    if (!trimmedName) return;

    const duplicate = medicines.some((m) => m.medicineName === trimmedName);
    if (duplicate) return;

    const newMedicine: Medicine = {
      id: v4(),
      medicineName: trimmedName,
      description,
      medicineType,
    };

    setMedicines((prev) => [...prev, newMedicine]);
    resetForm();
  }

  function startInlineEditing(id: string, currentName: string) {
    setEditingItemId(id);
    setTempName(currentName);
  }

  function saveInlineEdit(id: string) {
    if (!tempName.trim()) return;
    setMedicines((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, medicineName: tempName.trim() } : m
      )
    );
    setEditingItemId(null);
    setTempName("");
  }

  function cancelInlineEdit() {
    setEditingItemId(null);
    setTempName("");
  }

  function deleteMedicine(id: string) {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
    if (editingItemId === id) cancelInlineEdit();
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
