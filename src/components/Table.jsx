import React from 'react';
import { CONCEPTOS } from '../utils/constants';

// Ahora recibimos los nuevos filtros en los props
export default function Table({ recibos, search, filterConcepto, dateFrom, dateTo, onOpenView, onOpenEdit, onOpenPrint, onOpenDelete }) {
  
  // Lógica de filtrado múltiple
  const filtered = recibos.filter(r => {
    // 1. Filtro de Búsqueda de texto (número, alumno o concepto)
    const matchesSearch = 
      r.numero.includes(search) ||
      r.destinatario.toLowerCase().includes(search.toLowerCase()) ||
      Object.entries(r.conceptos).some(([k, v]) => 
        v && CONCEPTOS.find(c => c.id === k)?.label.toLowerCase().includes(search.toLowerCase())
      );

    // 2. Filtro por Concepto específico (el select)
    const matchesConcepto = filterConcepto === "todos" ? true : r.conceptos[filterConcepto];

    // 3. Filtro por Fechas
    let matchesDate = true;
    if (dateFrom || dateTo) {
      const reciboDate = new Date(r.fechaISO);
      if (dateFrom) {
        matchesDate = matchesDate && reciboDate >= new Date(dateFrom);
      }
      if (dateTo) {
        matchesDate = matchesDate && reciboDate <= new Date(dateTo);
      }
    }

    // El recibo debe cumplir con los 3 filtros para aparecer
    return matchesSearch && matchesConcepto && matchesDate;
  });

  return (
    <div className="bg-slate-800 border border-slate-700 shadow-lg overflow-hidden rounded-lg">
      {/* Cabecera de la tabla */}
      <div className="bg-slate-900/80 text-slate-400 border-b border-slate-700 grid grid-cols-[100px_1fr_1fr_100px_120px_130px] p-4 text-[11px] font-bold tracking-wider uppercase">
        <span>N° Recibo</span>
        <span>Destinatario</span>
        <span>Conceptos</span>
        <span>Fecha</span>
        <span>Monto</span>
        <span className="text-center">Acciones</span>
      </div>

      {/* Cuerpo de la tabla */}
      {filtered.length === 0 ? (
        <div className="p-16 text-center text-slate-400 italic text-[15px]">
          No se encontraron recibos con esos filtros.
        </div>
      ) : (
        filtered.map(r => (
          <div key={r.id} className="grid grid-cols-[100px_1fr_1fr_100px_120px_130px] p-4 border-b border-slate-700 items-center transition-colors hover:bg-slate-700/50 text-[14px] text-slate-300 last:border-b-0">
            <span className="font-display font-bold text-white text-[15px]">N° {r.numero}</span>
            <span className="truncate pr-4 font-medium text-white">{r.destinatario}</span>
            
            {/* Etiquetas de conceptos */}
            <span className="flex flex-wrap gap-1.5">
              {CONCEPTOS.filter(c => r.conceptos[c.id]).slice(0, 2).map(c => (
                <span key={c.id} className="inline-block bg-slate-700 text-slate-300 text-[11px] px-2 py-0.5 border border-slate-600 rounded whitespace-nowrap">
                  {c.label.length > 20 ? c.label.slice(0, 18) + "…" : c.label}
                </span>
              ))}
              {CONCEPTOS.filter(c => r.conceptos[c.id]).length > 2 && (
                <span className="inline-block bg-slate-700 text-slate-300 text-[11px] px-2 py-0.5 border border-slate-600 rounded">
                  +{CONCEPTOS.filter(c => r.conceptos[c.id]).length - 2}
                </span>
              )}
            </span>
            
            <span className="text-[13px] text-slate-400">{r.fecha}</span>
            <span className="font-bold text-[15px] text-emerald-400">
              S/. {parseFloat(r.monto || 0).toFixed(2)}
            </span>
            
            {/* Botones de acción */}
            <div className="flex gap-2 justify-center">
              <button onClick={() => onOpenView(r)} className="w-8 h-8 border border-slate-600 text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center text-[13px] transition-all rounded shadow-sm" title="Ver">👁</button>
              <button onClick={() => onOpenEdit(r)} className="w-8 h-8 border border-blue-500/30 text-blue-400 bg-slate-800 hover:bg-blue-500/20 hover:text-blue-300 flex items-center justify-center text-[13px] transition-all rounded shadow-sm" title="Editar">✎</button>
              <button onClick={() => onOpenPrint(r)} className="w-8 h-8 border border-emerald-500/30 text-emerald-400 bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-300 flex items-center justify-center text-[13px] transition-all rounded shadow-sm" title="Imprimir">🖨</button>
              <button onClick={() => onOpenDelete(r)} className="w-8 h-8 border border-red-500/30 text-red-400 bg-slate-800 hover:bg-red-500/20 hover:text-red-300 flex items-center justify-center text-[13px] transition-all rounded shadow-sm" title="Eliminar">✕</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}