import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, cadastrar } = useAuth();
  const [modo, setModo] = useState<'login' | 'cadastro'>('login');
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  // Estados dos campos
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [curso, setCurso] = useState('');

  if (!isOpen) return null;

  const limparCampos = () => {
    setNome('');
    setEmail('');
    setMatricula('');
    setSenha('');
    setCurso('');
    setErro(null);
  };

  const handleMudarModo = (novoModo: 'login' | 'cadastro') => {
    setModo(novoModo);
    setErro(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    try {
      if (modo === 'login') {
        await login({ email, senha });
      } else {
        await cadastrar({
          nome,
          email,
          matricula,
          senha,
          curso,
        });
      }
      limparCampos();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro('Ocorreu um erro inesperado.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-[#1e2330] p-6 shadow-2xl border border-gray-700/50 text-white">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          type="button"
        >
          ✕
        </button>

        {/* Abas Alternadoras */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            type="button"
            className={`flex-1 pb-3 text-center font-semibold transition-colors ${
              modo === 'login'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => handleMudarModo('login')}
          >
            Entrar
          </button>
          <button
            type="button"
            className={`flex-1 pb-3 text-center font-semibold transition-colors ${
              modo === 'cadastro'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => handleMudarModo('cadastro')}
          >
            Cadastrar
          </button>
        </div>

        {/* Mensagem de Erro */}
        {erro && (
          <div className="mb-4 rounded-lg bg-red-500/20 border border-red-500/50 p-3 text-sm text-red-300">
            {erro}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {modo === 'cadastro' && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Pedro Henrique"
                  className="w-full rounded-lg bg-[#2a3042] border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Matrícula</label>
                  <input
                    type="text"
                    required
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    placeholder="Ex: 2022100000"
                    className="w-full rounded-lg bg-[#2a3042] border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Curso</label>
                  <input
                    type="text"
                    required
                    value={curso}
                    onChange={(e) => setCurso(e.target.value)}
                    placeholder="Ex: Ciência da Computação"
                    className="w-full rounded-lg bg-[#2a3042] border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aluno@uerj.br"
              className="w-full rounded-lg bg-[#2a3042] border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Senha</label>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg bg-[#2a3042] border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full mt-2 rounded-lg bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-md"
          >
            {carregando
              ? 'Processando...'
              : modo === 'login'
              ? 'Acessar Conta'
              : 'Concluir Cadastro'}
          </button>
        </form>
      </div>
    </div>
  );
};