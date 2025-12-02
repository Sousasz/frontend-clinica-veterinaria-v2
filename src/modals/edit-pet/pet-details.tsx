import { useState, useEffect } from "react";
import Touchable from "@/components/ui/touchable";
import EditableData from "@/components/shared/editable-data";
import { DialogClose } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/auth-context";
import { BACKEND_URL } from "@/lib/config";
import { showToast } from "@/lib/utils/toast";

type Pet = {
  _id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  neutered: boolean;
  sex: string;
  weight: number;
  temperament: string;
};

export default function PetDetails() {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[] | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, Partial<Pet>>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch(`${BACKEND_URL}/api/pets`, {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          console.error("Erro ao buscar pets", res.statusText);
          return;
        }
        const data = await res.json();
        setPets(data || []);
        // initialize form state
        const initial: Record<string, Partial<Pet>> = {};
        (data || []).forEach((p: Pet) => {
          initial[p._id] = { ...p };
        });
        setForm(initial);
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      }
    };

    if (typeof window !== "undefined") fetchPets();
  }, [user]);

  if (!user) return <p>Carregando dados do usuário...</p>;

  const handleStartEdit = (id: string) => {
    setEditingId(id);
  };

  const handleCancel = (id: string) => {
    // reset form for this pet to original
    setForm((prev) => ({ ...prev, [id]: { ...(pets?.find((p) => p._id === id) as Pet) } }));
    setEditingId(null);
  };

  const handleSave = async (id: string) => {
    const payload = form[id];
    if (!payload) return;
    setLoadingId(id);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const res = await fetch(`${BACKEND_URL}/api/pets/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Erro ao salvar pet:", res.status, text);
        try { showToast('Erro ao salvar pet. Tente novamente.', 'error'); } catch(_) {}
        return;
      }

      const updated = await res.json();
      setPets((prev) => (prev ? prev.map((p) => (p._id === id ? updated.pet : p)) : prev));
      setEditingId(null);
      try { showToast('Pet atualizado com sucesso!', 'success'); } catch(_) {}
    } catch (error) {
      console.error("Erro ao atualizar pet:", error);
    } finally {
      setLoadingId(null);
    }
  };

  if (!pets) return <p>Carregando pets...</p>;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3 w-full">
        {pets.length === 0 && <p>Nenhum pet cadastrado.</p>}

        {pets.map((pet) => {
          const pForm = form[pet._id] || { ...pet };
          const isEditing = editingId === pet._id;
          return (
            <div key={pet._id} className="border rounded p-4 mb-4">
              <div className="flex flex-col gap-4">
                <EditableData
                  fieldLabel="Nome"
                  editing={isEditing}
                  onChange={(v) => setForm((prev) => ({ ...prev, [pet._id]: { ...prev[pet._id], name: v } }))}
                >
                  {pForm.name || ""}
                </EditableData>

                <EditableData
                  fieldLabel="Espécie"
                  editing={isEditing}
                  onChange={(v) => setForm((prev) => ({ ...prev, [pet._id]: { ...prev[pet._id], species: v } }))}
                >
                  {pForm.species || ""}
                </EditableData>

                <EditableData
                  fieldLabel="Raça"
                  editing={isEditing}
                  onChange={(v) => setForm((prev) => ({ ...prev, [pet._id]: { ...prev[pet._id], breed: v } }))}
                >
                  {pForm.breed || ""}
                </EditableData>

                <EditableData
                  fieldLabel="Idade"
                  editing={isEditing}
                  onChange={(v) => setForm((prev) => ({ ...prev, [pet._id]: { ...prev[pet._id], age: Number(v) } }))}
                >
                  {String(pForm.age ?? "")}
                </EditableData>

                <EditableData
                  fieldLabel="Castrado?"
                  editing={isEditing}
                  onChange={(v) => setForm((prev) => ({ ...prev, [pet._id]: { ...prev[pet._id], neutered: v.toLowerCase() === 'sim' || v.toLowerCase() === 'true' } }))}
                >
                  {pet.neutered ? "Sim" : "Não"}
                </EditableData>

                <EditableData
                  fieldLabel="Sexo"
                  editing={isEditing}
                  onChange={(v) => setForm((prev) => ({ ...prev, [pet._id]: { ...prev[pet._id], sex: v } }))}
                >
                  {pForm.sex || ""}
                </EditableData>

                <EditableData
                  fieldLabel="Peso"
                  editing={isEditing}
                  onChange={(v) => setForm((prev) => ({ ...prev, [pet._id]: { ...prev[pet._id], weight: Number(v) } }))}
                >
                  {String(pForm.weight ?? "")}
                </EditableData>

                <EditableData
                  fieldLabel="Temperamento"
                  editing={isEditing}
                  onChange={(v) => setForm((prev) => ({ ...prev, [pet._id]: { ...prev[pet._id], temperament: v } }))}
                >
                  {pForm.temperament || ""}
                </EditableData>
              </div>

              <div className="flex gap-4 justify-end mt-4">
                {isEditing ? (
                  <>
                    <Touchable onClick={() => handleSave(pet._id)} disabled={loadingId === pet._id}>
                      {loadingId === pet._id ? 'Salvando...' : 'Salvar'}
                    </Touchable>
                    <Touchable onClick={() => handleCancel(pet._id)}>Cancelar</Touchable>
                  </>
                ) : (
                  <Touchable onClick={() => handleStartEdit(pet._id)}>Editar</Touchable>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <DialogClose asChild>
        <Touchable>Fechar</Touchable>
      </DialogClose>
    </div>
  );
}
