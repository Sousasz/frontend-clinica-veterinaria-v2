import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Touchable from "@/components/ui/touchable";
import { ChangeEvent, FormEvent } from "react";

type VacineType = "for-dogs" | "for-cats";

type AddVaccinesFormProps = {
  addVaccine: (e: FormEvent) => void;
  setVaccineName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  vaccineType: string;
  setVaccineType: React.Dispatch<React.SetStateAction<VacineType>>;
};

export default function AddVaccinesForm({
  addVaccine,
  setVaccineName,
  setDescription,
  vaccineType,
  setVaccineType,
}: AddVaccinesFormProps) {
  return (
    <form onSubmit={addVaccine} className="flex flex-col gap-7">
      <div className="flex flex-col gap-5">
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setVaccineName(e.target.value)
          }
          placeholder="Nome do medicamento"
        />
        <Textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição breve"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <input
            type="radio"
            name="vacine-type"
            value="for-dogs"
            checked={vaccineType === 'for-dogs'}
            onChange={(e) => setVaccineType(e.target.value as VacineType)}
          />
          <label htmlFor="for-dogs">
            Para cães
          </label>
        </div>

        <div className="flex items-center gap-1">
          <input
            type="radio"
            name="vacine-type"
            value="for-cats"
            checked={vaccineType === 'for-cats'}
            onChange={(e) => setVaccineType(e.target.value as VacineType)}
          />
          <label htmlFor="for-cats">Para gatos</label>
        </div>
      </div>

      <Touchable>Adicionar</Touchable>
    </form>
  );
}