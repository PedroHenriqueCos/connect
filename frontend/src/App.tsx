import { Header } from './components/Header';
import patoImg from './assets/pato.png';

export function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center flex flex-col items-center justify-center">
          
          {/* Mascote do Pato */}
          <img 
            src={patoImg} 
            alt="Mascote Connect UERJ" 
            className="w-24 h-24 object-contain mb-4 animate-bounce"
          />

          <h1 className="text-2xl font-bold text-uerj-blue mb-2">
            Bem-vindo ao Connect <span className="text-uerj-yellow">UERJ</span>!
          </h1>
          
          <p className="text-gray-600 max-w-lg mx-auto text-sm leading-relaxed">
            O ambiente centralizado para os estudantes da UERJ compartilharem dúvidas, informações sobre RU, vagas de estágio e disciplinas.
          </p>

        </div>
      </main>
    </div>
  );
}

export default App;