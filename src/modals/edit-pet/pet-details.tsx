import Touchable from "@/components/ui/touchable";
import EditableData from "@/components/shared/editable-data";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function PetDetails() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center font-poppins">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-4">
            <EditableData fieldLabel="Nome">Amora</EditableData>

            <EditableData fieldLabel="Espécie">Cachorro</EditableData>

            <EditableData fieldLabel="Raça">Pastor alemão</EditableData>

            <EditableData fieldLabel="Data de nascimento">
              {format("12/12/2025", "dd/MM/yyyy", {
                locale: ptBR,
              })}
            </EditableData>

            <EditableData fieldLabel="Castrado?">Sim</EditableData>

            <EditableData fieldLabel="Sexo?">M</EditableData>

            <EditableData fieldLabel="Peso">38.5</EditableData>

            <EditableData fieldLabel="Temperamento">Equilibrado</EditableData>
          </div>
        </div>
      </div>

      <Touchable>Concluído</Touchable>
    </div>
  );
}
