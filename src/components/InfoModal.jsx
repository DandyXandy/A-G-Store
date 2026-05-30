import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function InfoModal({ isOpen, onClose, title, content }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay com desfoque profundo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[200]"
          />
          
          {/* Container do Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-24 bg-[#0a0a0a] border border-white/5 z-[210] p-8 md:p-20 overflow-y-auto scrollbar-hide rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            {/* Botão de Fechar Estilizado */}
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-zinc-500 hover:text-[#8B5CF6] transition-all duration-300 group"
            >
              <X size={28} strokeWidth={2} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>

            <div className="max-w-4xl mx-auto">
              {/* Badge Superior */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-[1px] bg-[#8B5CF6]"></div>
                <span className="text-[9px] tracking-[0.4em] text-[#8B5CF6] font-black uppercase">Legal & Info</span>
              </div>

              {/* Título com Estilo da Marca */}
              <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-16 leading-none">
                {title}<span className="text-[#8B5CF6]">.</span>
              </h2>

              {/* Conteúdo com Tipografia de Luxo */}
              <div className="text-zinc-400 text-[12px] md:text-[14px] leading-loose space-y-8 uppercase tracking-widest font-light italic">
                {content}
              </div>

              {/* Assinatura Final sutil */}
              <div className="mt-24 pt-12 border-t border-white/5 flex justify-between items-center">
                <p className="text-[8px] tracking-[0.5em] text-zinc-700 font-bold uppercase">A/G Store // Piura Perú</p>
                <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}