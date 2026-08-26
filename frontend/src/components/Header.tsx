import { Search, Bell, Plus, User } from 'lucide-react';
import logoImg from '../assets/logo.png';

interface HeaderProps {
  onOpenNewTopic: () => void;
  onOpenProfile: () => void;
  onGoToFeed: () => void;
}

export function Header({ onOpenNewTopic, onOpenProfile, onGoToFeed }: HeaderProps) {
  return (
    <header className="bg-uerj-blue text-white sticky top-0 z-40 shadow-md py-12">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6 relative">
        
        {/* Container da Logo Grande (Original com bloqueio de cliques fantasmas) */}
        <div 
          onClick={onGoToFeed}
          className="relative min-w-[280px] h-12 flex items-center cursor-pointer group select-none"
        >
          <img 
            src={logoImg} 
            alt="Connect UERJ" 
            className="h-48 w-auto object-contain max-w-none absolute left-0 top-[52%] -translate-y-[44%] scale-140 origin-left group-hover:scale-145 transition-transform duration-200 pointer-events-none"
          />
        </div>

        {/* Barra de Busca Global */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
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
          
          {/* Botão Novo Tópico */}
          <button 
            onClick={onOpenNewTopic}
            className="flex items-center gap-2 bg-uerj-yellow hover:bg-uerj-yellow-hover text-uerj-blue-dark px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-colors whitespace-nowrap cursor-pointer"
          >
            <Plus className="h-4 w-4 stroke-[3]" />
            <span className="hidden sm:inline">Novo Tópico</span>
          </button>

          {/* Notificações */}
          <button className="p-2.5 text-blue-100 hover:bg-white/10 rounded-xl transition-colors relative cursor-pointer">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-uerj-yellow rounded-full ring-2 ring-uerj-blue" />
          </button>

          {/* Botão Perfil do Usuário */}
          <button 
            onClick={onOpenProfile}
            className="p-2 text-blue-100 hover:bg-white/10 rounded-xl transition-colors border border-white/20 cursor-pointer flex items-center gap-2"
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-semibold hidden sm:inline text-white pr-1">Pedro</span>
          </button>

        </div>

      </div>
    </header>
  );
}