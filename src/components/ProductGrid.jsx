import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';

function ProductCard({ product, onAddToCart, navigate }) {
  const [activeImage, setActiveImage] = useState(product.images?.[0] || '');

  useEffect(() => {
    if (product.images?.length > 0) {
      setActiveImage(product.images[0]);
    }
  }, [product.images]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col"
    >
      {/* CONTAINER DE IMAGEN EDITORIAL */}
      <div 
        onClick={() => navigate(`/product/${product.id}`)}
        onMouseEnter={() => product.images?.[1] && setActiveImage(product.images[1])}
        onMouseLeave={() => setActiveImage(product.images?.[0])}
        className="aspect-[3/4] bg-[#0c0c0e] mb-6 overflow-hidden relative border border-white/5 cursor-pointer rounded-sm"
      >
        {/* BADGE DINÁMICO DE DROP */}
        <div className="absolute top-5 left-5 z-20 shadow-2xl">
          <span className="bg-[#8B5CF6] text-white text-[8px] tracking-[0.3em] px-4 py-2 font-black uppercase italic rounded-sm">
            {product.tag || "Edición A/G"}
          </span>
        </div>

        {/* FOTO ACTIVA DEL PRODUCTO */}
        <div className="w-full h-full relative flex items-center justify-center">
          {activeImage ? (
            <img 
              src={activeImage} 
              alt={product.name}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
          ) : (
            <span className="text-[11px] tracking-[0.6em] text-zinc-800 font-black italic uppercase transition-colors group-hover:text-[#8B5CF6]/20">
              A/G EXCLUSIVE
            </span>
          )}
        </div>

        {/* ACCIONES DESLIZANTES PREMIUM */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent md:opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 gap-3 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart({ ...product, selectedSize: 'M' });
            }}
            className="w-full bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] py-4 flex items-center justify-center gap-2 md:translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#8B5CF6] hover:text-white hover:shadow-purple-neon outline-none cursor-pointer italic"
          >
            <ShoppingCart size={13} /> Añadir al Carrito
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
            className="w-full bg-[#050505]/60 backdrop-blur-md text-white border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] py-4 flex items-center justify-center gap-2 md:translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75 hover:bg-white hover:text-black outline-none cursor-pointer italic"
          >
            Detalles <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* FICHA INFORMATIVA ULTRA-CLEAN */}
      <div 
        className="flex justify-between items-start px-1 cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div className="flex flex-col gap-2 min-w-0 flex-1 pr-4">
          <h4 className="text-[13px] md:text-[14px] tracking-wider font-black text-white uppercase group-hover:text-[#8B5CF6] transition-colors duration-300 truncate">
            {product.name}
          </h4>
          <div className="flex items-center gap-3">
            <span className="text-[9px] tracking-widest text-zinc-600 font-bold uppercase truncate">{product.color}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800 flex-shrink-0"></span>
            
            {/* ⭐️ SISTEMA DE ESTRELINHAS PRE-CONFIGURADO NO CATÁLOGO */}
            <div className="flex text-[#8B5CF6] items-center gap-0.5 flex-shrink-0 select-none">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
              <span className="text-[8px] text-zinc-500 font-black ml-1 tracking-tight">(5.0)</span>
            </div>
          </div>
        </div>

        {/* 📉 PRECIO TACHADO LOGIC (PROMOÇÃO) */}
        <div className="flex flex-col items-end flex-shrink-0">
          <div className="flex items-center gap-2">
            {product.oldPrice && (
              <span className="text-[11px] text-zinc-600 line-through tracking-tighter font-medium">
                {product.oldPrice}
              </span>
            )}
            <span className="text-[15px] md:text-[16px] font-black text-white tracking-tighter italic">
              {product.price}
            </span>
          </div>
          <span className="text-[7px] text-[#8B5CF6] tracking-[0.2em] uppercase mt-1 font-black italic">
            {product.oldPrice ? "Drop Promocional" : "Stock Activo"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductGrid({ onAddToCart, limit, categoryFilter = "TODOS" }) {
  const navigate = useNavigate();

  let displayedProducts = products;
  
  if (categoryFilter !== "TODOS") {
    displayedProducts = products.filter(p => p.category === categoryFilter);
  }

  if (limit) {
    displayedProducts = displayedProducts.slice(0, limit);
  }

  return (
    <section className="px-6 md:px-12 py-28 md:py-48 bg-[#050505] relative z-10" id="catalogo">
      
      {/* HEADER DE LA VITRINA */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-36 gap-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-[1px] bg-gradient-to-r from-[#8B5CF6] to-transparent"></div>
            <h2 className="text-[10px] md:text-[11px] tracking-[0.6em] text-[#8B5CF6] uppercase font-black italic pl-[0.6em]">
              Nueva Colección // Drops 2026
            </h2>
          </div>
          <h3 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.85]">
            ESTILO <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600">SIN LÍMITES</span>.
          </h3>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2 border-l border-white/5 md:border-l-0 md:border-r md:border-[#8B5CF6]/30 pl-4 md:pl-0 md:pr-6 py-1">
          <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase font-black">
            {displayedProducts.length} Piezas Visibles
          </p>
          <p className="text-[8px] tracking-[0.2em] text-[#8B5CF6] uppercase font-medium italic">Disponibilidad Inmediata</p>
        </div>
      </div>

      {/* GRID DE RESPONSIVIDAD DINÁMICA */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 md:gap-x-12 md:gap-y-36">
        {displayedProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
            navigate={navigate} 
          />
        ))}
      </div>

      {/* FOOTER DE SECCIÓN */}
      <div className="mt-40 border-t border-white/5 pt-12 flex flex-col items-center gap-6">
        <p className="text-[9px] md:text-[10px] tracking-[0.6em] text-zinc-600 uppercase font-bold text-center leading-relaxed pl-[0.6em]">
          A/G STORE • Piura, Perú • Calidad de Exportación
        </p>
        <div className="flex gap-4 select-none">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-900"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-900"></div>
        </div>
      </div>
    </section>
  );
}