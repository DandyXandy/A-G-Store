import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({ onCartClick, cartCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      // Controla a distância do topo para colar a barra
      setIsAtTop(currentScroll < 40);

      // MARGEM DE TOLERÂNCIA: Evita tremer ou travar escondido no scroll sutil
      const scrollDifference = Math.abs(currentScroll - lastScroll);
      
      if (currentScroll > lastScroll && currentScroll > 150) {
        // ROLANDO PARA BAIXO: Se passou de 150px, esconde o menu
        if (scrollDifference > 10) {
          setIsVisible(false);
          setIsMenuOpen(false);
        }
      } else if (currentScroll < lastScroll) {
        // ROLANDO PARA CIMA: Sempre mostra a barra instantaneamente
        if (scrollDifference > 10 || currentScroll < 100) {
          setIsVisible(true);
        }
      }

      setLastScroll(currentScroll <= 0 ? 0 : currentScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <header
      className={`fixed left-0 w-full z-[100] transition-all duration-500 ease-out
        ${isAtTop ? "top-10" : "top-0"} 
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      <nav className="w-full bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 md:py-6 flex justify-between items-center">

          {/* Logo A/G - Estilo Luxo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col leading-none cursor-pointer group"
          >
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase italic transition-transform duration-300 group-hover:scale-[1.01]">
              A<span className="text-[#8B5CF6]">/</span>G
            </span>
            <span className="text-[7px] md:text-[8px] tracking-[0.5em] text-zinc-500 font-bold group-hover:text-white transition-colors uppercase mt-1">
              OFC<span className="text-[#8B5CF6]">.</span>
            </span>
          </Link>

          {/* Menu Desktop - Ultra Clean */}
          <div className="hidden md:flex gap-12 text-[10px] tracking-[0.4em] text-zinc-400 font-black">
            <Link to="/shop" className="hover:text-[#8B5CF6] transition-all duration-300 uppercase relative group/link py-2">
              SHOP
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8B5CF6] transition-all duration-300 group-hover/link:w-full"></span>
            </Link>
            <a href="#catalogo" onClick={(e) => handleScrollTo(e, 'catalogo')} className="hover:text-[#8B5CF6] transition-all duration-300 uppercase cursor-pointer relative group/link py-2">
              CATÁLOGO
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8B5CF6] transition-all duration-300 group-hover/link:w-full"></span>
            </a>
            <Link to="/contacto" className="hover:text-[#8B5CF6] transition-all duration-300 uppercase relative group/link py-2">
              CONTACTO
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8B5CF6] transition-all duration-300 group-hover/link:w-full"></span>
            </Link>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={onCartClick} className="relative p-2 group outline-none active:scale-95 transition-transform">
              <ShoppingBag size={20} className="text-white group-hover:text-[#8B5CF6] transition-colors duration-300" />
              <span className="absolute -top-0.5 -right-0.5 bg-[#8B5CF6] text-white text-[8px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full shadow-[0_0_15px_rgba(139,92,246,0.6)]">
                {cartCount}
              </span>
            </button>

            <button className="md:hidden p-2 text-white hover:text-[#8B5CF6] transition-colors outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute top-full left-0 w-full bg-[#050505] border-b border-white/5 flex flex-col p-10 gap-8 md:hidden shadow-2xl z-[99]"
            >
              <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="text-xs tracking-[0.5em] font-black text-white uppercase py-2">SHOP</Link>
              <a href="#catalogo" onClick={(e) => handleScrollTo(e, 'catalogo')} className="text-xs tracking-[0.5em] font-black text-white uppercase py-2">CATÁLOGO</a>
              <Link to="/contacto" onClick={() => setIsMenuOpen(false)} className="text-xs tracking-[0.5em] font-black text-white uppercase py-2">CONTACTO</Link>
              
              <div className="h-[1px] w-full bg-white/5 my-2"></div>
              <div className="flex justify-between items-center pt-2">
                <p className="text-[8px] tracking-[0.3em] text-zinc-600 uppercase font-bold">PIURA // PERÚ</p>
                <div className="flex gap-3 items-center">
                   <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse"></span>
                   <p className="text-[8px] text-zinc-500 tracking-widest uppercase font-black">DROP 001 LIVE</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}