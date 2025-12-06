import React, { useState, useEffect } from 'react';
import { CustomerProfile, AppView, CartItem } from './types';
import LoyaltyCard from './components/LoyaltyCard';
import Scanner from './components/Scanner';
import AIChef from './components/AIChef';
import Menu from './components/Menu';
import SuggestionsBox from './components/SuggestionsBox';
import Confetti from './components/Confetti';
import { QrCode, Scan, Home, User, ChefHat, UserPlus, ArrowRight, LogOut, UtensilsCrossed, Ticket, MessageSquare, MapPin, Clock } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [regName, setRegName] = useState('');
  const [regLastName, setRegLastName] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('ray_burger_profile');
    if (stored) {
      try { setProfile(JSON.parse(stored)); } catch (e) { console.error("Error loading profile", e); }
    }
    const storedCart = localStorage.getItem('ray_burger_cart');
    if (storedCart) {
        try { setCart(JSON.parse(storedCart)); } catch (e) { console.error("Error loading cart", e); }
    }
  }, []);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('ray_burger_profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('ray_burger_profile');
    }
  }, [profile]);

  useEffect(() => {
      localStorage.setItem('ray_burger_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: { id: number | string, name: string, price: string }) => {
    setCart(prev => {
        const existing = prev.find(i => i.id === item.id);
        if (existing) {
            return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
        }
        return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number | string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: number | string, delta: number) => {
    setCart(prev => prev.map(i => {
        if (i.id === itemId) {
            return { ...i, quantity: Math.max(1, i.quantity + delta) };
        }
        return i;
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regLastName.trim()) return;

    const newProfile: CustomerProfile = {
      id: `user-${Date.now()}`,
      name: `${regName.trim()} ${regLastName.trim()}`,
      points: 0,
      rewardsAvailable: 0
    };

    setProfile(newProfile);
    setRegName('');
    setRegLastName('');
    setCurrentView(AppView.CUSTOMER);
  };

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      setProfile(null);
      setCurrentView(AppView.HOME);
    }
  };

  const handleClientEntry = () => {
    if (profile) {
      setCurrentView(AppView.CUSTOMER);
    } else {
      setCurrentView(AppView.REGISTER);
    }
  };

  const handleScanSuccess = (customerId: string) => {
    if (profile) {
        setProfile(prev => {
            if (!prev) return null;
            const newPoints = prev.points + 1;
            
            if (newPoints >= 10) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 4000);
                return { ...prev, points: 10, rewardsAvailable: prev.rewardsAvailable + 1 };
            }
            return { ...prev, points: newPoints };
        });
    }
  };

  const resetPoints = () => {
      if (window.confirm("¿Canjear cupón ahora?")) {
        setProfile(prev => prev ? ({ ...prev, points: 0, rewardsAvailable: Math.max(0, prev.rewardsAvailable - 1) }) : null);
        alert("¡Cupón canjeado exitosamente! Disfruta tu hamburguesa.");
      }
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME:
        return (
          <div className="flex flex-col items-center justify-center flex-1 text-center space-y-8 animate-[fadeIn_0.5s] w-full px-4 pb-24">
            <div className="relative w-full max-w-2xl mt-4">
                <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-20 rounded-full"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                    <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop" alt="Ray Burger Background" className="w-full h-72 object-cover opacity-80 hover:scale-105 transition-transform duration-700"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10 pointer-events-none">
                    <h1 className="text-7xl text-orange-500 font-black brand-font mb-0 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] leading-none transform -rotate-2">RAY BURGER</h1>
                    <h2 className="text-5xl text-white font-black brand-font tracking-[0.2em] drop-shadow-md leading-none">GRILL</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 w-full max-w-xs relative z-10">
              <button onClick={handleClientEntry} className="bg-white text-black hover:bg-zinc-200 font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)] group">
                <div className="bg-orange-100 p-2 rounded-full group-hover:bg-orange-200 transition-colors"><User className="text-orange-600" size={24} /></div>
                <div className="text-left"><span className="block text-xs text-zinc-500 uppercase font-bold">Acceso</span><span className="block text-lg leading-none">{profile ? 'Mi Membresía' : 'Soy Cliente'}</span></div>
              </button>
              <button onClick={() => setCurrentView(AppView.MENU)} className="bg-zinc-800 text-white hover:bg-zinc-700 font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 border border-zinc-700 transition-transform hover:scale-105"><UtensilsCrossed className="text-orange-400" /> Ver Menú</button>
              <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setCurrentView(AppView.AI_CHEF)} className="bg-gradient-to-br from-orange-900/80 to-red-900/80 backdrop-blur-sm text-white font-bold py-4 px-4 rounded-xl flex flex-col items-center justify-center gap-2 border border-red-800/50 transition-transform hover:scale-105"><ChefHat className="text-orange-300" size={24} /><span className="text-xs">Chef AI</span></button>
                  <button onClick={() => setCurrentView(AppView.SUGGESTIONS)} className="bg-zinc-800/80 text-white font-bold py-4 px-4 rounded-xl flex flex-col items-center justify-center gap-2 border border-zinc-700 transition-transform hover:scale-105 hover:bg-zinc-700"><MessageSquare className="text-blue-400" size={24} /><span className="text-xs">Sugerencias</span></button>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800 w-full flex flex-col items-center gap-2 text-zinc-500">
                  <div className="flex items-center gap-2 text-xs"><Clock size={12} /><span>Lun-Dom: 12:00 PM - 11:00 PM</span></div>
                  <div className="flex items-center gap-2 text-xs"><MapPin size={12} /><span>Av. Principal, Zona Grill</span></div>
              </div>
              <div className="mt-2 w-full flex justify-center"><button onClick={() => setCurrentView(AppView.ADMIN_SCANNER)} className="text-zinc-600 text-xs flex items-center gap-1 hover:text-zinc-400"><Scan size={12} /> Acceso Staff</button></div>
            </div>
          </div>
        );
      case AppView.REGISTER:
        return (
            <div className="w-full max-w-md px-4 pb-24 animate-[slideUp_0.4s]">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                    <div className="flex justify-center mb-6"><div className="bg-orange-500/20 p-4 rounded-full"><UserPlus size={40} className="text-orange-500" /></div></div>
                    <h2 className="text-3xl brand-font text-white text-center mb-2">Únete al Club</h2>
                    <p className="text-zinc-400 text-center text-sm mb-8">Regístrate para acumular puntos y ganar hamburguesas gratis.</p>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div><label className="block text-xs font-bold text-zinc-500 uppercase mb-1 ml-1">Nombre</label><input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="Tu nombre" required/></div>
                        <div><label className="block text-xs font-bold text-zinc-500 uppercase mb-1 ml-1">Apellido</label><input type="text" value={regLastName} onChange={(e) => setRegLastName(e.target.value)} className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="Tu apellido" required/></div>
                        <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl mt-4 flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)]">Registrarme <ArrowRight size={20} /></button>
                    </form>
                    <button onClick={() => setCurrentView(AppView.HOME)} className="w-full text-zinc-500 text-sm mt-6 hover:text-white transition-colors">Cancelar</button>
                </div>
            </div>
        );
      case AppView.CUSTOMER:
        if (!profile) return null;
        return (
          <div className="flex flex-col items-center gap-6 w-full px-4 pb-28 animate-[slideUp_0.4s]">
            <div className="w-full text-center pt-2 pb-2"><h2 className="text-xl text-zinc-400 brand-font tracking-widest mb-0">BIENVENIDO</h2><h1 className="text-5xl text-orange-500 brand-font drop-shadow-[0_0_15px_rgba(234,88,12,0.4)] leading-none uppercase truncate px-4">{profile.name}</h1></div>
            <LoyaltyCard profile={profile} />
            <div className="w-full max-w-md space-y-3">
                <h3 className="text-white font-bold text-sm ml-1 flex items-center gap-2"><Ticket size={16} className="text-orange-500" /> MIS RECOMPENSAS</h3>
                {profile.points >= 10 ? (
                    <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-0.5 rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.3)] animate-pulse">
                        <div className="bg-black rounded-[10px] p-4 flex justify-between items-center relative overflow-hidden">
                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-neutral-950 rounded-full"></div>
                            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-neutral-950 rounded-full"></div>
                            <div className="pl-4"><span className="block text-xs text-yellow-500 font-bold uppercase tracking-wider">¡Desbloqueado!</span><span className="text-2xl brand-font text-white">BURGER 2X1 GRATIS</span><p className="text-[10px] text-zinc-400">Válido en sucursal. Muestra este cupón.</p></div>
                            <button onClick={resetPoints} className="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-200 z-10">CANJEAR</button>
                        </div>
                    </div>
                ) : (<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center border-dashed"><p className="text-zinc-500 text-sm">Completa tus 10 compras para desbloquear un cupón 2x1.</p></div>)}
            </div>
            <button onClick={() => setShowQRModal(true)} className="bg-zinc-800 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 w-full max-w-md hover:bg-zinc-700 transition-colors border border-zinc-700"><QrCode size={20} /><span className="uppercase tracking-wide">Abrir mi Código QR</span></button>
          </div>
        );
      case AppView.MENU: return (<Menu cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />);
      case AppView.SUGGESTIONS: return <SuggestionsBox />;
      case AppView.AI_CHEF: return (<div className="flex flex-col items-center w-full px-4 pb-24 animate-[slideUp_0.4s]"><AIChef /></div>);
      default: return null;
    }
  };

  const BottomNav = () => {
    if ([AppView.ADMIN_SCANNER, AppView.REGISTER].includes(currentView)) return null;
    const navItems = [{ view: AppView.HOME, icon: Home, label: "Inicio" }, { view: AppView.MENU, icon: UtensilsCrossed, label: "Menú" }, { view: AppView.AI_CHEF, icon: ChefHat, label: "Chef" }, { view: AppView.CUSTOMER, icon: User, label: "Perfil" }];
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-neutral-950/90 backdrop-blur-lg border-t border-zinc-900 px-6 py-4 flex justify-between items-center z-50 safe-area-bottom">
            {navItems.map((item) => (
                <button key={item.label} onClick={() => { if (item.view === AppView.CUSTOMER && !profile) { setCurrentView(AppView.REGISTER); } else { setCurrentView(item.view); } }} className={`flex flex-col items-center gap-1 transition-colors relative ${currentView === item.view ? 'text-orange-500' : 'text-zinc-500 hover:text-zinc-300'}`}>
                    <div className="relative"><item.icon size={24} strokeWidth={currentView === item.view ? 2.5 : 2} />{item.view === AppView.MENU && cartCount > 0 && (<span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full border border-neutral-950 animate-pulse font-bold">{cartCount}</span>)}</div>
                    <span className="text-[10px] font-bold uppercase tracking-wide">{item.label}</span>
                </button>
            ))}
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-orange-500 selection:text-white flex flex-col">
      {showConfetti && <Confetti />}
      <header className="p-4 flex justify-between items-center border-b border-zinc-900 bg-neutral-950/95 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setCurrentView(AppView.HOME)}><div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center font-bold text-white brand-font text-2xl shadow-lg group-hover:scale-105 transition-transform">R</div><span className="font-bold brand-font text-xl tracking-wide text-zinc-100">RAY BURGER</span></div>
        {profile && currentView === AppView.CUSTOMER && (<button onClick={handleLogout} className="p-2 text-zinc-500 hover:text-red-500 transition-colors" title="Cerrar Sesión"><LogOut size={20} /></button>)}
      </header>
      <main className="pt-6 flex flex-col items-center w-full flex-1">{renderContent()}</main>
      <BottomNav />
      {currentView === AppView.ADMIN_SCANNER && (<Scanner onScanSuccess={(id) => { handleScanSuccess(id); }} onClose={() => setCurrentView(AppView.HOME)} />)}
      {showQRModal && profile && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex flex-col items-center justify-center p-4 backdrop-blur-md animate-[fadeIn_0.2s]">
            <div className="bg-white p-8 rounded-3xl max-w-sm w-full flex flex-col items-center text-center relative shadow-2xl">
                <button onClick={() => setShowQRModal(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-black"><Scan size={24} /></button>
                <div className="w-12 h-1 bg-zinc-200 rounded-full mb-6"></div><h3 className="text-3xl font-bold text-black brand-font mb-1">CÓDIGO RAY</h3><p className="text-zinc-500 text-sm mb-6 font-medium">Muestra este código al cajero</p>
                <div className="p-4 border-4 border-black rounded-2xl mb-6 shadow-inner bg-white"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${profile.id}`} alt="User QR" className="w-48 h-48 mix-blend-multiply"/></div>
                <p className="text-xs font-mono text-zinc-400 mb-6 bg-zinc-100 px-3 py-1 rounded">ID: {profile.id}</p>
                <button onClick={() => setShowQRModal(false)} className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-zinc-800 transition-colors shadow-lg">Listo, Cerrar</button>
            </div>
        </div>
      )}
    </div>
  );
}
