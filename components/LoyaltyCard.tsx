import React from 'react';
import { CustomerProfile } from '../types';
import { Gift, Flame } from 'lucide-react';

interface LoyaltyCardProps {
  profile: CustomerProfile;
}

const LoyaltyCard: React.FC<LoyaltyCardProps> = ({ profile }) => {
  const totalSlots = 10;
  const progress = (profile.points / totalSlots) * 100;

  return (
    <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-6 shadow-2xl border border-zinc-800 relative overflow-hidden group">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1000&auto=format&fit=crop" alt="Hamburguesa al carbón" className="w-full h-full object-cover opacity-25 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000"/>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/90 to-zinc-900/80"></div>
      </div>
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-20 animate-pulse z-0"></div>
      <div className="flex justify-end items-center mb-6 relative z-10">
        <div className="text-right">
          <span className="block text-4xl font-bold text-orange-500 brand-font drop-shadow-md">{profile.points}/{totalSlots}</span>
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Compras</span>
        </div>
      </div>
      <div className="w-full bg-zinc-800/80 backdrop-blur-sm rounded-full h-4 mb-8 overflow-hidden relative z-10 border border-zinc-700/50">
        <div className="bg-gradient-to-r from-orange-600 to-yellow-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(249,115,22,0.5)]" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="grid grid-cols-5 gap-3 mb-6 relative z-10">
        {Array.from({ length: totalSlots }).map((_, index) => {
          const isActive = index < profile.points;
          const isLast = index === totalSlots - 1;
          return (
            <div key={index} className={`aspect-square rounded-full flex items-center justify-center border-2 transition-all duration-300 backdrop-blur-sm ${isActive ? 'bg-orange-600/90 border-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)] transform scale-105' : 'bg-zinc-800/80 border-zinc-700/50 text-zinc-500'}`}>
              {isLast ? (<Gift size={20} className={isActive ? 'animate-bounce' : ''} />) : isActive ? (<Flame size={20} fill="currentColor" />) : (<span className="text-sm font-bold">{index + 1}</span>)}
            </div>
          );
        })}
      </div>
      <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-zinc-700/50 text-center relative z-10">
        {profile.points >= 10 ? (<div><h3 className="text-xl text-yellow-400 brand-font mb-1 animate-pulse">¡RECOMPENSA DISPONIBLE!</h3><p className="text-xs text-zinc-200">Revisa tu cupón abajo.</p></div>) : (<div><h3 className="text-lg text-white brand-font mb-1">Próxima Meta: {totalSlots} Compras</h3><p className="text-xs text-zinc-300">Te faltan {totalSlots - profile.points} para tu recompensa.</p></div>)}
      </div>
    </div>
  );
};

export default LoyaltyCard;
