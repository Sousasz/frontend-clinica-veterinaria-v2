'use client'

import { useState } from "react";
import { BACKEND_URL } from '@/lib/config';
import { Input } from "@/components/ui/input";
import Touchable from "@/components/ui/touchable";

export default function SignUpPetForm() {
  // Estados para os campos do formulário
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    neutered: false, // Boolean
    sex: "", // 'M' ou 'F'
    weight: "",
    temperament: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Função para atualizar os campos
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validação básica
    if (
      !formData.name ||
      !formData.species ||
      !formData.breed ||
      !formData.age ||
      !formData.sex ||
      !formData.weight ||
      !formData.temperament
    ) {
      setError("Todos os campos são obrigatórios.");
      setLoading(false);
      return;
    }
    
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Usuário não autenticado. Faça login primeiro.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/pets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Pet cadastrado com sucesso!");
        setFormData({
          name: "",
          species: "",
          breed: "",
          age: "",
          neutered: false,
          sex: "",
          weight: "",
          temperament: "",
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erro ao cadastrar pet.");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[60%]">
        {error && <p className="text-red-500">{error}</p>}

        <Input
          name="name"
          placeholder="Nome completo"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          name="species"
          placeholder="Espécie"
          value={formData.species}
          onChange={handleChange}
          required
        />
        <Input
          name="breed"
          placeholder="Raça"
          value={formData.breed}
          onChange={handleChange}
          required
        />
        <Input
          name="age"
          placeholder="Idade"
          type="number"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <select
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive font-poppins rounded-full shadow-lg w-full"
          required
        >
          <option value="">Sexo</option>
          <option value="M">Macho</option>
          <option value="F">Fêmea</option>
        </select>

        <Input
          name="weight"
          placeholder="Peso (kg)"
          type="number"
          value={formData.weight}
          onChange={handleChange}
          required
        />
        <Input
          name="temperament"
          placeholder="Temperamento"
          value={formData.temperament}
          onChange={handleChange}
          required
        />

        <label>
          <input
            type="checkbox"
            name="neutered"
            checked={formData.neutered}
            onChange={handleChange}
          />
          <span className="mx-2">
            Castrado?
          </span>
        </label>

        <Touchable type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Concluído"}
        </Touchable>
      </form>
    </div>
  );
}
