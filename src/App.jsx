import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Componentes del Layout
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import AnnouncementBar from "./components/AnnouncementBar";
import CartDrawer from "./components/CartDrawer";
import InfoModal from "./components/InfoModal";
import WhatsAppButton from "./components/WhatsAppButton";

// Secciones de la Home
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import ProductGrid from "./components/ProductGrid";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

// Vistas / Páginas Completas
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import ContactPage from "./pages/ContactPage";

function App() {
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    title: "",
    content: null,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800); // Mantenemos el tiempo elegante para la animación del Preloader Jordan 23

    return () => clearTimeout(timer);
  }, []);

  // Añadir al carrito preservando los atributos de Drop Premium (talla seleccionada)
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setIsCartOpen(true);
  };

  // Función crítica de remoción para sincronizar con el CartDrawer optimizado
  const handleRemoveItem = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  const openPolicy = (type) => {
    const policies = {
      envios: {
        title: "Logística y Entregas Flash",
        content: (
          <div className="space-y-8 py-4">
            <div className="border-l-2 border-[#8B5CF6] pl-6">
              <h4 className="text-[10px] font-black tracking-[0.4em] text-white uppercase mb-3">Despacho Inmediato (Piura)</h4>
              <p className="text-xs text-zinc-400 font-light uppercase tracking-wide leading-relaxed">
                Entregas prioritarias en la ciudad de Piura y Castilla en <span className="text-white font-bold">menos de 24 horas</span>. Coordinación personalizada directa a tu ubicación.
              </p>
            </div>

            <div className="border-l-2 border-white/10 pl-6">
              <h4 className="text-[10px] font-black tracking-[0.4em] text-white uppercase mb-3">Envíos Nacionales Autorizados</h4>
              <p className="text-xs text-zinc-400 font-light uppercase tracking-wide leading-relaxed">
                Despachamos de forma segura a todo el Perú vía <span className="text-white font-bold">Olva Courier o Shalom</span>. Monitoreo constante del estado de tu drop directo a tu WhatsApp.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-sm">
              <p className="text-[9px] text-[#8B5CF6] font-black tracking-[0.4em] uppercase text-center italic">
                A/G STORE • Distribución nacional exclusiva desde Piura
              </p>
            </div>
          </div>
        )
      },

      cambios: {
        title: "Garantía de Exclusividad A/G",
        content: (
          <div className="space-y-8 py-4">
            <div>
              <h4 className="text-[10px] font-black tracking-[0.4em] text-[#8B5CF6] uppercase mb-6 italic">Protocolo de Cambios</h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <span className="text-[10px] bg-white text-black w-5 h-5 rounded-full flex items-center justify-center font-black">1</span>
                  <p className="text-xs text-zinc-400 font-light uppercase tracking-wide">Cuentas con <span className="text-white font-bold">7 días calendario</span> desde la entrega para solicitar la gestión de cambio de talla.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-[10px] bg-white text-black w-5 h-5 rounded-full flex items-center justify-center font-black">2</span>
                  <p className="text-xs text-zinc-400 font-light uppercase tracking-wide">La prenda debe estar <span className="text-white font-bold">totalmente intacta, sin uso y con sus empaques</span> y etiquetas de edición limitada originales.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-[10px] bg-white text-black w-5 h-5 rounded-full flex items-center justify-center font-black">3</span>
                  <p className="text-xs text-zinc-400 font-light uppercase tracking-wide">Gestiones sujetas a disponibilidad de stock exclusivo. No se realizan devoluciones de efectivo.</p>
                </li>
              </ul>
            </div>
            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed">
              * Los costos de transporte originados por cambios fuera de la ciudad de Piura son asumidos por el cliente.
            </p>
          </div>
        )
      },

      privacidad: {
        title: "Protección de Datos & Confidencialidad",
        content: (
          <div className="space-y-8 py-4 text-center">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full border border-[#8B5CF6] flex items-center justify-center text-[#8B5CF6] font-black animate-pulse">!</div>
            </div>
            <div>
              <h4 className="text-[10px] font-black tracking-[0.4em] text-white uppercase mb-4 text-center">Privacidad de alta gama</h4>
              <p className="text-xs text-zinc-400 font-light uppercase tracking-wide leading-relaxed max-w-sm mx-auto">
                Tus datos de contacto están protegidos bajo estricto secreto comercial. Solo los utilizamos para procesar tus pedidos personalizados y optimizar tu experiencia en el <span className="text-[#8B5CF6] font-bold">A/G Club</span>.
              </p>
            </div>
            <div className="border-t border-white/5 pt-6">
              <p className="text-[9px] text-zinc-600 font-black tracking-widest uppercase">
                Encriptación Segura // Cero Spam // Privacidad Total Certificada
              </p>
            </div>
          </div>
        )
      }
    };

    setInfoModal({
      isOpen: true,
      title: policies[type].title,
      content: policies[type].content,
    });
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="loader" />}
      </AnimatePresence>

      <main
        className={`bg-[#050505] text-white min-h-screen w-full transition-opacity duration-1000 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <AnnouncementBar />

        <Navbar
          onCartClick={() => setIsCartOpen(true)}
          cartCount={cart.length}
        />

        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <Hero />

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <Manifesto />
                </motion.div>

                {/* FEATURED PRODUCTS (PREVIEW CATÁLOGO EN HOME) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="pb-32 bg-[#050505]"
                >
                  {/* 💡 Sincronizado para mostrar solo los 4 primeros conjuntos y no saturar la Home */}
                  <ProductGrid
                    onAddToCart={addToCart}
                    limit={4} 
                    categoryFilter="TODOS"
                  />

                  {/* BOTÓN PERSUASIVO EDITORIAL */}
                  <div className="text-center mt-12">
                    <Link
                      to="/shop"
                      className="inline-block bg-white text-black font-black text-[10px] tracking-[0.4em] px-14 py-5 uppercase hover:bg-[#8B5CF6] hover:text-white hover:shadow-purple-neon transition-all duration-500 italic rounded-sm"
                    >
                      Ver Colección Completa
                    </Link>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <FAQ />
                </motion.div>

                <Footer onPolicyClick={openPolicy} />
              </>
            }
          />

          {/* CATALOGO COMPLETO INTERACTIVO */}
          <Route
            path="/shop"
            element={
              <ShopPage
                onAddToCart={addToCart}
                onPolicyClick={openPolicy}
              />
            }
          />

          {/* DETALLE DE PRODUCTO CON GALERÍA DE 4 IMÁGENES */}
          <Route
            path="/product/:id"
            element={
              <ProductPage
                onAddToCart={addToCart}
                onPolicyClick={openPolicy}
              />
            }
          />

          {/* CONCIERGE / CONTACTO ENLACE SEGURO */}
          <Route
            path="/contacto"
            element={
              <ContactPage
                onPolicyClick={openPolicy}
              />
            }
          />
        </Routes>

        {/* 🛠️ Sincronizado handleRemoveItem para que el botón de eliminar del carrito funcione al 100% */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cart}
          onRemoveItem={handleRemoveItem}
        />

        <InfoModal
          isOpen={infoModal.isOpen}
          onClose={() => setInfoModal({ ...infoModal, isOpen: false })}
          title={infoModal.title}
          content={infoModal.content}
        />

        <WhatsAppButton />
      </main>
    </Router>
  );
}

export default App;