import React from 'react'
import { motion } from 'framer-motion'

export default function Manifesto() {
  return (
    <section className="bg-[#050505] text-white py-36 md:py-64 px-6 md:px-10 flex flex-col items-center justify-center text-center relative overflow-hidden border-t border-b border-white/[0.02]">
      
      {/* Línea de energía conductiva A/G */}
      <div className="w-[1px] h-36 bg-gradient-to-t from-[#8B5CF6] to-transparent mb-20 opacity-40"></div>
      
      {/* Badge de Filosofía */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-[10px] md:text-[11px] tracking-[1.2em] text-[#8B5CF6] uppercase mb-16 font-black italic pl-[1.2em]">
          Nuestra Declaración // Flight Heritage
        </h2>
      </motion.div>
      
      {/* Cuerpo del Manifesto - Estilo Revista de Alta Costura */}
      <div className="max-w-6xl relative z-10">
        <motion.p 
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-7xl font-serif italic leading-[1.15] md:leading-[1.05] tracking-tighter text-white"
        >
          "No seguimos tendencias, <br className="hidden md:block" /> 
          las <span className="text-[#8B5CF6] not-italic font-sans font-black tracking-tighter uppercase relative group inline-block">destruimos</span>. <br className="hidden md:block" /> 
          No vendemos ropa; <br className="hidden md:block" />
          construimos el uniforme de quienes <br className="hidden md:block" /> 
          dominan el <span className="text-white not-italic font-sans font-black tracking-tighter uppercase underline decoration-[#8B5CF6] decoration-2 md:decoration-4 underline-offset-8">caos urbano</span>."
        </motion.p>
        
        {/* Tipografía masiva flotante de fondo */}
        <motion.span 
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 0.02, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white select-none pointer-events-none italic tracking-tighter z-0"
        >
          AG
        </motion.span>
      </div>

      {/* Bloque de Cierre y Origen */}
      <div className="mt-24 md:mt-36 flex flex-col items-center relative z-10">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "120px" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
          className="h-[1px] bg-zinc-800 mb-12"
        ></motion.div>
        
        <div className="flex flex-col gap-3">
          <span className="text-[10px] md:text-[11px] tracking-[0.6em] text-zinc-400 font-black uppercase pl-[0.6em]">
            A/G // Est. 2026
          </span>
          <p className="text-[8px] tracking-[0.4em] text-[#8B5CF6] uppercase font-black italic pl-[0.4em]">
            Piura — Perú — Vanguardia
          </p>
        </div>
        
        {/* Línea de fuga conductiva inferior */}
        <div className="w-[1px] h-36 bg-gradient-to-b from-[#8B5CF6] to-transparent mt-16 opacity-40"></div>
      </div>

      {/* Radian Glow sutil de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#8B5CF6]/5 blur-[160px] pointer-events-none rounded-full z-0"></div>
    </section>
  )
}