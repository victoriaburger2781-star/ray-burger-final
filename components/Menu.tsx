import React, { useState } from 'react';
import { Star, ShoppingBag, Clock, Sparkles, Plus, Minus, ShoppingCart, X } from 'lucide-react';
import { CartItem } from '../types';
// IMPORTAMOS TUS DATOS
import { WHATSAPP_NUMBERS, WEEKLY_SPECIAL, MENU_ITEMS, CATEGORIES } from '../data/menuData';

interface MenuProps {
  cart: CartItem[];
  addToCart: (item: { id: number | string, name: string, price: string }) => void;
  removeFromCart: (itemId: number | string) => void;
  updateQuantity: (itemId: number | string, delta: number) => void;
}

const Menu: React.FC<MenuProps> = ({ cart, addToCart, removeFromCart, updateQuantity }) => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredItems = activeCategory === "Todos" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const parsePrice = (priceStr: string) => parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  const totalPrice = cart.reduce((sum, item) => sum + (parsePrice(item.price) * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const randomNumber = WHATSAPP_NUMBERS[Math.floor(Math.random() * WHATSAPP_NUMBERS.length)];
    let message = "¡Hola Ray Burger Grill! 🍔\nMe gustaría realizar el siguiente pedido:\n\n";
    cart.forEach(item => {
        message += `▪️ ${item.quantity}x ${item.name} (${item.price})\n`;
    });
    message += `\n💰 *Total Estimado: $${totalPrice}*`;
    message += "\n\nQuedo atento a la confirmación y métodos de pago.";
    window.open(`https://wa.me/${randomNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleAdd = (item: typeof MENU_ITEMS[0]) => {
      addToCart({ id: item.id, name: item.name, price: item.price });
  };
  
  const handleAddSpecial = () => {
      addToCart({ id: 'special', name: WEEKLY_SPECIAL.name, price: WEEKLY_SPECIAL.price });
  };

  return (
    <div className="w-full max-w-md px-4 pb-32 animate-[fadeIn_0.5s]">
      <div className="text-center mb-8 pt-4">
        <h2 className="text-5xl brand-font text-orange-500 mb-1 drop-shadow-md tracking-wide">MENÚ</h2>
        <div className="h-1 w-16 bg-orange-600 mx-auto rounded-full mb-2"></div>
        <p className="text-zinc-400 text-sm font-medium">Sabor auténtico al carbón 🔥</p>
      </div>

      <div className="sticky top-[70px] z-30 bg-neutral-950/95 backdrop-blur-md py-3 -mx-4 px-4 border-b border-zinc-800/50 mb-6 flex gap-2 overflow-x-auto no-scrollbar shadow-sm">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border ${
              activeCategory === cat 
                ? 'bg-orange-600 text-white border-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.4)] transform scale-105' 
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {WEEKLY_SPECIAL.active && (activeCategory === "Todos" || activeCategory === "Hamburguesas") && (
            <div className="relative rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(234,179,8,0.3)] border-2 border-yellow-500/50 group transform hover:scale-[1.02] transition-all duration-500">
                <div className="absolute top-0 right-0 z-20 bg-yellow-500 text-black font-black text-xs px-3 py-1 rounded-bl-xl uppercase flex items-center gap-1">
                    <Clock size={12} /> Tiempo Limitado
                </div>
                <div className="relative h-64 overflow-hidden">
                    <img src={WEEKLY_SPECIAL.image} alt={WEEKLY_SPECIAL.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-center gap-2 mb-2">
                             <Sparkles className="text-yellow-400 animate-pulse" size={20} />
                             <span className="text-yellow-400 font-bold tracking-widest text-xs uppercase">Especial de la Semana</span>
                        </div>
                        <h3 className="text-4xl brand-font text-white drop-shadow-lg leading-none mb-1">{WEEKLY_SPECIAL.name}</h3>
                        <p className="text-zinc-200 text-sm mb-3 line-clamp-2">{WEEKLY_SPECIAL.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-yellow-500">{WEEKLY_SPECIAL.price}</span>
                            <button onClick={handleAddSpecial} className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg text-sm hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-lg"><Plus size={18} /> Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {filteredItems.map((item) => (
          <div key={item.id} className="bg-zinc-900 rounded-2xl overflow-hidden shadow-xl border border-zinc-800 hover:border-orange-500/50 transition-all group relative">
            <div className="relative h-52 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-90"></div>
              {item.popular && (
                <div className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg z-10 uppercase tracking-wider"><Star size={10} fill="currentColor" /> Top Seller</div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                 <div className="flex justify-between items-end mb-1">
                    <h3 className="text-3xl brand-font text-white drop-shadow-lg leading-none">{item.name}</h3>
                    <span className="text-xl font-bold text-white bg-orange-600/90 backdrop-blur-md px-3 py-1 rounded-lg shadow-lg">{item.price}</span>
                 </div>
                 <span className="text-[10px] text-zinc-300 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm uppercase tracking-wide">{item.category}</span>
              </div>
            </div>
            <div className="p-5 pt-3">
              <p className="text-zinc-400 text-sm leading-relaxed mb-5 line-clamp-2 min-h-[40px]">{item.description}</p>
              <button onClick={() => handleAdd(item)} className="w-full py-3.5 rounded-xl bg-zinc-800 text-white font-bold text-sm hover:bg-zinc-700 transition-all duration-300 flex items-center justify-center gap-2 border border-zinc-700 hover:border-orange-500 hover:text-orange-500"><Plus size={18} /> Agregar al Pedido</button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
          <div className="fixed bottom-24 left-4 right-4 z-50">
              <button onClick={() => setIsCartOpen(true)} className="w-full bg-green-600 hover:bg-green-500 text-white p-4 rounded-2xl shadow-2xl flex justify-between items-center transition-transform hover:scale-[1.02] border border-green-500">
                  <div className="flex items-center gap-3">
                      <div className="bg-white/20 px-3 py-1 rounded-lg font-bold">{cart.reduce((acc, item) => acc + item.quantity, 0)}</div>
                      <span className="font-bold text-lg">Ver Pedido</span>
                  </div>
                  <span className="font-bold text-xl">${totalPrice}</span>
              </button>
          </div>
      )}

      {isCartOpen && (
          <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex flex-col justify-end sm:justify-center p-0 sm:p-4 animate-[fadeIn_0.2s]">
              <div className="bg-zinc-900 w-full max-w-md mx-auto h-[85vh] sm:h-auto sm:rounded-3xl rounded-t-3xl border border-zinc-800 flex flex-col shadow-2xl overflow-hidden">
                  <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
                      <h2 className="text-2xl brand-font text-white flex items-center gap-2"><ShoppingCart className="text-orange-500" /> Tu Pedido</h2>
                      <button onClick={() => setIsCartOpen(false)} className="bg-zinc-800 p-2 rounded-full hover:bg-zinc-700"><X size={20} /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      {cart.map(item => (
                          <div key={item.id} className="bg-black/50 p-4 rounded-xl flex justify-between items-center border border-zinc-800">
                              <div><h4 className="font-bold text-white">{item.name}</h4><p className="text-orange-500 text-sm font-bold">{item.price}</p></div>
                              <div className="flex items-center gap-3 bg-zinc-800 rounded-lg p-1">
                                  <button onClick={() => item.quantity > 1 ? updateQuantity(item.id, -1) : removeFromCart(item.id)} className="p-1 hover:text-red-400 transition-colors"><Minus size={16} /></button>
                                  <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-green-400 transition-colors"><Plus size={16} /></button>
                              </div>
                          </div>
                      ))}
                  </div>
                  <div className="p-6 bg-zinc-900 border-t border-zinc-800 space-y-4">
                      <div className="flex justify-between items-end"><span className="text-zinc-400 text-sm">Total Estimado</span><span className="text-4xl brand-font text-white">${totalPrice}</span></div>
                      <button onClick={handleCheckout} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"><ShoppingBag size={20} /> Enviar Pedido por WhatsApp</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Menu;
