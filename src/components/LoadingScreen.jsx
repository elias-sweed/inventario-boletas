import React from 'react';
import { Velustro } from "uvcanvas";
import logo from '../assets/logo.png';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative p-4">
      {/* ✨ El fondo animado de Velustro */}
      <div className="absolute inset-0 z-[-1]">
        <Velustro />
      </div>

      {/* Contenedor cristalino centrado */}
      <div className="bg-slate-900/60 backdrop-blur-lg p-10 rounded-2xl shadow-2xl flex flex-col items-center border border-slate-700/50 relative z-10 animate-[slideUp_0.5s_ease]">
        
        {/* Logo con leve animación de respiración */}
        <img 
          src={logo} 
          alt="Logo Jiménez Pimentel" 
          className="w-24 h-24 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-pulse" 
        />
        
        {/* Spinner animado dorado */}
        <div className="w-12 h-12 border-4 border-slate-600 border-t-[var(--color-gold)] rounded-full animate-spin mb-5"></div>
        
        <h2 className="font-display text-xl font-bold text-white tracking-wide">Ingresando al sistema...</h2>
        <p className="text-slate-400 text-xs mt-2 uppercase tracking-[0.2em] font-bold">Por favor, espere</p>
      </div>
    </div>
  );
}