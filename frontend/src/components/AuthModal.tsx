import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Loader2 } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#1E1E1E] p-6 shadow-2xl border border-slate-100 dark:border-[#2F2F2F] text-slate-900 dark:text-zinc-100 transition-colors my-8">
        
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          type="button"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Abas Alternadoras */}
        <div className="flex border-b border-slate-200 dark:border-zinc-700 mb-6 mt-1">
          <button
            type="button"
            className={`flex-1 pb-3 text-center text-sm font-bold transition-colors cursor-pointer ${
              modo === 'login'
                ? 'border-b-2 border-uerj-blue text-uerj-blue dark:border-yellow-400 dark:text-yellow-400'
                : 'text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300'
            }`}
            onClick={() => handleMudarModo('login')}
          >
            Entrar
          </button>
          <button
            type="button"
            className={`flex-1 pb-3 text-center text-sm font-bold transition-colors cursor-pointer ${
              modo === 'cadastro'
                ? 'border-b-2 border-uerj-blue text-uerj-blue dark:border-yellow-400 dark:text-yellow-400'
                : 'text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300'
            }`}
            onClick={() => handleMudarModo('cadastro')}
          >
            Cadastrar
          </button>
        </div>

        {/* Mensagem de Erro */}
        {erro && (
          <div className="mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 p-3 text-xs text-rose-700 dark:text-rose-300">
            {erro}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {modo === 'cadastro' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-200 mb-1.5">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Pedro Henrique"
                  className="w-full rounded-xl bg-slate-50 dark:bg-[#242424] border border-slate-200 dark:border-zinc-700 px-3.5 py-2 text-xs text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-uerj-blue dark:focus:ring-yellow-400 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-200 mb-1.5">
                    Matrícula
                  </label>
                  <input
                    type="text"
                    required
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    placeholder="Ex: 2022100000"
                    className="w-full rounded-xl bg-slate-50 dark:bg-[#242424] border border-slate-200 dark:border-zinc-700 px-3.5 py-2 text-xs text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-uerj-blue dark:focus:ring-yellow-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-200 mb-1.5">
                    Curso
                  </label>
                  <input
                    type="text"
                    required
                    value={curso}
                    onChange={(e) => setCurso(e.target.value)}
                    placeholder="Ex: Ciência da Computação"
                    className="w-full rounded-xl bg-slate-50 dark:bg-[#242424] border border-slate-200 dark:border-zinc-700 px-3.5 py-2 text-xs text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-uerj-blue dark:focus:ring-yellow-400 transition-all"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-zinc-200 mb-1.5">
              E-mail Institucional ou Pessoal
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aluno@uerj.br"
              className="w-full rounded-xl bg-slate-50 dark:bg-[#242424] border border-slate-200 dark:border-zinc-700 px-3.5 py-2 text-xs text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-uerj-blue dark:focus:ring-yellow-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-zinc-200 mb-1.5">
              Senha
            </label>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl bg-slate-50 dark:bg-[#242424] border border-slate-200 dark:border-zinc-700 px-3.5 py-2 text-xs text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-uerj-blue dark:focus:ring-yellow-400 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full mt-3 rounded-xl bg-uerj-blue hover:bg-uerj-blue-dark dark:bg-yellow-400 dark:hover:bg-yellow-300 dark:text-zinc-950 py-2.5 font-bold text-xs text-white disabled:opacity-50 transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            {carregando && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>
              {carregando
                ? 'Processando...'
                : modo === 'login'
                ? 'Acessar Conta'
                : 'Concluir Cadastro'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};