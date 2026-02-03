import React, { useMemo, useState, useEffect } from "react";
import { 
  MessageCircle, 
  AlertCircle, 
  ArrowRight,
  Plus,
  Minus,
  UserCheck,
  LayoutGrid,
  MonitorPlay,
  Droplets,
  Gauge,
  MessageCircleOff,
  Users,
  Target,
  FileSearch
} from "lucide-react";

// CONFIGURAÇÃO GLOBAL - Nomes exatos conforme as suas fotos WebP de 118KB/91KB
const CONFIG = {
  whatsapp: "5541996987079",
  images: {
    hero: "/Images/IMG_9855.webp", 
    bio: "/Images/IMG_9413.webp",
  },
};

/**
 * Componente de Imagem com Performance de Elite
 * Resolve a pixelização e garante prioridade máxima de download no Safari.
 */
function ImageWithFallback({ src, alt, className, isPriority = false }) {
  const [failed, setFailed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  if (failed) {
    return (
      <div className={`${className} flex flex-col items-center justify-center bg-slate-100 text-slate-400 border border-slate-200`}>
        <AlertCircle className="opacity-20 mb-2" size={32} />
        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-center px-4 leading-relaxed">
          Ficheiro não encontrado:<br/>{src.split('/').pop()}
        </span>
      </div>
    );
  }

  return (
    <div className={`${className} bg-slate-200 relative overflow-hidden`} style={{ aspectRatio: '3/4', willChange: 'opacity' }}>
      {/* Skeleton de carregamento imediato */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center">
             <div className="w-8 h-8 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        // Atributos cruciais para Core Web Vitals
        fetchPriority={isPriority ? "high" : "auto"}
        loading={isPriority ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)} 
        style={{
          imageRendering: 'auto',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      />
    </div>
  );
}

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left hover:text-amber-600 transition-colors focus:outline-none"
      >
        <span className="text-base md:text-lg font-bold text-slate-800 leading-tight">{question}</span>
        <div className="ml-4 flex-shrink-0">
          {isOpen ? <Minus size={20} className="text-amber-500" /> : <Plus size={20} className="text-slate-400" />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] pb-5" : "max-h-0"}`}>
        <p className="text-slate-600 leading-relaxed text-base md:text-lg">{answer}</p>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl border-b border-slate-100 py-3 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-base md:text-lg font-black tracking-[0.2em] uppercase text-slate-900">
          Valúcia<span className="text-amber-500">.</span>Furtado
        </div>
        <a href="#contato" className="bg-slate-900 text-white px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500 transition-all">Contato</a>
      </div>
    </nav>
  );
};

export default function App() {
  const waLinkMain = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Olá Valúcia, gostaria de entender como aplicar o Raio-X comercial na minha operação.")}`;
  
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION - Espaçamento Mobile Corrigido (pt-24 e gap-4) */}
      <section className="relative pt-24 pb-12 md:pt-60 md:pb-20 overflow-hidden bg-[#fcfcfd]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/[0.02] rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-4 md:gap-16 items-center">
          <div className="md:col-span-7">
            <div className="reveal-fast">
              <h1 className="text-4xl md:text-[80px] font-black leading-[1.1] md:leading-[0.95] tracking-tighter text-slate-900 mb-4 md:mb-10">
                Seu time atende bem,<br /><span className="text-amber-600">mas não vende?</span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-600 leading-relaxed max-w-xl mb-6 md:mb-12 font-medium">
                Descubra por que a falta de condução comercial faz com que boas conversas no WhatsApp não avancem para a decisão de compra.
              </p>
            </div>
          </div>
          <div className="md:col-span-5 relative mt-4 md:mt-0">
            <div className="relative z-10 overflow-hidden rounded-2xl border-4 md:border-8 border-white shadow-xl">
              <ImageWithFallback 
                src={CONFIG.images.hero} 
                alt="Valúcia Furtado" 
                className="w-full" 
                isPriority={true} 
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-amber-500/10 rounded-bl-xl -z-10" />
          </div>
        </div>
      </section>

      {/* SECÇÃO PROBLEMA */}
      <section id="problema" className="pt-10 pb-20 md:pt-20 md:pb-40 bg-[#161a23]">
        <div className="max-w-7xl mx-auto px-6 text-white">
          <div className="mb-12">
            <span className="text-amber-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Diagnóstico</span>
            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight">Onde o lucro escorre</h2>
          </div>
          <div className="flex flex-col gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              { title: "Atendimento Passivo", num: "01", desc: "O vendedor responde o que o cliente pergunta, mas não conduz a conversa." },
              { title: "Preço antes de valor", num: "02", desc: "Apresentar preço sem contexto enfraquece a venda." },
              { title: "Falta de condução", num: "03", desc: "Aceitar o “vou pensar” interrompe a venda precocemente." },
              { title: "Excesso de Afetividade", num: "04", desc: "Jargões que reduzem o profissionalismo comercial." }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#1c212c] p-6 md:p-12 border-l-4 border-amber-500 shadow-xl group hover:bg-[#232936] transition-colors">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                  <span className="text-4xl md:text-6xl font-black text-white/5 tabular-nums">{item.num}</span>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl md:text-2xl text-white tracking-tight">{item.title}</h3>
                    <p className="text-zinc-400 leading-relaxed text-base md:text-xl font-normal">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTODO */}
      <section id="metodo" className="py-20 md:py-32 bg-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-20">O Método Raio-X</h2>
          <div className="grid md:grid-cols-3 gap-12 text-left mb-16">
            {[
              { icon: <FileSearch size={32} />, title: "Linguagem", desc: "Análise técnica da forma como o time se comunica." },
              { icon: <Users size={32} />, title: "Empatia", desc: "Avaliação da confiança gerada no atendimento." },
              { icon: <Target size={32} />, title: "Conversão", desc: "Foco total nos pontos que impedem o fechamento." }
            ].map((step, idx) => (
              <div key={idx}>
                <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6">{step.icon}</div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-600 text-lg">{step.desc}</p>
              </div>
            ))}
          </div>
          <a href={waLinkMain} target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 px-8 py-5 bg-slate-900 text-white font-bold hover:bg-amber-500 transition-all rounded-xl text-lg shadow-lg">
            Quero aplicar o Raio-X
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-20 md:py-40 bg-[#0f1218]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-10 md:gap-20 items-center">
          <div className="md:col-span-5">
            <ImageWithFallback src={CONFIG.images.bio} alt="Valúcia" className="rounded-2xl shadow-2xl w-full" />
          </div>
          <div className="md:col-span-7 text-zinc-300">
            <h2 className="text-3xl md:text-6xl font-black text-white leading-tight mb-8">Expertise aplicada</h2>
            <p className="text-base md:text-xl font-light leading-relaxed mb-6">Expertise em estratégia comercial, com atuação em gigantes como Natura, McDonald’s e O Boticário.</p>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-white text-center border-t border-slate-100 text-slate-400">
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">© {new Date().getFullYear()} — Valúcia Furtado</p>
      </footer>
      
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        .reveal-fast { animation: reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes reveal { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </main>
  );
}