import React, { useEffect, useRef, useState } from "react";
import { Instagram, MessageCircle, Mail, MapPin } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function Footer({ onPolicyClick = () => {} }) {
    const ref = useRef(null);
    const formNewsletter = useRef();
    const [impact, setImpact] = useState(false);
    
    const [subscribing, setSubscribing] = useState(false);
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setImpact(true);
                }
            },
            { threshold: 0.2 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleNewsletter = (e) => {
        e.preventDefault();
        setSubscribing(true);

        emailjs.sendForm(
            'service_eax7s1l', 
            'template_z2xkh9l', 
            formNewsletter.current, 
            '8-r-ws-zQLPMk3WKu'
        )
        .then(() => {
            setSubscribing(false);
            setStatus('success');
            formNewsletter.current.reset();
            setTimeout(() => setStatus('idle'), 5000);
        }, (error) => {
            setSubscribing(false);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        });
    };

    return (
        <footer
            ref={ref}
            className="relative bg-[#050505] text-white mt-40 overflow-hidden border-t border-white/5"
        >
            {/* Efeito de Luz Morada no Fundo */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[-100px] w-[600px] h-[300px] bg-[#8B5CF6] blur-[150px] opacity-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-8 pt-32 pb-16 relative z-10">

                {/* SEÇÃO NEWSLETTER / A/G CLUB */}
                <div className="flex flex-col items-center text-center mb-32">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-[1px] bg-[#8B5CF6]"></div>
                        <span className="text-[10px] tracking-[0.4em] text-[#8B5CF6] font-black uppercase">Acceso Exclusivo</span>
                        <div className="w-8 h-[1px] bg-[#8B5CF6]"></div>
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8">
                        ÚNETE AL <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 text-[#8B5CF6]">A/G CLUB</span>
                    </h2>

                    <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] mb-12 max-w-md leading-relaxed">
                        Sé el primero en recibir drops exclusivos y preventas limitadas de A/G.
                    </p>

                    <form 
                        ref={formNewsletter}
                        onSubmit={handleNewsletter}
                        className="flex flex-col md:flex-row w-full max-w-lg gap-0 border border-white/10 p-1 bg-white/[0.02] backdrop-blur-md"
                    >
                        <input type="hidden" name="from_name" value="SUSCRIPTOR A/G CLUB" />
                        <input type="hidden" name="message" value="Nuevo miembro del A/G Club vía Footer." />

                        <input
                            name="from_email"
                            type="email"
                            required
                            placeholder="TU MEJOR EMAIL"
                            className="flex-1 bg-transparent px-6 py-4 text-[10px] tracking-[0.2em] focus:outline-none transition uppercase font-bold text-white placeholder:text-zinc-700"
                        />

                        <button 
                            type="submit"
                            disabled={subscribing || status === 'success'}
                            className={`px-10 py-4 text-[10px] tracking-[0.2em] uppercase font-black transition-all duration-700 ${
                                status === 'success' 
                                ? 'bg-green-600 text-white' 
                                : 'bg-[#8B5CF6] text-white hover:bg-white hover:text-black'
                            }`}
                        >
                            {subscribing ? "..." : status === 'success' ? "LISTO" : "SUSCRIBIRME"}
                        </button>
                    </form>
                </div>

                {/* COLUNAS DE LINKS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/5 pt-20">
                    
                    {/* Brand Info */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-xl font-black tracking-tighter mb-6 italic uppercase">A<span className="text-[#8B5CF6]">/</span>G Store</h3>
                        <p className="text-[10px] text-zinc-500 tracking-widest leading-loose uppercase italic">
                            Redefiniendo el estilo urbano de lujo desde Piura para todo el Perú.
                        </p>
                    </div>

                    {/* Ayuda */}
                    <div>
                        <h4 className="text-[10px] font-black tracking-[0.4em] uppercase mb-8 text-[#8B5CF6]">Soporte</h4>
                        <ul className="space-y-4 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                            <li onClick={() => onPolicyClick('envios')} className="hover:text-white transition cursor-pointer">Envíos Flash</li>
                            <li onClick={() => onPolicyClick('cambios')} className="hover:text-white transition cursor-pointer">Cambios</li>
                            <li onClick={() => onPolicyClick('terminos')} className="hover:text-white transition cursor-pointer">Términos</li>
                        </ul>
                    </div>

                    {/* Redes */}
                    <div>
                        <h4 className="text-[10px] font-black tracking-[0.4em] uppercase mb-8 text-[#8B5CF6]">Conectar</h4>
                        <div className="flex gap-3">
                            <a href="https://www.instagram.com/agstoreofc23/" target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/5 flex items-center justify-center hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition duration-500">
                                <Instagram size={16} />
                            </a>
                            <a href="https://wa.me/51923610077" target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/5 flex items-center justify-center hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition duration-500">
                                <MessageCircle size={16} />
                            </a>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-zinc-600">
                            <MapPin size={12} className="text-[#8B5CF6]" />
                            <span className="text-[9px] font-black tracking-widest uppercase italic">Piura, Perú</span>
                        </div>
                    </div>

                    {/* Pago */}
                    <div className="flex flex-col md:items-end">
                        <h4 className="text-[10px] font-black tracking-[0.4em] uppercase mb-8 text-[#8B5CF6]">Pagos Seguros</h4>
                        <div className="flex flex-wrap md:justify-end gap-2">
                            {["YAPE", "PLIN", "EFECTIVO", "VISA"].map(pago => (
                                <span key={pago} className="border border-white/5 px-3 py-2 text-[9px] font-black tracking-tighter text-zinc-500 hover:text-white hover:border-white transition duration-500 italic">
                                    {pago}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FOOTER BOTTOM */}
                <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 font-bold">
                        A/G STORE © 2026 • PIURA PERÚ • ALL RIGHTS RESERVED
                    </p>
                    <div className="flex gap-4">
                        <div className="h-1 w-8 bg-zinc-900"></div>
                        <div className="h-1 w-8 bg-[#8B5CF6]/50"></div>
                        <div className="h-1 w-8 bg-zinc-900"></div>
                    </div>
                </div>
            </div>
            
            {/* Linha de luz final sutil no rodapé */}
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-20"></div>
        </footer>
    );
}