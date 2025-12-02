
type Medicine = {
  name?: string;
  description?: string;
};

interface MedicinesFirstListProps {
  medicines: Medicine[];
}

export default function MedicinesFirstList({ medicines }: MedicinesFirstListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {medicines.map((medicine, idx) => (
        <div className="flex flex-col gap-1" key={idx}>
          <div className="flex gap-4 justify-between items-center">
            <li className="underline list-disc text-xl">{medicine.name}</li>
          </div>
          {medicine.description && <p>{medicine.description}</p>}
        </div>
      ))}
    </ul>
  );
}
