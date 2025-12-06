import React, { useState } from 'react';
import { getBurgerRecommendation } from '../services/geminiService';
import { BurgerRecommendation } from '../types';
import { ChefHat, Sparkles, Loader2, Utensils } from 'lucide-react';

const AIChef: React.FC = () => {
  const [mood, setMood] = useState('');
  const [recommendation, setRecommendation] = useState<BurgerRecommendation | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAskChef = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim()) return;
    setLoading(true);
    setRecommendation(null);
    const result = await getBurgerRecommendation(mood);
    setRecommendation(result);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-500/10 p-3 rounded-full"><ChefHat className="text-orange-500" size={32} /></div>
        <div><h2 className="text-2xl brand-font text-white">Ray Burger Bot</h2><p className="text-xs text-zinc-400">¿No sabes qué pedir? Déjame ayudarte.</p></div>
      </div>
      <form onSubmit={handleAskChef} className="space-y-4">
        <div>
            <label className="block text-sm text-zinc-400 mb-2">¿Cómo te sientes hoy?</label>
            <input type="text" value={mood} onChange={(e) => setMood(e.target.value)} placeholder="Ej: Hambriento, aventurero, triste..." className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"/>
        </div>
        <button type="submit" disabled={loading || !mood.trim()} className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-900/20 disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
            {loading ? 'El Chef está pensando...' : 'Sugerir Hamburguesa'}
        </button>
      </form>
      {recommendation && (
        <div className="mt-8 bg-zinc-950 border border-zinc-800 rounded-xl p-5 animate-[fadeIn_0.5s_ease-out]">
            <h3 className="text-xl text-orange-400 font-bold brand-font mb-2 flex items-center gap-2"><Utensils size={18} />{recommendation.name}</h3>
            <p className="text-zinc-300 text-sm mb-4 leading-relaxed">{recommendation.description}</p>
            <div className="space-y-2">
                <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Ingredientes:</p>
                <div className="flex flex-wrap gap-2">
                    {recommendation.ingredients.map((ing, idx) => (<span key={idx} className="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded-md border border-zinc-700">{ing}</span>))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AIChef;
