import { useState } from 'react';

interface CepData {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface UseCepSearchReturn {
  loading: boolean;
  error: string | null;
  fetchAddressFromCep: (cep: string) => Promise<CepData | null>;
}

export function useCepSearch(): UseCepSearchReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddressFromCep = async (cep: string): Promise<CepData | null> => {
    setLoading(true);
    setError(null);

    try {
      // Remove caracteres não numéricos
      const cleanCep = cep.replace(/\D/g, '');

      // Valida se tem 8 dígitos
      if (cleanCep.length !== 8) {
        setError('CEP deve ter 8 dígitos');
        setLoading(false);
        return null;
      }

      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);

      if (!response.ok) {
        throw new Error('Erro ao buscar CEP');
      }

      const data = await response.json();

      // Verifica se o CEP é válido (ViaCEP retorna "erro": true para CEP inválido)
      if (data.erro) {
        setError('CEP não encontrado');
        setLoading(false);
        return null;
      }

      const addressData: CepData = {
        street: data.logradouro || '',
        neighborhood: data.bairro || '',
        city: data.localidade || '',
        state: data.uf || '',
      };

      setLoading(false);
      return addressData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      setLoading(false);
      return null;
    }
  };

  return {
    loading,
    error,
    fetchAddressFromCep,
  };
}
