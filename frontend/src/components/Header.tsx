import { useState } from 'react';
import { Search, Bell, Plus, User } from 'lucide-react';
import { CreateTopicModal } from './CreateTopicModal';
import logoImg from '../assets/logo.png';

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="bg-uerj-blue text-white sticky top-0 z-40 shadow-md py-12">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6 relative">
          
          {/* Container da Logo (Ancoragem e Espaço Reservado) */}
          <div className="relative min-w-[280px] h-12 flex items-center">
            <img 
              src={logoImg} 
              alt="Connect UERJ" 
              className="h-48 w-auto object-contain max-w-none absolute left-0 top-[52%] -translate-y-[44%] scale-140 origin-left hover:scale-145 transition-transform duration-200"
            />
          </div>

          {/* Barra de Busca Global */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200" />
              <input 
                type="text" 
                placeholder="Pesquisar dúvidas, disciplinas, estágios..."
                className="w-full bg-uerj-blue-dark/50 border border-white/10 text-white text-sm pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-uerj-yellow/50 transition-all placeholder:text-blue-200/70"
              />
            </div>
          </div>

          {/* Ações do Usuário */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-uerj-yellow hover:bg-uerj-yellow-hover text-uerj-blue-dark px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-colors whitespace-nowrap"
            >
              <Plus className="h-4 w-4 stroke-[3]" />
              <span>Novo Tópico</span>
            </button>

            <button className="p-2.5 text-blue-100 hover:bg-white/10 rounded-xl transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-uerj-yellow rounded-full ring-2 ring-uerj-blue" />
            </button>

            <button className="p-2 text-blue-100 hover:bg-white/10 rounded-xl transition-colors border border-white/20">
              <User className="h-5 w-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Modal de Criação de Tópico */}
      <CreateTopicModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}