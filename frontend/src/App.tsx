import { Header } from './components/Header';
import { Feed } from './components/Feed';
import { Info, Calendar, Utensils } from 'lucide-react';

export function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Banner de Boas-Vindas */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-uerj-blue">
              Bem-vindo ao <span className="text-uerj-yellow-hover">Connect UERJ</span>! 🎓
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              O espaço centralizado para trocar ideias, tirar dúvidas sobre disciplinas e ficar por dentro das novidades do campus.
            </p>
          </div>
        </section>

        {/* Layout Grid: Feed Principal + Sidebar Lateral */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna Principal (Feed de Tópicos - 2 colunas no desktop) */}
          <section className="lg:col-span-2">
            <Feed />
          </section>

          {/* Coluna Lateral (Sidebar informativa) */}
          <aside className="space-y-6">
            
            {/* Card do RU */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 font-bold text-uerj-blue mb-3">
                <Utensils className="h-5 w-5 text-uerj-yellow" />
                <h3>Aviso do RU</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Horário do almoço: 11h às 14h30. Não se esqueça de apresentar a carteirinha estudantil atualizada!
              </p>
              <button className="w-full bg-slate-100 hover:bg-slate-200 text-uerj-blue text-xs font-semibold py-2 rounded-xl transition-colors">
                Ver Cardápio Completo
              </button>
            </div>

            {/* Card de Links Rápidos */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 font-bold text-uerj-blue mb-3">
                <Calendar className="h-5 w-5 text-uerj-yellow" />
                <h3>Links Úteis UERJ</h3>
              </div>
              <ul className="text-xs text-gray-600 space-y-2.5">
                <li className="hover:text-uerj-blue cursor-pointer flex items-center gap-2">
                  <Info className="h-3.5 w-3.5" /> Calendário Acadêmico
                </li>
                <li className="hover:text-uerj-blue cursor-pointer flex items-center gap-2">
                  <Info className="h-3.5 w-3.5" /> Acesso ao Aluno Online
                </li>
                <li className="hover:text-uerj-blue cursor-pointer flex items-center gap-2">
                  <Info className="h-3.5 w-3.5" /> Biblioteca Central (BDTD)
                </li>
              </ul>
            </div>

          </aside>

        </div>
      </main>
    </div>
  );
}

export default App;