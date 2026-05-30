import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { Star, Truck, ShieldCheck, MessageCircle, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

function ProductGallery({ images, name }) {
    const [mainImage, setMainImage] = useState(images?.[0] || '');

    useEffect(() => {
        if (images && images.length > 0) {
            setMainImage(images[0]);
        }
    }, [images]);

    return (
        <div className="flex flex-col md:flex-row-reverse gap-6">
            <div className="flex-1 aspect-[3/4] bg-[#0c0c0e] border border-white/5 relative overflow-hidden group rounded-sm">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={mainImage}
                        src={mainImage}
                        alt={name}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                </AnimatePresence>
                
                <div className="absolute top-8 left-8 bg-[#8B5CF6] text-white text-[8px] font-black px-4 py-2 tracking-[0.3em] uppercase z-10 shadow-2xl italic rounded-sm">
                    Calidad Exportación
                </div>
            </div>

            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-visible pb-4 md:pb-0 scrollbar-hide">
                {images?.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setMainImage(img)}
                        className={`w-20 h-24 md:w-28 md:h-36 flex-shrink-0 border transition-all duration-500 rounded-sm overflow-hidden outline-none cursor-pointer ${
                            mainImage === img 
                            ? 'border-[#8B5CF6] scale-95 shadow-[0_0_20px_rgba(139,92,246,0.25)]' 
                            : 'border-white/5 opacity-30 hover:opacity-100'
                        }`}
                    >
                        <img src={img} alt={`${name} ${index}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function ProductPage({ onAddToCart, onPolicyClick }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find((p) => p.id === parseInt(id));
    const [selectedSize, setSelectedSize] = useState('M');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div className="h-screen bg-[#050505] flex flex-col items-center justify-center font-black gap-6 text-zinc-700 uppercase tracking-[0.5em] italic">
                <p>Drop Agotado</p>
                <button 
                  onClick={() => navigate('/shop')} 
                  className="text-[#8B5CF6] text-[10px] tracking-[0.3em] uppercase underline hover:text-white transition-colors outline-none"
                >
                  Volver al catálogo
                </button>
            </div>
        );
    }

    const productImages = Array.isArray(product.images) ? product.images : [product.image];

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="pt-44 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[9px] font-black tracking-[0.4em] uppercase mb-16 text-zinc-600 hover:text-[#8B5CF6] transition-all group outline-none"
                >
                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Volver atrás
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-40">
                    <ProductGallery images={productImages} name={product.name} />

                    <div className="flex flex-col justify-center">
                        <div className="mb-4 flex items-center gap-4 select-none">
                            <span className="text-[9px] font-black text-[#8B5CF6] tracking-[0.4em] uppercase italic">{product.tag || "Edición Limitada"}</span>
                            <div className="h-[1px] w-16 bg-white/10"></div>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6 leading-[0.9] text-white">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-6 mb-10 select-none">
                            <div className="flex text-[#8B5CF6] gap-1">
                                {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
                            </div>
                            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] italic">Drop 001 // {product.category}</span>
                        </div>

                        {/* 📉 DETALHE DE PREÇO PROMOCIONAL EXTENDIDO */}
                        <div className="flex items-baseline gap-4 mb-12">
                            {product.oldPrice && (
                                <span className="text-xl text-zinc-600 line-through tracking-tighter font-bold italic">
                                    {product.oldPrice}
                                </span>
                            )}
                            <p className="text-4xl md:text-5xl font-black text-white tracking-tighter italic">
                                {product.price}
                            </p>
                        </div>

                        <div className="mb-12 space-y-6">
                            <h4 className="text-[9px] tracking-[0.4em] text-zinc-600 font-black uppercase">Ficha de Diseño</h4>
                            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed uppercase tracking-widest font-light italic max-w-lg">
                                {product.description}
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                {product.features?.map((feat) => (
                                    <li key={feat} className="flex items-center gap-3 text-[9px] md:text-[10px] font-black text-zinc-500 uppercase italic tracking-wider">
                                        <CheckCircle2 size={13} className="text-[#8B5CF6] flex-shrink-0" /> {feat}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* SELECTOR DE TALLAS */}
                        <div className="space-y-10 mb-16">
                            <div>
                                <h4 className="text-[9px] tracking-[0.4em] text-zinc-600 font-black uppercase mb-6">Seleccionar Talla</h4>
                                <div className="flex gap-4">
                                    {['S', 'M', 'L', 'XL'].map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-14 h-14 border font-black text-[11px] transition-all duration-500 rounded-full outline-none cursor-pointer ${
                                                selectedSize === size 
                                                ? 'border-[#8B5CF6] bg-[#8B5CF6] text-white shadow-[0_0_25px_rgba(139,92,246,0.4)]' 
                                                : 'border-white/10 hover:border-white text-zinc-600'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* ⚡️ BOTÕES DE COMPRA REESTRUTURADOS COM 'COMPRE AHORA' */}
                            <div className="flex flex-col gap-4">
                                <motion.a
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    href={`https://wa.me/51923610077?text=${encodeURIComponent(`¡PEDIDO COMPRA RÁPIDA! 🚀\n\nHola A/G Store, quiero adquirir inmediatamente este drop exclusivo:\n- *${product.name}*\n- Talla: *${selectedSize}*\n- Precio: *${product.price}*\n\nPor favor, confirmame stock para coordinar el pago rápido por Yape/Plin. ¡Listo para enviar desde Piura!`)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full bg-[#8B5CF6] text-white py-6 font-black uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-3 hover:bg-white hover:text-black hover:shadow-purple-neon transition-all duration-500 rounded-sm italic outline-none pl-[0.4em]"
                                >
                                    <MessageCircle size={15} /> ⚡ Compre Ahora // Envío Flash
                                </motion.a>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => onAddToCart({ ...product, selectedSize })}
                                    className="w-full bg-white text-black py-5 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-zinc-900 hover:text-white transition-all duration-500 rounded-sm italic cursor-pointer outline-none pl-[0.4em] border border-white/5 bg-white/[0.01]"
                                >
                                    Añadir a la cesta
                                </motion.button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/5 pt-12">
                            <div 
                              onClick={() => onPolicyClick('envios')}
                              className="flex items-start gap-4 p-5 rounded-sm bg-white/[0.01] border border-white/[0.02] hover:border-[#8B5CF6]/30 transition-all duration-500 cursor-pointer group"
                            >
                                <Truck className="text-[#8B5CF6] group-hover:scale-110 transition-transform duration-300 flex-shrink-0" size={20} />
                                <div>
                                    <h5 className="text-[10px] font-black uppercase mb-1 tracking-widest text-white">Envío Inmediato</h5>
                                    <p className="text-[9px] text-zinc-500 leading-tight font-bold uppercase italic">Todo Piura en 24h. Clic para ver más.</p>
                                </div>
                            </div>
                            <div 
                              onClick={() => onPolicyClick('cambios')}
                              className="flex items-start gap-4 p-5 rounded-sm bg-white/[0.01] border border-white/[0.02] hover:border-[#8B5CF6]/30 transition-all duration-500 cursor-pointer group"
                            >
                                <ShieldCheck className="text-[#8B5CF6] group-hover:scale-110 transition-transform duration-300 flex-shrink-0" size={20} />
                                <div>
                                    <h5 className="text-[10px] font-black uppercase mb-1 tracking-widest text-white">Garantía A/G</h5>
                                    <p className="text-[9px] text-zinc-500 leading-tight font-bold uppercase italic">Calidad estructural certificada.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-24">
                    <h3 className="text-2xl md:text-3xl font-black italic uppercase mb-16 tracking-tighter">Voces <span className="text-[#8B5CF6]">Exclusivas</span></h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { name: "Carlos M.", text: "La textura del tejido pesado es de otro nivel. La prenda armada mantiene una caída estructural perfecta en los hombros." },
                            { name: "Renzo G.", text: "Atención premium y personalizada por WhatsApp. El despacho aquí en Piura me llegó en menos de un día." },
                            { name: "Kevin L.", text: "Acabados limpios y un calce oversized perfecto para la cultura urbana. Vale totalmente cada Sol." }
                        ].map((review, i) => (
                            <div key={i} className="bg-white/[0.01] border border-white/[0.02] p-10 border-b border-b-[#8B5CF6]/30 hover:bg-white/[0.03] transition-all duration-500 rounded-sm">
                                <div className="flex text-[#8B5CF6] mb-6 gap-1">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                                </div>
                                <p className="text-[11px] text-zinc-400 uppercase font-bold mb-6 tracking-widest leading-relaxed italic">"{review.text}"</p>
                                <span className="text-[8px] font-black uppercase text-white tracking-[0.3em]">— {review.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer onPolicyClick={onPolicyClick} />
        </div>
    );
}