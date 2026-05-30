import React, { useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function ShopPage({ onAddToCart, onPolicyClick }) {
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      
      {/* Iluminación de estudio fija de alta gama en el fondo */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#8B5CF6]/5 blur-[140px] pointer-events-none z-0"></div>

      <div className="pt-48 pb-20 relative z-10">
        
        {/* HEADER EDITORIAL */}
        <div className="px-6 md:px-10 mb-16 text-center select-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-[8.5rem] font-black italic uppercase tracking-tighter text-white leading-none mb-6">
              The <span className="text-[#8B5CF6]">Collection</span><span className="text-zinc-800">.</span>
            </h1>
            
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="w-8 h-[1px] bg-zinc-800 hidden sm:block"></div>
              <p className="text-[9px] md:text-[11px] tracking-[0.6em] text-zinc-500 font-black uppercase pl-[0.6em]">
                Curaduría Exclusiva // Drop 001
              </p>
              <div className="w-8 h-[1px] bg-zinc-800 hidden sm:block"></div>
            </div>
          </motion.div>
        </div>
        
        {/* GRID COMPLETO DE PRODUCTOS REFINADO */}
        <ProductGrid onAddToCart={onAddToCart} />
      </div>

      <Footer onPolicyClick={onPolicyClick} />
    </div>
  );
}