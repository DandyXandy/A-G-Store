import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, MessageCircle, Trash2 } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem }) {
  
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const phoneNumber = "51923610077"; // WhatsApp oficial do Alonso
    
    const itemsList = cartItems.map(item => 
      `- ${item.name} [Talla: ${item.selectedSize || 'M'}] (${item.price})`
    ).join('\n');
    
    const total = cartItems.reduce((acc, item) => {
      const priceValue = parseFloat(item.price.replace('S/ ', '').replace(',', '.')) || 0;
      return acc + priceValue;
    }, 0);

    const message = encodeURIComponent(
      `Hola A/G Store! 👋\n\nMe encantaron estas piezas de la colección y quiero realizar el pedido:\n\n${itemsList}\n\n*Total estimado: S/ ${total.toFixed(2)}*\n\n¿Me podrías confirmar la disponibilidad de las tallas y los datos para realizar el Yape/Plin? ¡Muchas gracias!`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY GLASS */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] cursor-pointer"
          />
          
          {/* PAINEL LATERAL PREMIUM */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="fixed right-0 top-0 h-[100dvh] w-full md:w-[440px] bg-[#050505] text-white z-[210] shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col border-l border-white/5"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center p-8 border-b border-white/5 bg-[#050505]">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ShoppingBag size={18} className="text-[#8B5CF6]" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-black text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                      {cartItems.length}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white">Tu Carrito</span>
              </div>
              
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-all duration-300 group outline-none cursor-pointer"
              >
                <X size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* LISTA DE COMPRAS */}
            <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30 select-none">
                  <ShoppingBag size={42} strokeWidth={1} className="mb-5 text-zinc-600" />
                  <p className="text-[9px] tracking-[0.5em] uppercase text-zinc-400 font-bold">El carrito está vacío</p>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  {cartItems.map((item, index) => {
                    // 💡 RESOLUÇÃO DO BUG: Busca primeiro no array de imagens novo, se não achar, usa o fallback
                    const itemImage = item.images?.[0] || item.image;

                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        key={`${item.id}-${index}`} 
                        className="flex gap-5 items-center group border-b border-white/[0.02] pb-6 last:border-none"
                      >
                        {/* Imagem Corrigida da Pasta */}
                        <div className="w-20 h-24 bg-zinc-900 overflow-hidden border border-white/5 flex-shrink-0 relative rounded-sm">
                          {itemImage ? (
                            <img 
                              src={itemImage} 
                              alt={item.name} 
                              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center opacity-30 text-[8px] italic font-black">
                              A/G
                            </div>
                          )}
                        </div>

                        {/* Detalhes */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[11px] font-black tracking-widest uppercase text-white truncate mb-1">{item.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[8px] bg-zinc-900 text-zinc-400 px-2 py-0.5 font-bold uppercase rounded-sm border border-white/5">
                              Talla: {item.selectedSize || 'M'}
                            </span>
                          </div>
                          <p className="text-[#8B5CF6] font-black text-xs italic tracking-wide">{item.price}</p>
                        </div>

                        {/* Botão de Deletar funcional */}
                        {onRemoveItem && (
                          <button 
                            onClick={() => onRemoveItem(index)}
                            className="text-zinc-600 hover:text-red-500 p-2 transition-colors duration-300 outline-none cursor-pointer"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* TOTALES E CHECKOUT */}
            <div className="p-8 bg-[#0a0a0a] border-t border-white/5 shadow-[0_-15px_40px_rgba(0,0,0,0.6)]">
              <div className="flex justify-between items-center mb-8 px-1">
                <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 font-bold">Total estimado</span>
                <span className="text-2xl font-black text-white italic tracking-tighter">
                  S/ {cartItems.reduce((acc, item) => acc + (parseFloat(item.price.replace('S/ ', '').replace(',', '.')) || 0), 0).toFixed(2)}
                </span>
              </div>
              
              <button 
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className={`w-full py-5 flex items-center justify-center gap-3 text-[10px] font-black tracking-[0.4em] uppercase transition-all duration-500 outline-none
                  ${cartItems.length === 0 
                    ? 'bg-zinc-900 text-zinc-700 cursor-not-allowed opacity-40' 
                    : 'bg-[#8B5CF6] text-white hover:bg-white hover:text-black hover:shadow-purple-neon cursor-pointer italic'}`}
              >
                <MessageCircle size={15} />
                Pedir por WhatsApp
              </button>
              
              <div className="mt-6 flex flex-col gap-2">
                <p className="text-[8px] text-zinc-600 text-center tracking-widest uppercase font-bold select-none">
                  💳 Medios locales autorizados: Yape • Plin • Efectivo
                </p>
                <p className="text-[8px] text={#8B5CF6]/80 text-center tracking-widest uppercase font-black animate-pulse select-none">
                  🚀 Envío inmediato disponible para Piura
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}