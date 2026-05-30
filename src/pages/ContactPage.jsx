import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import emailjs from '@emailjs/browser'; // Corregido nativamente para el paquete de tu package.json

export default function ContactPage({ onPolicyClick }) {

  const form = useRef();
  const [status, setStatus] = useState('idle'); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.sendForm(
      'service_eax7s1l',
      'template_z2xkh9l',
      form.current,
      '8-r-ws-zQLPMk3WKu'
    )
    .then(() => {
      setStatus('success');
      form.current.reset();
      setTimeout(() => setStatus('idle'), 4000);
    })
    .catch((error) => {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <section className="pt-48 pb-32 px-6 md:px-20 relative overflow-hidden">
        {/* Glow púrpura sutil ambiental de alta gama */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[#8B5CF6]/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10">

          {/* HEADER EDITORIAL */}
          <div className="text-center mb-24">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[9.5rem] font-black italic tracking-tighter uppercase text-white mb-8 leading-none select-none"
            >
              Contacto<span className="text-[#8B5CF6]">.</span>
            </motion.h1>

            <p className="text-[10px] md:text-[11px] tracking-[0.6em] text-zinc-500 uppercase font-black pl-[0.6em]">
              Atención Personalizada // Exclusividad A/G
            </p>
          </div>

          {/* FORMULARIO PREMIUM */}
          <form 
            ref={form}
            onSubmit={sendEmail}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24"
          >

            {/* NOMBRE */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] tracking-[0.4em] text-[#8B5CF6] font-black uppercase ml-1 italic pl-[0.4em]">
                Nombre Completo
              </label>
              <input 
                type="text"
                name="user_name"
                required
                placeholder="EJ. ALONSO GARCIA"
                className="bg-white/[0.02] border border-white/5 px-8 py-5 text-[11px] tracking-widest focus:border-[#8B5CF6] focus:bg-white/[0.04] focus:outline-none transition-all duration-300 text-white uppercase font-bold placeholder:text-zinc-800 rounded-sm"
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] tracking-[0.4em] text-[#8B5CF6] font-black uppercase ml-1 italic pl-[0.4em]">
                Email de Contacto
              </label>
              <input 
                type="email"
                name="user_email"
                required
                placeholder="TU@EMAIL.COM"
                className="bg-white/[0.02] border border-white/5 px-8 py-5 text-[11px] tracking-widest focus:border-[#8B5CF6] focus:bg-white/[0.04] focus:outline-none transition-all duration-300 text-white uppercase font-bold placeholder:text-zinc-800 rounded-sm"
              />
            </div>

            {/* MENSAJE */}
            <div className="flex flex-col gap-3 md:col-span-2">
              <label className="text-[10px] tracking-[0.4em] text-[#8B5CF6] font-black uppercase ml-1 italic pl-[0.4em]">
                ¿En qué podemos ayudarte?
              </label>
              <textarea 
                name="message"
                required
                placeholder="ESCRIBE TU MENSAJE AQUÍ..."
                className="bg-white/[0.02] border border-white/5 px-8 py-5 text-[11px] tracking-widest focus:border-[#8B5CF6] focus:bg-white/[0.04] focus:outline-none transition-all duration-300 text-white uppercase font-bold h-48 resize-none placeholder:text-zinc-800 rounded-sm"
              />
            </div>

            {/* BOTÓN INTELIGENTE CON CONTROL DE ANIMACIÓN */}
            <div className="md:col-span-2 relative h-20">
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.button
                    key="idle"
                    type="submit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full h-full bg-white text-black font-black text-[10px] tracking-[0.5em] uppercase italic hover:bg-[#8B5CF6] hover:text-white hover:shadow-purple-neon transition-all duration-500 rounded-sm cursor-pointer pl-[0.5em]"
                  >
                    Enviar Mensaje
                  </motion.button>
                )}

                {status === 'sending' && (
                  <motion.div
                    key="sending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex items-center justify-center border border-white/5 bg-white/[0.01] rounded-sm"
                  >
                    <div className="w-5 h-5 border-2 border-[#8B5CF6] border-t-transparent rounded-full animate-spin"></div>
                  </motion.div>
                )}

                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full h-full bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black text-[10px] tracking-[0.4em] uppercase italic rounded-sm pl-[0.4em]"
                  >
                    ✓ Mensaje recibido. Nos contactaremos pronto.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full h-full bg-red-950/30 border border-red-500/30 text-red-400 flex items-center justify-center font-black text-[10px] tracking-[0.4em] uppercase italic rounded-sm pl-[0.4em]"
                  >
                    ✕ Error en el envío. Intenta nuevamente.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </form>

          {/* INFO BOXES CONCIEGE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/5 pt-20 text-center md:text-left mb-20">
            <div className="border-l border-white/5 md:border-none pl-4 md:pl-0">
              <p className="text-[9px] tracking-[0.5em] text-[#8B5CF6] uppercase mb-4 font-black italic pl-[0.5em]">Directo</p>
              <p className="text-sm font-black text-white tracking-[0.15em]">
                +51 923 610 077
              </p>
            </div>

            <div className="border-l border-white/5 md:border-none pl-4 md:pl-0">
              <p className="text-[9px] tracking-[0.5em] text-[#8B5CF6] uppercase mb-4 font-black italic pl-[0.5em]">Email</p>
              <p className="text-sm font-black text-white tracking-[0.15em] uppercase">
                agstoreofc23@gmail.com
              </p>
            </div>

            <div className="border-l border-white/5 md:border-none pl-4 md:pl-0">
              <p className="text-[9px] tracking-[0.5em] text-[#8B5CF6] uppercase mb-4 font-black italic pl-[0.5em]">Base</p>
              <p className="text-sm font-black text-white tracking-[0.15em] uppercase italic">
                Piura, Perú
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer onPolicyClick={onPolicyClick} />
    </div>
  );
}