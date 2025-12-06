import React, { useState } from 'react';
import { Lightbulb, Send, MessageSquare, ThumbsUp, Heart } from 'lucide-react';
// IMPORTAMOS LOS NÚMEROS DESDE TU ARCHIVO DE CONTROL
import { WHATSAPP_NUMBERS } from '../data/menuData';

const SuggestionsBox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'IMPROVE' | 'NEW_IDEA'>('IMPROVE');
  const [text, setText] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const randomNumber = WHATSAPP_NUMBERS[Math.floor(Math.random() * WHATSAPP_NUMBERS.length)];
    let message = "";
    
    if (activeTab === 'IMPROVE') {
        message = `👋 Hola Ray Burger, soy ${name || 'un cliente'}. Tengo una sugerencia para mejorar: ${text}`;
    } else {
        message = `💡 ¡Tengo una idea para una hamburguesa! Se llamaría: "${text}". Soy ${name || 'un cliente'}.`;
    }

    const url = `https://wa.me/${randomNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setText('');
  };

  return (
    <div className="w-full max-w-md px-4 pb-24 animate-[slideUp_0.4s]">
      <div className="text-center mb-8 pt-4">
        <h2 className="text-4xl brand-font text-white mb-2">TU OPINIÓN CUENTA</h2>
        <p className="text-zinc-400 text-sm">Ayúdanos a ser mejores cada día.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex border-b border-zinc-800">
            <button onClick={() => setActiveTab('IMPROVE')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'IMPROVE' ? 'bg-zinc-800 text-white' : 'bg-transparent text-zinc-500 hover:text-zinc-300'}`}><ThumbsUp size={16} /> Mejorar Servicio</button>
            <button onClick={() => setActiveTab('NEW_IDEA')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'NEW_IDEA' ? 'bg-orange-600/20 text-orange-500' : 'bg-transparent text-zinc-500 hover:text-zinc-300'}`}><Lightbulb size={16} /> Idea de Burger</button>
        </div>
        <div className="p-6">
            <div className="mb-6 text-center">
                {activeTab === 'IMPROVE' ? (
                    <div className="bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"><MessageSquare size={32} className="text-white" /></div>
                ) : (
                    <div className="bg-orange-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"><Heart size={32} className="text-orange-500 animate-pulse" /></div>
                )}
                <h3 className="text-xl font-bold text-white mb-1">{activeTab === 'IMPROVE' ? '¿Qué podemos mejorar?' : 'Crea tu Hamburguesa'}</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">{activeTab === 'IMPROVE' ? 'Cuéntanos tu experiencia, quejas o felicitaciones. Te leemos directamente.' : '¿Tienes una combinación loca en mente? Si a muchos les gusta, ¡la haremos realidad!'}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div><label className="block text-xs font-bold text-zinc-500 uppercase mb-1 ml-1">Tu Nombre (Opcional)</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors text-sm" placeholder="Ej. Juan Pérez"/></div>
                <div><label className="block text-xs font-bold text-zinc-500 uppercase mb-1 ml-1">{activeTab === 'IMPROVE' ? 'Tu Mensaje' : 'Describe tu idea deliciosa'}</label><textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors text-sm h-32 resize-none" placeholder={activeTab === 'IMPROVE' ? "La música estaba muy alta..." : "Pan de ajo, doble carne, aros de cebolla y..."} required/></div>
                <button type="submit" className={`w-full font-bold py-4 rounded-xl mt-2 flex items-center justify-center gap-2 transition-all shadow-lg ${activeTab === 'IMPROVE' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-orange-600 text-white hover:bg-orange-500 shadow-orange-900/30'}`}><Send size={18} />{activeTab === 'IMPROVE' ? 'Enviar Sugerencia' : 'Proponer Idea'}</button>
            </form>
            <p className="text-[10px] text-zinc-600 text-center mt-4">*Al enviar, se abrirá tu WhatsApp con el mensaje listo.</p>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsBox;
