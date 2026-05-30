import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "ENVÍOS A TODO EL PERÚ // DELIVERY INMEDIATO PIURA",
  "A/G STORE // CURADURÍA EXCLUSIVA DE VANGUARDIA",
  "PAGO CONTRA ENTREGA // YAPE, PLIN Y EFECTIVO",
  "CONCIERGE PERSONALIZADO VÍA WHATSAPP DISPONIBLE",
  "COMBOS EMPRENDEDOR // RENTABILIDAD Y CALIDAD PREMIUM"
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4500); // Un tempo ligeramente más lento para mejorar la legibilidad del tracking largo
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-10 bg-[#050505] w-full flex items-center justify-center overflow-hidden relative z-[110] border-b border-white/5">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
          className="text-[8px] md:text-[9px] tracking-[0.4em] text-white font-black uppercase text-center px-6 italic pl-[0.4em]"
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
      
      {/* Luces de ambiente moradas en los extremos estilo pasarela */}
      <div className="absolute left-0 w-24 h-full bg-gradient-to-r from-[#8B5CF6]/10 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 w-24 h-full bg-gradient-to-l from-[#8B5CF6]/10 to-transparent pointer-events-none"></div>
    </div>
  );
}