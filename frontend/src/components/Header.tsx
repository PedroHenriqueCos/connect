import { Search, PlusCircle, Bell, User } from 'lucide-react';
import logoImg from '../assets/logo.png';

export function Header() {
  return (
    <header className="bg-uerj-blue text-white shadow-md sticky top-0 z-50 border-b border-uerj-blue-dark">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between gap-6">
        
        {/* Logo Com Destaque Maior */}
        <div className="flex items-center cursor-pointer min-w-[280px] h-20 relative overflow-visible">
          <img 
            src={logoImg} 
            alt="Connect UERJ Logo" 
            className="h-48 w-auto object-contain max-w-none absolute left-0 top-[52%] -translate-y-[44%] scale-140 origin-left hover:scale-145 transition-transform duration-200" 
          />
        </div>

        {/* Campo de Busca */}
        <div className="flex-1 max-w-lg mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar dúvidas, disciplinas, estágios..."
              className="w-full bg-uerj-blue-dark/90 text-white placeholder-gray-300 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-uerj-yellow border border-white/10 transition-all shadow-inner"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-300" />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-uerj-yellow text-uerj-blue-dark font-bold px-6 py-3 rounded-full hover:bg-uerj-yellow-hover transition-all text-sm shadow-md hover:shadow-lg active:scale-95">
            <PlusCircle className="h-5 w-5" />
            <span className="hidden md:inline">Novo Tópico</span>
          </button>

          <button className="p-3 hover:bg-uerj-blue-dark rounded-full transition-colors text-gray-200 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          <div className="w-11 h-11 rounded-full bg-uerj-blue-dark border-2 border-uerj-yellow flex items-center justify-center font-bold text-uerj-yellow cursor-pointer hover:border-white transition-all shadow-md">
            <User className="h-6 w-6 text-white" />
          </div>
        </div>

      </div>
    </header>
  );
}