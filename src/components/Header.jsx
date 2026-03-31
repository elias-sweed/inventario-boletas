import React from 'react';
import { supabase } from '../utils/supabase';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-40 border-b border-slate-800">
      <div className="max-w-275 mx-auto px-6 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo Jiménez Pimentel" className="w-11 h-11 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
          <div className="flex flex-col">
            <h1 className="font-display text-[16px] font-bold tracking-wide leading-tight text-white">I.E.E. Jiménez Pimentel</h1>
            <span className="text-[10px] text-slate-400 font-sans tracking-widest uppercase">Sistema de Recibos</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          
          {/* Fecha */}
          <div className="hidden md:block px-4 py-1.5 bg-slate-800 rounded-full border border-slate-700 text-slate-300 shadow-inner">
            📅 {new Date().toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'short' })}
          </div>

          {/* Botón de Cerrar Sesión */}
          <button 
            onClick={() => supabase.auth.signOut()} 
            className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600 cursor-pointer text-slate-300 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all shadow-sm" 
            title="Cerrar sesión"
          >
            ✕
          </button>
        </div>

      </div>
      
      {/* Línea decorativa dorada inferior */}
      <div className="h-0.75 w-full bg-linear-to-r from-slate-900 via-[var(--color-gold)] to-slate-900"></div>
    </header>
  );
}