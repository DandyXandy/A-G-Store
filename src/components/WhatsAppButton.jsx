import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const phoneNumber = "51923610077"; 
  const message = encodeURIComponent("Hola A/G Store! 👋 Vi la web y me gustaría hacer una consulta sobre los productos.");

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[90] group"
    >
      {/* Ondas de choque moradas integradas al index.css */}
      <span className="absolute inset-0 rounded-full bg-[#8B5CF6] animate-pulse-premium"></span>
      <span className="absolute inset-0 rounded-full bg-[#8B5CF6]/30 animate-ping opacity-25 duration-[2500ms]"></span>

      {/* Botón Principal Estilo Concierge */}
      <div className="relative bg-[#0d0d0d] text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(139,92,246,0.25)] border border-white/5 group-hover:border-[#8B5CF6]/30 transition-all duration-500">
        <MessageCircle size={22} className="md:w-6 md:h-6 group-hover:text-[#8B5CF6] transition-colors duration-300" />
        
        {/* Indicador de Conexión Live */}
        <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0d0d0d] shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
        
        {/* Tooltip Editorial Urban Luxury */}
        <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-[#0d0d0d] text-white border border-white/5 text-[9px] tracking-[0.4em] font-black uppercase py-3.5 px-6 whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none hidden md:block rounded-sm shadow-2xl italic">
          Concierge A/G <span className="text-[#8B5CF6] ml-2">•</span> Online
        </span>
      </div>
    </motion.a>
  );
}