'use client'

import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { MessageCircleWarning } from "lucide-react";
import { useEffect, useState } from "react";
import { BACKEND_URL } from '@/lib/config';
import { useAuth } from "@/contexts/auth-context";

interface BookingInputsProps {
  petName: string;
  onPetNameChange: (v: string) => void;
}

interface Pet {
  _id: string;
  name: string;
  species?: string;
  breed?: string;
  spayed?: boolean;
  neutered?: boolean; // backend may use 'neutered'
  sex?: string;
  weight?: number | string;
  temperament?: string;
}

export default function BookingInputs({ petName, onPetNameChange }: BookingInputsProps) {
  const { user } = useAuth();

  const [pets, setPets] = useState<Pet[]>([]);
  // petName agora vem do pai (BookingForm)
  const [specie, setSpecie] = useState("");
  const [breed, setBreed] = useState("");
  const [spayed, setSpayed] = useState<string | boolean>("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState<number | string>("");
  const [temperament, setTemperament] = useState("");

  // heurística leve para derivar atributos a partir do nome (mesma ideia do backend)
  const deriveAttributesFromName = (nome: string) => {
    if (!nome) return {};
    const name = nome.toLowerCase().trim();

    const dogs = ["rex", "fido", "bolt", "buddy", "max", "toto", "rocky"];
    const cats = ["luna", "miau", "whiskers", "cleo", "nina", "kitty", "garfield"];

    let especie = "Outro";
    if (dogs.some((d) => name.includes(d))) especie = "Cachorro";
    else if (cats.some((c) => name.includes(c))) especie = "Gato";

    let raca = "SRD";
    if (especie === "Cachorro") raca = "SRD";
    if (especie === "Gato") raca = "SRD";

    const castrado = /castrad(o|a)/i.test(name) ? true : false;

    let sexo = "Não Informado";
    if (/[aá]$/.test(name)) sexo = "Fêmea";
    else if (/[oó]$/.test(name) || /rex|max|buddy|rocky|bolt|fido/.test(name)) sexo = "Macho";

    let peso: number | null = null;
    if (especie === "Cachorro") peso = 12;
    else if (especie === "Gato") peso = 4;

    let temperamento = "Calmo";
    if (/rex|bolt|rocky|max/.test(name)) temperamento = "Alerta";
    if (/miau|kitty|luna/.test(name)) temperamento = "Carinhoso";

    return { especie, raca, castrado, sexo, peso, temperamento };
  };

  // busca pets do usuário para preencher caso já exista um com o nome
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) return;

    fetch(`${BACKEND_URL}/api/pets`, {
      headers: { 'x-auth-token': token }
    })
      .then(res => res.ok ? res.json() : [])
      .then((data) => {
        if (Array.isArray(data)) setPets(data);
      })
      .catch(() => setPets([]));
  }, [user]);

  useEffect(() => {
    if (!petName) {
      setSpecie("");
      setBreed("");
      setSpayed("");
      setSex("");
      setWeight("");
      setTemperament("");
      return;
    }

    // procura pet do usuário pelo nome exato (insensível a maiúsculas) ou por campo 'nome'
    const normalize = (s: string | undefined) =>
      (s || "")
        .toString()
        .toLowerCase()
        .trim();

    const normalizedPetName = normalize(petName);

    // primeiro tenta match exato usando name
    let found = pets.find(p => normalize(p.name) === normalizedPetName);

    // se não encontrou, tenta match por includes (ajuda com variações e espaços)
    if (!found && normalizedPetName) {
      found = pets.find(p => normalize(p.name).includes(normalizedPetName));
    }
    if (found) {
      // Usar campos em inglês (API /api/pets)
      const specieVal = found.species || "";
      const breedVal = found.breed || "";

      // spayed/neutered (backend may use 'neutered')
      const neuteredVal: boolean | "" = (typeof found.neutered === 'boolean')
        ? found.neutered
        : (typeof found.spayed === 'boolean' ? found.spayed : "");

      // sex
      let sexVal = "";
      if (found.sex) sexVal = found.sex === 'M' ? 'Macho' : (found.sex === 'F' ? 'Fêmea' : found.sex);

      // weight
      const rawWeight = found.weight !== undefined ? found.weight : undefined;
      let weightVal: number | string = "";
      if (rawWeight !== undefined && rawWeight !== null && String(rawWeight).trim() !== '') {
        // força número quando possível
        const asNum = Number(rawWeight);
        weightVal = !Number.isNaN(asNum) ? asNum : String(rawWeight);
      }

      const temperamentVal = found.temperament || "";

      setSpecie(specieVal);
      setBreed(breedVal);
      setSpayed(neuteredVal === "" ? "" : (neuteredVal ? 'Sim' : 'Não'));
      setSex(sexVal);
      setWeight(weightVal);
      setTemperament(temperamentVal);
      return;
    }

    // caso não exista pet cadastrado com este nome, deriva os atributos localmente
    const derived = deriveAttributesFromName(petName);
    setSpecie(derived.especie || "");
    setBreed(derived.raca || "");
    setSpayed(typeof derived.castrado === 'boolean' ? (derived.castrado ? 'Sim' : 'Não') : "");
    setSex(derived.sexo || "");
    setWeight(derived.peso ?? "");
    setTemperament(derived.temperamento || "");
  }, [petName, pets]);

  return (
    <div className="flex justify-center items-center gap-5 max-[550px]:flex-col">
      <div className="flex flex-col gap-5">
        <Alert className="bg-green-light border-white">
          <MessageCircleWarning />
          <AlertTitle>Adicione o nome do pet</AlertTitle>
          <AlertDescription>
            Insira o nome do animal para obtermos às informações
          </AlertDescription>
        </Alert>

        <section className="flex flex-col gap-3">
          <Input
            name="petname"
            placeholder="Nome do pet"
            value={petName}
            onChange={(e) => onPetNameChange((e.target as HTMLInputElement).value)}
          />
          <Input name="specie" placeholder="Espécie" value={specie} disabled />
          <Input name="breed" placeholder="Raça" value={breed} disabled />

          <div className="flex gap-2 max-[550px]:flex-col">
            <Input name="spayed" placeholder="Castrado?" value={String(spayed)} disabled />
            <Input name="male-or-female" placeholder="Sexo" value={sex} disabled />
          </div>

          <div className="flex gap-2 max-[550px]:flex-col">
            <Input name="weight" placeholder="Peso" value={String(weight)} disabled />
            <Input name="temperament" placeholder="Temperamento" value={temperament} disabled />
          </div>
        </section>
      </div>
    </div>
  );
}
