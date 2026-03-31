import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import logo from '../assets/logo.png';
import { Novatrix } from "uvcanvas"; // ✨ IMPORTAMOS EL NUEVO FONDO

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4">
      
      {/* ✨ EL FONDO ANIMADO DE NOVATRIX */}
      <div className="absolute inset-0 z-[-1]">
        <Novatrix />
      </div>

      {/* TARJETA DE LOGIN CON EFECTO CRISTAL (Glassmorphism) */}
      <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-700 border-t-4 border-t-[var(--color-gold)] relative z-10">
        
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Logo" className="w-20 h-20 mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
          <h2 className="font-display text-2xl font-bold text-white text-center">I.E.E. Jiménez Pimentel</h2>
          <p className="text-sm text-slate-400 mt-1 uppercase tracking-widest font-bold">Acceso al Sistema</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border-l-4 border-red-500 text-red-400 p-3 mb-5 text-sm rounded font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Correo Electrónico</label>
            <input 
              type="email" 
              required
              className="w-full py-2.5 px-3 border border-slate-600 bg-slate-800/50 text-white outline-none focus:border-[var(--color-navy)] focus:ring-1 focus:ring-[var(--color-navy)] rounded-lg transition-all placeholder-slate-500"
              placeholder="admin@jp.edu.pe"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Contraseña</label>
            <input 
              type="password" 
              required
              className="w-full py-2.5 px-3 border border-slate-600 bg-slate-800/50 text-white outline-none focus:border-[var(--color-navy)] focus:ring-1 focus:ring-[var(--color-navy)] rounded-lg transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 bg-[var(--color-navy)] hover:bg-[var(--color-navy-dark)] text-white py-3 rounded-lg font-bold transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}