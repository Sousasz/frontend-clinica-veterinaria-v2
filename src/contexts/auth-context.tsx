'use client';

import { ReactNode, createContext, useState, useEffect, useContext } from 'react';
import jwtDecode from 'jwt-decode';

import { BACKEND_URL } from '@/lib/config';

type User = {
  id: string;
  username: string;
  role: string;
  documentId: string;
  dateOfBirth: string;
  phone: string;
  cep: string;
  addressNumber: string;
  addressComplement?: string;
  addressStreet: string;
  addressNeighborhood: string;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  loading: boolean;
  updateUser: (data: Partial<User>) => Promise<void>;
  login?: (token: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async (token: string) => {
      console.debug('[AuthProvider] fetchUserData start', { tokenSnippet: token?.slice?.(0, 10) });
      let attempts = 0;
      const maxAttempts = 2;
      while (attempts < maxAttempts) {
        attempts += 1;
        try {
          const response = await fetch(`${BACKEND_URL}/api/user/profile`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
              'Authorization': `Bearer ${token}`,
            },
          });

          console.debug('[AuthProvider] profile fetch status', { status: response.status, attempt: attempts });

          if (response.ok) {
            const userData = await response.json();
            console.debug('[AuthProvider] profile fetched', { userId: userData?.id });
            setUser(userData);
            return true;
          } else {
            // only clear session if token is invalid/unauthorized
            console.warn('[AuthProvider] profile fetch not ok', { status: response.status, attempt: attempts });
            if (response.status === 401) {
              console.warn('[AuthProvider] token invalid - logging out');
              logout();
              return false;
            }
            // transient error - if we will retry, wait briefly
            const body = await response.text().catch(() => '');
            console.debug('[AuthProvider] fetch non-ok body', { body: body.slice ? body.slice(0, 200) : body });
            if (attempts < maxAttempts) await new Promise(r => setTimeout(r, 300));
          }
        } catch (error) {
          console.error('[AuthProvider] fetchUserData error', { error, attempt: attempts });
          // network / fetch error — do not clear token, allow retry
          if (attempts < maxAttempts) await new Promise(r => setTimeout(r, 300));
        }
      }
      console.warn('[AuthProvider] fetchUserData failed after attempts, leaving token in storage for retry later');
      return false;
    };

    const init = async () => {
      if (typeof window === 'undefined') return;

      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode<Record<string, unknown>>(token);
        const decodedAny = decoded as Record<string, unknown>;
        // try to fetch profile; fetchUserData will not clear token unless 401
        const ok = await fetchUserData(token);
        // if profile fetch failed transiently, restore a minimal user object from token so UI stays logged
        if (!ok) {
          console.warn('[AuthProvider] profile fetch failed, restoring minimal user from token payload');
          // decoded may be { id, role } or { user: { id, role } }
          const userObj = decodedAny['user'] as Record<string, unknown> | undefined;
          const userId = (userObj?.['id'] as string | undefined) || (decodedAny['id'] as string | undefined);
          const role = (userObj?.['role'] as string | undefined) || (decodedAny['role'] as string | undefined) || 'user';
          setUser({ id: userId, username: '', role, documentId: '', dateOfBirth: '', phone: '', cep: '', addressNumber: '', addressStreet: '', addressNeighborhood: '' });
        }
      } catch (err: unknown) {
        // token not decodable: consider invalid — clear and stop
        const message = err instanceof Error ? err.message : String(err);
        console.error('Token decode failed:', message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setLoading(false);
  };

  const login = async (token: string) => {
    // store token and fetch profile
    try {
      if (!token) throw new Error('token missing');
      localStorage.setItem('token', token);
      setLoading(true);

      const response = await fetch(`${BACKEND_URL}/api/user/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error('Erro ao buscar perfil após login', response.status, response.statusText);
        if (response.status === 401) {
          logout();
        }
        return;
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token não encontrado");
      }

      const response = await fetch(`${BACKEND_URL}/api/user/profile`, {  // Use PATCH para update (ver abaixo)
        method: "PATCH",  // Mude para PATCH
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar usuário");
      }

      const updatedUser = await response.json();

      setUser((prev) => ({
        ...prev!,
        ...updatedUser,
      }));
    } catch (error) {
      console.error("Erro no updateUser:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading, updateUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}