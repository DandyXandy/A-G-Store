import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: "¿CUÁL ES LA CALIDAD Y MATERIAL DE LAS PRENDAS A/G?",
    answer: "Trabajamos exclusivamente con materiales premium seleccionados de alto gramaje y confección de exportación. Desde tejidos estructurados de alta densidad para nuestros polos y hoodies, hasta fibras tecnológicas transpirables para la línea active. Cada pieza está diseñada para ofrecer una caída pesada impecable, máxima comodidad y una durabilidad superior que resiste el ritmo de la calle."
  },
  {
    question: "¿CÓMO FUNCIONA EL DELIVERY EN PIURA?",
    answer: "En la ciudad de Piura contamos con servicio de envío inmediato (en menos de 24 horas). Coordinamos la entrega de manera personalizada directamente a tu ubicación para que recibas tu drop exclusivo en tiempo récord y con total seguridad."
  },
  {
    question: "¿ENVÍAN A OTRAS PROVINCIAS DEL PERÚ?",
    answer: "Absolutamente. Realizamos envíos respaldados a nivel nacional a través de las agencias líderes Olva Courier y Shalom. Tan pronto como tu pedido sea despachado, te enviaremos el número de remito y seguimiento de forma automática directo a tu WhatsApp."
  },
  {
    question: "¿CÓMO PUEDO ELEGIR MI TALLA IDEAL?",
    answer: "Nuestras piezas de streetwear siguen un patrón 'Modern Oversized' de caída estructural. Si buscas el calce característico de la cultura urbana con hombros relajados, te recomendamos elegir tu talla habitual. Si prefieres un ajuste más estándar o entallado, te sugerimos solicitar una talla menos."
  }
];

export default function FAQ() {
  // Estado para controlar qué pregunta está abierta (-1 significa ninguna)
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <section className="py-32 md:py-56 px-6 md:px-10 bg-[#050505] relative overflow-hidden border-b border-white/[0.02]">
      {/* Detalle de luz de ambiente sutil */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#8B5CF6]/5 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header de la Sección */}
        <div className="flex flex-col items-center md:items-start mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-[#8B5CF6]"></div>
            <h2 className="text-[10px] tracking-[0.6em] text-[#8B5CF6] uppercase font-black italic pl-[0.6em]">
              Centro de Ayuda
            </h2>
          </motion.div>

          <h3 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.85] italic">
            Dudas <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600">Frecuentes.</span>
          </h3>
        </div>

        {/* Sistema de Acordeón Premium en una sola columna limpia */}
        <div className="flex flex-col border-t border-white/5">
          {faqs.map((faq, index) => {
            const isOpen = expandedIndex === index;
            return (
              <div 
                key={index}
                className="border-b border-white/5 transition-colors duration-500 hover:bg-white/[0.01]"
              >
                {/* Botón de Control / Pregunta */}
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full py-8 flex justify-between items-center text-left outline-none group cursor-pointer"
                >
                  <h4 className={`text-xs md:text-sm font-black tracking-[0.15em] uppercase transition-colors duration-300 pr-4 ${isOpen ? 'text-[#8B5CF6]' : 'text-white group-hover:text-[#8B5CF6]'}`}>
                    {faq.question}
                  </h4>
                  
                  {/* Ícono indicador con rotación controlada */}
                  <div className="flex-shrink-0 p-1 text-zinc-500 group-hover:text-white transition-colors duration-300">
                    <motion.div
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Plus size={16} />
                    </motion.div>
                  </div>
                </button>

                {/* Contenedor Animado del Texto de Respuesta */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 pr-10 text-[11px] md:text-xs leading-relaxed text-zinc-500 font-bold tracking-widest uppercase italic">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bloque de Cierre Conversor */}
        <div className="mt-24 pt-12 border-t border-white/5 text-center md:text-left">
          <p className="text-[9px] md:text-[10px] tracking-[0.4em] text-zinc-600 uppercase font-black">
            ¿Aún tienes preguntas?{' '}
            <a 
              href="https://wa.me/51923610077" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-[#8B5CF6] transition-colors border-b border-[#8B5CF6] pb-1 ml-1 outline-none font-black italic"
            >
              Escríbenos al Concierge A/G
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}