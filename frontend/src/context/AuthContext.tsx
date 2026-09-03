import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Usuario, type LoginData, type CadastroData, loginUsuario, cadastrarUsuario } from '../services/api';

interface AuthContextType {
  usuario: Usuario | null;
  estaAutenticado: boolean;
  carregando: boolean;
  login: (dados: LoginData) => Promise<void>;
  cadastrar: (dados: CadastroData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = '@connect_uerj:usuario';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Recupera a sessão salva no recarregamento da página
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem(STORAGE_KEY);
    if (usuarioSalvo) {
      try {
        setUsuario(JSON.parse(usuarioSalvo));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setCarregando(false);
  }, []);

  const login = async (dados: LoginData) => {
    const usuarioLogado = await loginUsuario(dados);
    setUsuario(usuarioLogado);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarioLogado));
  };

  const cadastrar = async (dados: CadastroData) => {
    const novoUsuario = await cadastrarUsuario(dados);
    setUsuario(novoUsuario);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novoUsuario));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        estaAutenticado: !!usuario,
        carregando,
        login,
        cadastrar,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
}