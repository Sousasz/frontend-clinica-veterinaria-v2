
type Vaccine = {
  name: string;
  description?: string;
  category?: string; // "cães" ou "gatos"
};

interface VaccinesListProps {
  vaccines: Vaccine[];
}

export default function VaccinesList({ vaccines }: VaccinesListProps) {
  const dogs = vaccines.filter(v => v.type === "for-dogs");
  const cats = vaccines.filter(v => v.type === "for-cats");
  return (
    <div className="flex flex-col gap-12">
      <ul className="flex flex-col gap-0.5">
        <h4 className="font-bold text-2xl">Para cães:</h4>
        <div className="flex flex-col gap-1 mx-4">
          {dogs.map((vaccine, idx) => (
            <div className="flex flex-col" key={idx}>
              <li className="underline list-disc text-xl">{vaccine.name}</li>
              {vaccine.description && <p>{vaccine.description}</p>}
            </div>
          ))}
        </div>
      </ul>

      <ul className="flex flex-col">
        <h4 className="font-bold text-2xl">Para gatos:</h4>
        <div className="flex flex-col gap-1 mx-4">
          {cats.map((vaccine, idx) => (
            <div key={idx}>
              <li className="underline list-disc text-xl">{vaccine.name}</li>
              {vaccine.description && <p>{vaccine.description}</p>}
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}
