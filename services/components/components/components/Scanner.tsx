import React, { useRef, useEffect, useState } from 'react';
import { Camera, XCircle, CheckCircle } from 'lucide-react';
import { getCelebrationMessage } from '../services/geminiService';

interface ScannerProps {
  onScanSuccess: (customerId: string) => void;
  onClose: () => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScanSuccess, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [scanning, setScanning] = useState(true);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setStream(mediaStream);
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      } catch (err) {
        console.error("Error accessing camera:", err);
        setLastMessage("No se pudo acceder a la cámara.");
      }
    };
    startCamera();
    return () => { if (stream) stream.getTracks().forEach(track => track.stop()); };
  }, []);

  const handleSimulateScan = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setScanning(false);
    const msg = await getCelebrationMessage(Math.floor(Math.random() * 9) + 1);
    setLastMessage(msg);
    setTimeout(() => { onScanSuccess("user-001"); setIsProcessing(false); }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
        <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover opacity-80 ${!scanning ? 'blur-sm' : ''}`}/>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          {scanning ? (
            <>
              <div className="w-64 h-64 border-2 border-orange-500 rounded-lg relative animate-pulse shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-orange-500 -mt-1 -ml-1"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-orange-500 -mt-1 -mr-1"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-orange-500 -mb-1 -ml-1"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-orange-500 -mb-1 -mr-1"></div>
                <div className="w-full h-0.5 bg-red-500 absolute top-1/2 shadow-[0_0_10px_red] animate-[ping_1.5s_infinite]"></div>
              </div>
              <p className="mt-8 text-white text-lg font-medium bg-black/50 px-4 py-2 rounded-full">Escanea el QR del Cliente</p>
            </>
          ) : (
             <div className="bg-zinc-900 p-6 rounded-2xl flex flex-col items-center text-center animate-bounce">
                <CheckCircle size={64} className="text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">¡Escaneo Exitoso!</h3>
                <p className="text-zinc-400 italic">"{lastMessage}"</p>
             </div>
          )}
        </div>
        <button onClick={onClose} className="absolute top-6 right-6 text-white bg-black/40 p-2 rounded-full hover:bg-black/60 transition-colors"><XCircle size={32} /></button>
      </div>
      <div className="bg-zinc-900 p-6 pb-10 rounded-t-3xl border-t border-zinc-800">
        <div className="flex flex-col gap-3">
            <p className="text-xs text-center text-zinc-500 mb-2">*Modo Demo: Usa el botón abajo para simular lectura de QR*</p>
            <button onClick={handleSimulateScan} disabled={!scanning || isProcessing} className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"><Camera size={24} />{isProcessing ? 'Procesando...' : 'Simular Lectura de QR'}</button>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
