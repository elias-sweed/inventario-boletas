import React from 'react';
import { CONCEPTOS } from '../../utils/constants';

export default function ReciboForm({ modal, form, setForm, onClose, onSave, isSaving }) {
  const handleConceptoChange = (id) => {
    setForm({
      ...form,
      conceptos: {
        ...form.conceptos,
        [id]: !form.conceptos[id]
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity">
      {/* Contenedor Principal: Blanco Puro */}
      <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden transition-colors duration-300">
        
        {/* CABECERA */}
        <div className="flex justify-between items-center p-5 border-b border-blue-100 dark:border-[#334155] bg-white dark:bg-[#0f172a]">
          <h2 className="text-xl font-extrabold text-[#000000] dark:text-white flex items-center gap-2">
            {modal === 'create' ? '✨ Nuevo Recibo' : '✎ Editar Recibo'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-red-600 hover:text-red-800 text-xl font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* CUERPO DEL FORMULARIO */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-white dark:bg-[#1e293b]">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#000000] dark:text-blue-300 mb-2">Número de Recibo</label>
              <input 
                type="text" 
                value={form.numero} 
                disabled={modal === 'create'}
                onChange={(e) => setForm({...form, numero: e.target.value})}
                className="w-full p-3 border border-blue-200 dark:border-[#475569] rounded-lg bg-blue-50/40 dark:bg-[#334155] text-[#000000] dark:text-white font-bold disabled:opacity-70 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#000000] dark:text-blue-300 mb-2">Fecha</label>
              <input 
                type="date" 
                value={form.fecha} 
                onChange={(e) => setForm({...form, fecha: e.target.value})}
                className="w-full p-3 border border-blue-200 dark:border-[#475569] rounded-lg bg-white dark:bg-[#334155] text-[#000000] dark:text-white font-semibold focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#000000] dark:text-blue-300 mb-2">Recibí de (Nombres y Apellidos)</label>
            <input 
              type="text" 
              value={form.destinatario} 
              onChange={(e) => setForm({...form, destinatario: e.target.value})}
              placeholder="Ej. Juan Pérez"
              className="w-full p-3 border border-blue-200 dark:border-[#475569] rounded-lg bg-white dark:bg-[#334155] text-[#000000] dark:text-white font-semibold focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-1">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#000000] dark:text-blue-300 mb-2">Monto (S/.)</label>
              <input 
                type="number" 
                step="0.10"
                value={form.monto} 
                onChange={(e) => setForm({...form, monto: e.target.value})}
                placeholder="0.00"
                className="w-full p-3 border border-blue-200 dark:border-[#475569] rounded-lg bg-white dark:bg-[#334155] text-[#000000] dark:text-white font-extrabold text-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#000000] dark:text-blue-300 mb-2">La cantidad de (en letras)</label>
              <input 
                type="text" 
                value={form.montoLetras} 
                onChange={(e) => setForm({...form, montoLetras: e.target.value})}
                placeholder="Ej. DIEZ CON 00/100 SOLES"
                className="w-full p-3 border border-blue-200 dark:border-[#475569] rounded-lg bg-white dark:bg-[#334155] text-[#000000] dark:text-white font-semibold focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
          </div>

          {/* Área de Checkboxes: Un ligero tinte azul (blue-50) para destacar la caja sin usar gris */}
          <div className="mt-2 bg-blue-50/50 dark:bg-[#0f172a] p-5 rounded-lg border border-blue-100 dark:border-[#334155]">
            <label className="block text-[12px] font-extrabold uppercase tracking-wider text-[#000000] dark:text-white mb-4 pb-2 border-b border-blue-100 dark:border-[#334155]">
              Por concepto de:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-2">
              {CONCEPTOS.map(c => (
                <div key={c.id} className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id={`chk-${c.id}`}
                    checked={form.conceptos[c.id] || false}
                    onChange={() => handleConceptoChange(c.id)}
                    className="w-5 h-5 cursor-pointer accent-[var(--color-navy)] dark:accent-blue-500 rounded border-blue-300"
                  />
                  <label 
                    htmlFor={`chk-${c.id}`} 
                    className="cursor-pointer text-[14px] font-bold text-[#000000] dark:text-white select-none hover:text-blue-700 transition-colors"
                  >
                    {c.label}
                  </label>
                </div>
              ))}
            </div>
            
            {form.conceptos?.otros && (
              <div className="mt-5 pt-4 border-t border-blue-100 dark:border-[#334155] animate-[slideUp_0.2s_ease]">
                <input 
                  type="text" 
                  value={form.otrosTexto} 
                  onChange={(e) => setForm({...form, otrosTexto: e.target.value})}
                  className="w-full p-3 border border-blue-200 dark:border-[#475569] rounded-lg bg-white dark:bg-[#334155] text-[#000000] dark:text-white text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                  placeholder="Especifique el otro concepto..."
                />
              </div>
            )}
          </div>

        </div>

        {/* PIE DEL FORMULARIO */}
        <div className="p-5 border-t border-blue-100 dark:border-[#334155] bg-white dark:bg-[#0f172a] flex justify-end gap-3">
          <button 
            onClick={onClose}
            disabled={isSaving}
            className="px-6 py-2.5 text-sm font-bold text-slate-300 bg-slate-800 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 cursor-pointer"
        >
            Cancelar
          </button>
          <button 
            onClick={onSave}
            disabled={isSaving}
            className="px-6 py-2.5 text-sm font-bold text-white bg-[var(--color-navy)] hover:opacity-90 dark:bg-blue-600 rounded-lg shadow-md transition-all flex items-center gap-2 disabled:opacity-70"
          >
            {isSaving ? (
               <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : '💾'}
            {isSaving ? 'Guardando...' : 'Guardar Recibo'}
          </button>
        </div>

      </div>
    </div>
  );
}