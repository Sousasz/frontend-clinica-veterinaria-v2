"use client";

import { useState } from "react";
import MaskedInput from "../masked-input";
import { Pencil } from "lucide-react";

interface EditableDataProps {
  fieldLabel: string;
  children: string;
  mask?: string;
  onChange?: (value: string) => void;
}

export default function EditableData({
  fieldLabel,
  children,
  onChange,
  mask,
}: EditableDataProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(children);

  function handleSave() {
    setIsEditing(false);
    if (onChange) onChange(value);
  }

  return (
    <div className="flex items-center gap-1">
      <label className=" font-semibold text-zinc-800">
        {fieldLabel}:
      </label>

      {isEditing ? (
        <MaskedInput
          type="text"
          mask={mask}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          autoFocus
          onBlur={handleSave}
          onChange={(e) => setValue(e.target.value ?? "")}
        />
      ) : (
        <>
          <span className="cursor-pointer px-2 py-1 rounded hover:bg-gray-100">
            {value || "—"}
          </span>

          <button onClick={() => setIsEditing(true)} className="cursor-pointer">
            <Pencil />
          </button>
        </>
      )}
    </div>
  );
}
