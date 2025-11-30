import { useState } from "react";
import EditableData from "@/components/shared/editable-data";
import Touchable from "@/components/ui/touchable";
import { formatToCPF, formatToCEP, formatToPhone } from "brazilian-values";
import { DialogClose } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/auth-context";

export default function UserDetails() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    documentId: user?.documentId || "",
    phone: user?.phone || "",
    cep: user?.cep || "",
    addressNumber: user?.addressNumber || "",
    addressComplement: user?.addressComplement || "",
    addressStreet: user?.addressStreet || "",
    addressNeighborhood: user?.addressNeighborhood || "",
  });

  // Função para salvar edições
  const handleSave = async () => {
    try {
      await updateUser(formData);
      setIsEditing(false);
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar dados. Tente novamente.");
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || "",
      documentId: user?.documentId || "",
      phone: user?.phone || "",
      cep: user?.cep || "",
      addressNumber: user?.addressNumber || "",
      addressComplement: user?.addressComplement || "",
      addressStreet: user?.addressStreet || "",
      addressNeighborhood: user?.addressNeighborhood || "",
    });
    
    setIsEditing(false);
  };

  if (!user) {
    return <p>Carregando dados do usuário...</p>;
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center font-poppins">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-4">

            <EditableData
              fieldLabel="CPF/RG"
              onChange={(value) => setFormData({ ...formData, documentId: value.replace(/\D/g, '') })}
            >
              {isEditing ? formData.documentId : formatToCPF(user.documentId)}
            </EditableData>

            <EditableData
              fieldLabel="Telefone"
              onChange={(value) => setFormData({ ...formData, phone: value.replace(/\D/g, '') })}
            >
              {isEditing ? formData.phone : formatToPhone(user.phone)}
            </EditableData>

            <EditableData
              fieldLabel="CEP"
              onChange={(value) => setFormData({ ...formData, cep: value.replace(/\D/g, '') })}
            >
              {isEditing ? formData.cep : formatToCEP(user.cep)}
            </EditableData>

            <EditableData
              fieldLabel="Número"
              onChange={(value) => setFormData({ ...formData, addressNumber: value })}
            >
              {isEditing ? formData.addressNumber : user.addressNumber}
            </EditableData>

            <EditableData
              fieldLabel="Complemento"
              onChange={(value) => setFormData({ ...formData, addressComplement: value })}
            >
              {isEditing ? formData.addressComplement : user.addressComplement || ""}
            </EditableData>

            <EditableData
              fieldLabel="Endereço"
              onChange={(value) => setFormData({ ...formData, addressStreet: value })}
            >
              {isEditing ? formData.addressStreet : user.addressStreet}
            </EditableData>

            <EditableData
              fieldLabel="Bairro"
              onChange={(value) => setFormData({ ...formData, addressNeighborhood: value })}
            >
              {isEditing ? formData.addressNeighborhood : user.addressNeighborhood}
            </EditableData>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        {isEditing ? (
          <>
            <Touchable onClick={handleSave}>Salvar</Touchable>
            <Touchable onClick={handleCancel}>Cancelar</Touchable>
          </>
        ) : (
          <Touchable onClick={() => setIsEditing(true)}>Editar</Touchable>
        )}
      </div>

      <DialogClose asChild>
        <Touchable>Fechar</Touchable>
      </DialogClose>
    </div>
  );
}