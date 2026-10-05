/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useRef } from 'react';

const Hero: React.FC = () => {
  const [bgImage, setBgImage] = useState<string>(() => {
    try {
      return localStorage.getItem('thales_hero_bg') || '/banner.jpeg';
    } catch {
      return '/banner.jpeg';
    }
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setBgImage(result);
          try {
            localStorage.setItem('thales_hero_bg', result);
          } catch {}
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      // Manual scroll calculation to account for fixed header
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Update URL hash without jumping, safely ignoring errors in sandboxed environments
      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignore SecurityError in restricted environments
      }
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#D6D1C7]">
      
      {/* Background Image - Foto Real com tratamento fotográfico profissional natural */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img 
            src={bgImage} 
            alt="Obra realizada - Thales Pinturas, acabamento e pós obra" 
            className="w-full h-full object-cover object-[center_38%] sm:object-[center_35%] scale-[1.02] transition-transform duration-1000 ease-out filter contrast-[1.05] brightness-[1.03] saturate-[1.08]"
            onError={() => {
              if (bgImage !== '/banner.jpeg') {
                setBgImage('/banner.jpeg');
              }
            }}
        />
        {/* Iluminação profissional / Vinhetas arquitetônicas sutis que valorizam a foto e dão legibilidade perfeita */}
        {/* Gradiente superior suave para destacar o menu e logo */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none"></div>
        {/* Gradiente lateral esquerdo para destaque elegante do título sem alterar o lado da escada e varanda */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 via-45% to-transparent pointer-events-none"></div>
        {/* Gradiente inferior suave para transição de profundidade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
      </div>

      {/* Content - Posicionado à esquerda e com espaçamento seguro abaixo da barra de navegação */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start text-left px-8 sm:px-12 md:px-20 lg:px-28 pt-28 sm:pt-32 md:pt-36 pb-16">
        <div className="animate-fade-in-up w-full max-w-xl">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-normal text-white tracking-tight mb-8 drop-shadow-lg leading-[1.05]">
            Quiet <span className="italic text-[#F5F2EB]">living.</span>
          </h1>
          
          <a 
            href="#products" 
            onClick={(e) => handleNavClick(e, 'products')}
            className="group relative px-9 py-4 bg-[#F5F2EB] text-[#2C2A26] rounded-full text-xs sm:text-sm font-semibold uppercase tracking-widest hover:bg-white hover:shadow-2xl transition-all duration-300 inline-block shadow-lg"
          >
            <span className="relative z-10 group-hover:text-[#2C2A26]">Nossos Serviços</span>
          </a>
        </div>
      </div>

      {/* Seletor de foto do banner */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      <button 
        onClick={() => fileInputRef.current?.click()}
        title="Trocar ou carregar foto do banner"
        className="absolute bottom-4 right-4 z-20 text-[11px] uppercase tracking-wider font-sans bg-black/40 hover:bg-black/70 text-white/90 px-3 py-1.5 rounded backdrop-blur-sm transition-all flex items-center gap-1.5"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        Foto do banner
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
