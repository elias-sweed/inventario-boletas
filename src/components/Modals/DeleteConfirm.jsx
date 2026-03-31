import React from 'react';

export default function DeleteConfirm({ r, onClose, onDelete }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      {/* Contenedor principal oscuro */}
      <div className="bg-slate-800 shadow-2xl w-full max-w-md rounded-xl overflow-hidden animate-[slideUp_0.2s_ease]" onClick={e => e.stopPropagation()}>
        
        {/* Cabecera roja oscura para indicar peligro */}
        <div className="bg-red-500/10 border-b border-red-500/20 text-red-500 px-6 py-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold flex items-center gap-2">⚠️ Eliminar Recibo</h2>
          <button onClick={onClose} className="text-red-400 hover:text-red-300 text-xl font-bold transition-colors">✕</button>
        </div>
        
        <div className="p-6 text-center">
          <p className="text-[16px] text-white mb-4">
            ¿Estás seguro de eliminar el recibo <strong className="font-display text-white text-[18px]">N° {r.numero}</strong>?
          </p>
          
          {/* Tarjeta de resumen del recibo en oscuro */}
          <div className="text-[14px] text-slate-300 bg-slate-900/50 border border-slate-700 p-4 rounded-lg inline-block text-left shadow-inner mb-4 w-full max-w-sm">
            <span className="block border-b border-slate-700 pb-2 mb-2 truncate">👤 {r.destinatario}</span>
            <span className="block font-bold text-emerald-400 text-lg">💰 S/. {parseFloat(r.monto || 0).toFixed(2)}</span>
          </div>
          
          <p className="text-xs text-red-400 font-bold uppercase tracking-wider">Esta acción no se puede deshacer.</p>
        </div>
        
        {/* Pie con los botones */}
        <div className="flex gap-3 justify-end px-6 py-4 bg-slate-900/50 border-t border-slate-700">
          <button 
            className="bg-slate-800 border border-slate-600 text-slate-300 px-5 py-2.5 font-bold text-sm hover:bg-slate-700 rounded-lg transition-colors cursor-pointer" 
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="bg-red-600 text-white px-5 py-2.5 font-bold text-sm hover:bg-red-500 rounded-lg shadow-md transition-all cursor-pointer" 
            onClick={onDelete}
          >
            Eliminar Definitivamente
          </button>
        </div>
      </div>
    </div>
  );
}