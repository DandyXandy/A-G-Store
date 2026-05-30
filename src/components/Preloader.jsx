import React from 'react';
import { motion } from 'framer-motion';

export default function Preloader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className="fixed inset-0 z-[999] bg-[#050505] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* 23 / FLIGHT HERITAGE BACKGROUND (Estilo Marca d'Água Jordan) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.span 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.015 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-[40vw] font-black text-white italic tracking-tighter uppercase select-none"
        >
          23
        </motion.span>
      </div>

      <div className="relative flex flex-col items-center z-10">
        
        {/* Badge Superior Estilo Quadra / Drop */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="text-[7px] tracking-[0.4em] text-[#8B5CF6] font-black uppercase italic">Flight Culture</span>
          <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
          <span className="text-[7px] tracking-[0.4em] text-zinc-600 font-bold uppercase">A/G Premium</span>
        </motion.div>

        {/* Logo A/G com Animação de Revelação */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="flex flex-col items-center leading-none"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic">
              A<span className="text-[#8B5CF6]">/</span>G
            </h1>
            
            <motion.span 
              initial={{ letterSpacing: "0.2em", opacity: 0 }}
              animate={{ letterSpacing: "0.6em", opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-[9px] md:text-[10px] text-zinc-500 font-black tracking-[0.6em] uppercase mt-4 text-center pl-[0.6em]"
            >
              OFC
            </motion.span>
          </motion.div>
        </div>

        {/* Barra de Carregamento Ultra-Fina (Style Nike Lab) */}
        <div className="w-48 h-[1px] bg-white/5 mt-14 overflow-hidden relative">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: [0.65, 0, 0.35, 1] 
            }}
            className="absolute top-0 w-full h-full bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent shadow-[0_0_15px_#8B5CF6]"
          />
        </div>

        {/* Texto de Status Minimalista */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[7px] tracking-[0.5em] text-zinc-700 uppercase mt-8 font-black italic pl-[0.5em]"
        >
          Inspirado en el legado // Curando la exclusividad
        </motion.p>
      </div>

      {/* Detalhe de vinheta cinematográfica nas bordas */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 pointer-events-none"></div>
    </motion.div>
  );
}