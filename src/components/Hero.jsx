import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative h-[100svh] w-full flex items-center justify-center bg-[#050505] overflow-hidden">
            
            {/* Texto de fundo gigante - Estilo High-End */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1 className="text-[45vw] md:text-[35vw] font-black text-white/[0.02] leading-none select-none tracking-tighter italic uppercase">
                    AG
                </h1>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="z-10 text-center px-6"
            >
                <motion.p 
                    initial={{ opacity: 0, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, letterSpacing: "0.6em" }}
                    transition={{ duration: 1.5 }}
                    className="text-[9px] md:text-[11px] uppercase text-[#8B5CF6] font-black mb-6 md:mb-8"
                >
                    Piura // Perú // Nueva Colección
                </motion.p>

                <h1 className="text-6xl sm:text-7xl md:text-[10rem] font-black text-white tracking-tight leading-tight uppercase italic">
                    A<span className="text-[#8B5CF6]">/</span>G STORE<span className="text-[#8B5CF6] text-4xl md:text-6xl inline-block ml-2">.</span>
                </h1>

                <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent mx-auto mb-10"></div>

                <p className="text-[11px] md:text-sm font-light text-zinc-400 tracking-[0.4em] max-w-[300px] md:max-w-2xl mx-auto uppercase leading-relaxed">
                    Exclusividad urbana <span className="text-white font-bold">moderna y joven</span>
                </p>
                
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-12 bg-white text-black text-[10px] tracking-[0.3em] font-black px-10 py-4 uppercase hover:bg-[#8B5CF6] hover:text-white transition-all duration-300"
                >
                    Explorar Catálogo
                </motion.button>
            </motion.div>

            {/* Indicador de scroll minimalista - Roxo */}
            <div className="absolute bottom-10 flex flex-col items-center gap-4">
                <span className="text-[8px] tracking-[0.5em] text-zinc-500 uppercase font-bold">Scroll</span>
                <div className="relative w-[1px] h-16 bg-zinc-800 overflow-hidden">
                    <motion.div 
                        initial={{ y: "-100%" }}
                        animate={{ y: "100%" }}
                        transition={{ 
                            duration: 2.5, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                        className="absolute inset-0 w-full h-1/2 bg-[#8B5CF6] shadow-[0_0_10px_#8B5CF6]"
                    />
                </div>
            </div>

            {/* Detalhes de iluminação ambiente */}
            <div className="absolute -left-20 top-1/4 w-64 h-64 bg-[#8B5CF6]/10 blur-[120px] rounded-full"></div>
            <div className="absolute -right-20 bottom-1/4 w-64 h-64 bg-[#8B5CF6]/10 blur-[120px] rounded-full"></div>
        </section>
    );
}