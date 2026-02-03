import React, { useMemo, useState, useEffect, useRef } from "react";
import { 
  ChevronRight, 
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
  MessageSquare,
  Users,
  Target,
  FileSearch
} from "lucide-react";

// Configurações globais da página
const CONFIG = {
  whatsapp: "5541996987079",
  images: {
    hero: "/Images/IMG_9855.jpg", 
    bio: "/Images/IMG_9413.jpg",
  },
};

/**
 * Componente de Imagem Otimizado
 * Focado em performance e nitidez (resolvendo pixelização).
 */
function ImageWithFallback({ src, alt, className }) {
  const [failed, setFailed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  if (failed) {
    return (
      <div className={`${className} flex flex-col items-center justify-center bg-slate-100 text-slate-400 border border-slate-200`}>
        <AlertCircle className="opacity-20 mb-2" size={32} />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-center px-4">
          A carregar fotografia profissional...
        </span>
      </div>
    );
  }

  return (
    <div className={`${className} bg-slate-100 relative overflow-hidden`}>
      <img 
        src={src} 
        alt={alt} 
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy" 
        onError={() => setFailed(true)} 
        style={{
          imageRendering: 'auto',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          fontSmoothing: 'antialiased'
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
        className="w-full py-6 flex justify-between items-center text-left hover:text-amber-600 transition-colors focus:outline-none"
      >
        <span className="text-lg font-bold text-slate-800 leading-tight">{question}</span>
        <div className="ml-4 flex-shrink-0">
          {isOpen ? <Minus size={20} className="text-amber-500" /> : <Plus size={20} className="text-slate-400" />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] pb-6" : "max-h-0"}`}>
        <p className="text-slate-600 leading-relaxed text-lg">{answer}</p>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-xl border-b border-slate-100 py-4 shadow-sm" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <div className="text-lg font-black tracking-[0.3em] uppercase text-slate-900">
          Valúcia<span className="text-amber-500">.</span>Furtado
        </div>
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">
          <a href="#problema" className="hover:text-amber-600 transition-colors">O Problema</a>
          <a href="#metodo" className="hover:text-amber-600 transition-colors">Raio-X</a>
          <a href="#entregaveis" className="hover:text-amber-600 transition-colors">Entregáveis</a>
          <a href="#sobre" className="hover:text-amber-600 transition-colors">Sobre</a>
          <a href="#faq" className="hover:text-amber-600 transition-colors">FAQ</a>
          <a href="#contato" className="bg-slate-900 text-white px-6 py-2.5 rounded-md font-black hover:bg-amber-500 transition-all">Contato</a>
        </div>
      </div>
    </nav>
  );
};

export default function App() {
  const heroImage = useMemo(() => CONFIG.images.hero, []);
  const bioImage = useMemo(() => CONFIG.images.bio, []);

  const waLinkBase = `https://wa.me/${CONFIG.whatsapp}?text=`;
  const waLinkMain = waLinkBase + encodeURIComponent("Olá Valúcia, gostaria de entender como aplicar o Raio-X comercial na minha operação.");
  
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION - Espaçamento Mobile Otimizado (gap-8 e mt-4) */}
      <section className="relative pt-32 pb-12 md:pt-60 md:pb-20 overflow-hidden bg-[#fcfcfd]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/[0.03] rounded-full blur-[150px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-12 gap-8 md:gap-16 items-center">
          <div className="md:col-span-7">
            <div className="reveal">
              <h1 className="text-5xl md:text-[80px] font-black leading-[1] md:leading-[0.95] tracking-tighter text-slate-900 mb-6 md:mb-10">
                Seu time atende bem,<br /><span className="text-amber-600">mas não vende?</span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-600 leading-relaxed max-w-xl mb-6 md:mb-12 font-medium">
                Descubra por que a falta de condução comercial faz com que boas conversas no WhatsApp não avancem para a decisão de compra.
              </p>
            </div>
          </div>
          <div className="md:col-span-5 relative group mt-4 md:mt-0">
            <div className="relative z-10 overflow-hidden rounded-2xl border-8 border-white shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]">
              <ImageWithFallback src={heroImage} alt="Valúcia Furtado" className="w-full aspect-[3/4]" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-4 border-l-4 border-amber-500/20 rounded-bl-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* SECÇÃO PROBLEMA */}
      <section id="problema" className="pt-12 pb-24 md:pt-20 md:pb-48 bg-[#161a23] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-8 text-white">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-end mb-16 md:mb-24">
            <div>
              <span className="text-amber-400 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Diagnóstico de Performance</span>
              <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-tight text-white">Onde o faturamento escorre pelos dedos</h2>
            </div>
            <p className="text-lg md:text-2xl text-zinc-300 font-medium leading-relaxed">Não é falta de esforço do time. É falha de condução ao longo da conversa.</p>
          </div>
          
          <div className="flex flex-col gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              { title: "Atendimento Passivo", desc: "O vendedor responde o que o cliente pergunta, mas não faz as perguntas que conduzem a conversa até o fechamento.", num: "01" },
              { title: "Preço antes de valor", desc: "Apresentar preço sem construir contexto transforma a conversa em comparação e enfraquece a venda.", num: "02" },
              { title: "Conversas que não avançam", desc: "Aceitar o “vou pensar” como ponto final interrompe a condução e encerra a venda antes do tempo certo.", num: "03" },
              { title: "Excesso de Afetividade", desc: "O atendimento extremamente afetuoso com jargões que reduzem o profissionalismo e a autoridade comercial.", num: "04" }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#1c212c] p-8 md:p-14 border-l-4 border-amber-500 shadow-xl group hover:bg-[#232936] transition-all duration-500 relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 relative z-10">
                  <span className="text-5xl md:text-7xl font-black text-white/10 group-hover:text-amber-500/20 transition-colors tabular-nums tracking-tighter block">{item.num}</span>
                  <div className="space-y-3">
                    <h3 className="font-bold text-2xl md:text-3xl text-white group-hover:text-amber-400 transition-colors tracking-tight">{item.title}</h3>
                    <p className="text-zinc-300 leading-relaxed font-normal text-lg md:text-2xl max-w-4xl" dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECÇÃO O RAIO-X */}
      <section id="metodo" className="py-24 md:py-40 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32">
            <span className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">O MÉTODO</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[1.1] mb-8">
              O <span className="text-amber-600 underline underline-offset-[12px] decoration-amber-500/20">Raio-X</span> que revela a erosão do seu lucro
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mt-10" />
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative mb-16 md:mb-24">
            {[
              { 
                icon: <FileSearch className="w-8 h-8" />, 
                title: "Linguagem e Técnica", 
                desc: "Observa como o vendedor se comunica, quais perguntas faz e se domina a técnica necessária para conduzir a conversa com clareza e direção." 
              },
              { 
                icon: <Users className="w-8 h-8" />, 
                title: "Relação e Empatia", 
                desc: "Avalia se a conversa se mantém consultiva, se há escuta real e se o atendimento cria confiança suficiente para sustentar o avanço da venda." 
              },
              { 
                icon: <Target className="w-8 h-8" />, 
                title: "Convergência e Resultado", 
                desc: "Analisa se a conversa avança, como as objeções são tratadas e em que ponto a condução se perde antes do fechamento." 
              }
            ].map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-amber-600 mb-8 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 shadow-sm">
                  {step.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={waLinkMain} target="_blank" rel="noreferrer" className="group inline-flex justify-center items-center gap-4 px-8 md:px-12 py-5 md:py-6 bg-slate-900 text-white font-bold hover:bg-amber-500 transition-all rounded-xl shadow-xl shadow-slate-100 text-center text-lg md:text-xl">
              Quero aplicar o Raio-X na minha operação
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ENTREGÁVEIS */}
      <section id="entregaveis" className="py-24 md:py-32 bg-[#fcfcfd]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
            <span className="text-amber-600 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Resultados Tangíveis</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 mb-6">O que você passa a enxergar</h2>
            <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Ao final da análise, o processo deixa de ser gerido pelo achismo e passa a ser operado por evidências.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <UserCheck size={28} />, title: "Leitura Individual", desc: "Análise objetiva da condução de cada vendedor através de critérios técnicos." },
              { icon: <LayoutGrid size={28} />, title: "Matriz de Equipe", desc: "Visão consolidada da condução do time para identificar gargalos coletivos." },
              { icon: <MonitorPlay size={28} />, title: "Sessão Executiva", desc: "Interpretação dos achados e definição de prioridades imediatas de ação." },
              { icon: <Droplets size={28} />, title: "Mapa de Vazamento", desc: "Diagnóstico técnico que revela onde a receita escorre durante a conversa e por que a venda não se concretiza." },
              { icon: <Gauge size={28} />, title: "Índice de Maturidade", desc: "Indicador técnico que mede o nível de evolução comercial da operação." },
              { icon: <MessageCircleOff size={28} />, title: "Objeções Críticas", desc: "Leitura estruturada das objeções recorrentes e como contorná-los." }
            ].map((item, i) => (
              <div key={i} className="p-8 md:p-10 border border-slate-100 rounded-2xl bg-white hover:shadow-2xl transition-all group">
                <div className="w-14 h-14 bg-slate-50 text-amber-600 rounded-lg shadow-sm flex items-center justify-center mb-6 md:mb-8 group-hover:bg-amber-500 group-hover:text-white transition-all">{item.icon}</div>
                <h3 className="font-bold text-xl md:text-2xl text-slate-900 mb-3 md:mb-4 leading-tight">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIO SECTION */}
      <section id="sobre" className="py-24 md:py-48 bg-[#0f1218] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="mb-12 md:mb-24 reveal">
            <span className="text-amber-400 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Quem analisa o seu time</span>
            <h2 className="text-3xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter text-white max-w-5xl">
              Expertise de multinacional aplicada ao crescimento do seu negócio
            </h2>
          </div>

          <div className="grid md:grid-cols-12 gap-12 md:gap-24 items-start">
            <div className="md:col-span-5 relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <ImageWithFallback src={bioImage} alt="Valúcia Furtado" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-amber-500 p-6 md:p-8 rounded-2xl shadow-2xl hidden lg:block text-slate-950">
                <p className="text-3xl md:text-4xl font-black leading-none">15+</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] mt-2">Anos de Performance</p>
              </div>
            </div>

            <div className="md:col-span-7 space-y-8 md:space-y-10">
              <div className="space-y-6 md:space-y-8 text-zinc-200 text-lg md:text-2xl font-light leading-relaxed">
                <p>
                  Sou especialista em <span className="text-white font-bold italic underline decoration-amber-500/40 underline-offset-8">Estratégia Comercial</span>, com atuação em gigantes como <span className="text-white font-bold">Natura, McDonald’s e O Boticário</span>, liderando times, estruturando processos e respondendo diretamente por resultado.
                </p>
                <p>
                  Hoje, minha missão é traduzir as estratégias dos grandes players para a realidade das PMEs. Através de uma análise profunda, transformo operações comerciais com foco <span className="text-white font-bold">em aumentar o faturamento</span> e trazer <span className="text-white font-bold">previsibilidade</span> ao negócio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Dúvidas Frequentes</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">FAQ</h2>
          </div>
          <div className="space-y-2 bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-100">
            {[
              { q: "Isso é um treinamento para o time de vendas?", a: "Não. A análise não é um treinamento nem uma capacitação comportamental. Ela revela, com evidências, como a condução das conversas acontece hoje e onde o faturamento escorre ao longo da operação." },
              { q: "Vocês analisam todas as conversas do WhatsApp?", a: "São analisadas conversas reais, selecionadas por critério, em volume suficiente para identificar padrões consistentes de condução, pontos de ruptura e recorrências relevantes." },
              { q: "Meu time será exposto ou avaliado individualmente?", a: "O foco não é exposição nem julgamento. A leitura individual existe para apoiar decisões de gestão, não para constranger pessoas." },
              { q: "Isso substitui meu CRM ou meus indicadores comerciais?", a: "Não. Indicadores mostram o que aconteceu. A análise mostra por que aconteceu, a partir da forma como as conversas são conduzidas até o fechamento." },
              { q: "Já usamos ferramentas de WhatsApp e CRM. Ainda faz sentido?", a: "Sim. Ferramentas organizam fluxo e dados. A análise observa comportamento, linguagem e direção da conversa." },
              { q: "Em quanto tempo os resultados da análise ficam claros?", a: "A clareza costuma surgir já na devolutiva executiva, quando os padrões de condução e os pontos de vazamento de faturamento se tornam evidentes." },
              { q: "Isso serve para qualquer tipo de empresa?", a: "A análise é indicada para operações em que o WhatsApp é um canal relevante de venda e que contam com equipes a partir de três vendedores." },
              { q: "O que acontece depois da análise?", a: "Com os achados consolidados, é construído um dicionamento claro de ação, com prioridades definidas e recomendações práticas sobre o que ajustar na condução das vendas." }
            ].map((item, idx) => (
              <AccordionItem key={idx} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contato" className="bg-white text-slate-900 py-24 md:py-48 relative overflow-hidden text-center">
        <div className="max-w-5xl mx-auto px-8 relative z-10 text-center space-y-12">
          <div className="reveal">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-8">Transforme conversas em <span className="text-amber-500 underline decoration-amber-500/10 underline-offset-[12px]">faturamento</span></h2>
            <p className="mt-6 text-slate-600 text-lg md:text-3xl leading-relaxed max-w-2xl mx-auto font-medium mb-12 md:mb-16">
              Quando a condução é clara, o faturamento deixa de depender de esforço individual e se torna uma estratégia de conversão.
            </p>
            <a href={waLinkMain} target="_blank" rel="noreferrer" className="group inline-flex justify-center items-center gap-4 px-10 md:px-12 py-6 md:py-7 bg-slate-900 text-white font-black text-xl hover:bg-amber-500 transition-all rounded-2xl shadow-2xl hover:scale-[1.03]">
              <MessageCircle size={26} className="text-amber-400 group-hover:text-white transition-colors" />
              Quero aplicar esta análise na minha operação
            </a>
          </div>
        </div>
      </section>

      <footer className="py-16 md:py-20 bg-slate-50 border-t border-slate-100 text-center">
        <div className="text-[10px] font-black tracking-[0.5em] text-slate-300 uppercase mb-4">Valúcia Furtado</div>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">© {new Date().getFullYear()} — Consultoria de Estratégia Comercial</p>
      </footer>
      
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        .reveal { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes reveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </main>
  );
}