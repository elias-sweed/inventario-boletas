import React, { useEffect } from 'react';
import logo from '../../assets/logo.png';
import { CONCEPTOS } from '../../utils/constants';

export default function ReciboPrintView({ r, modal, onClose, onOpenEdit }) {
  // 1. LOS HOOKS SIEMPRE VAN ARRIBA (Regla de React)
  useEffect(() => {
    if (modal === "print") {
      setTimeout(() => {
        window.print();
      }, 300); // Pequeño delay para que cargue la imagen del logo
    }
  }, [modal]);

  // 2. LOS RETORNOS CONDICIONALES VAN DESPUÉS
  if (!r) return null;

  const handlePrint = () => {
    window.print();
  };

  // Se aplicó print:bg-white en el div de abajo para tapar el fondo rosado de la app
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 print:p-0 print:bg-white backdrop-blur-sm transition-opacity">
      
      {/* Contenedor Principal (Modal) */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-200 max-h-[90vh] overflow-y-auto print:max-w-none print:max-h-none print:shadow-none print:rounded-none print:overflow-visible flex flex-col">
        
        {/* Cabecera del Modal (NO SE IMPRIME gracias a print:hidden) */}
        <div className="flex justify-between items-center p-4 border-b border-border print:hidden bg-slate-50 rounded-t-lg sticky top-0 z-20">
          <h2 className="text-[16px] font-bold text-var(--color-navy) flex items-center gap-2">
            <span>📄</span> Vista Previa del Documento
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => onOpenEdit(r)} 
              className="px-4 py-2 text-sm font-medium bg-white text-blue-600 border border-blue-200 rounded shadow-sm hover:bg-blue-50 transition-colors"
            >
              ✎ Editar
            </button>
            <button 
              onClick={handlePrint} 
              className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded shadow-sm hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              🖨 Imprimir
            </button>
            <button 
              onClick={onClose} 
              className="px-4 py-2 text-sm font-medium bg-white text-slate-600 border border-slate-300 rounded shadow-sm hover:bg-slate-100 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>

        {/* ZONA DE IMPRESIÓN */}
        <div className="p-8 print:p-0 print:m-4 bg-white relative">
          
          <div className="border-2 border-slate-800 p-8 print:p-6 rounded relative overflow-hidden text-ink">
            
            {/* MARCA DE AGUA */}
            <img 
              src={logo} 
              alt="Marca de agua" 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.04] grayscale pointer-events-none print:opacity-[0.06]" 
            />

            {/* HEADER DEL RECIBO */}
            <div className="flex justify-between items-start border-b-2 border-slate-800 pb-5 mb-6 relative z-10">
              <div className="flex items-center gap-5">
                <img src={logo} alt="Logo Institucional" className="w-20 h-20 object-contain print:w-16 print:h-16" />
                <div>
                  <h1 className="font-display font-black text-2xl print:text-xl text-slate-900 leading-tight uppercase tracking-wide">
                    I.E.E. Jiménez Pimentel
                  </h1>
                  <p className="text-[11px] text-slate-600 font-bold tracking-[0.2em] uppercase mt-1">
                    Tarapoto - San Martín - Perú
                  </p>
                  {/* RUC Agregado debajo de la ciudad */}
                  <p className="text-[11px] text-slate-600 font-bold tracking-[0.2em] uppercase mt-0.5">
                    RUC: 20285268142
                  </p>
                </div>
              </div>
              
              <div className="text-right flex flex-col items-end">
                <div className="bg-slate-50 border border-slate-300 px-5 py-2 rounded mb-2 text-center min-w-40">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                    Recibo de Caja
                  </span>
                  <span className="font-display text-2xl font-bold text-red-600 leading-none print:text-black">
                    N° {r.numero}
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-600 block bg-white px-2">
                  Fecha: {r.fecha}
                </span>
              </div>
            </div>

            {/* CUERPO DEL RECIBO */}
            <div className="space-y-6 text-[15px] text-slate-800 relative z-10">
              <div className="flex items-end gap-3">
                <span className="font-bold whitespace-nowrap uppercase text-[13px] tracking-wider">Recibí de:</span>
                <div className="flex-1 border-b border-dashed border-slate-400 pb-1 px-2 font-medium uppercase text-[16px]">
                  {r.destinatario}
                </div>
              </div>

              <div className="flex items-end gap-3">
                <span className="font-bold whitespace-nowrap uppercase text-[13px] tracking-wider">La cantidad de:</span>
                <div className="flex-1 border-b border-dashed border-slate-400 pb-1 px-2 font-medium italic text-slate-600 uppercase text-sm">
                  {r.montoLetras || "---"}
                </div>
                <div className="bg-slate-50 border border-slate-300 px-5 py-2 font-bold text-xl rounded flex items-center gap-1">
                  <span className="text-[13px] font-normal text-slate-500">S/.</span> {parseFloat(r.monto || 0).toFixed(2)}
                </div>
              </div>
            </div>

            {/* CONCEPTOS */}
            <div className="mt-8 relative z-10">
              <span className="font-bold text-[11px] uppercase tracking-wider block mb-4 text-slate-900 border-l-4 border-slate-800 pl-2">
                Por concepto de:
              </span>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-[13px]">
                {CONCEPTOS.map(c => {
                  const isChecked = r.conceptos[c.id];
                  const text = (c.id === 'otros' && r.otrosTexto) ? `: ${r.otrosTexto}` : '';
                  return (
                    <div key={c.id} className={`flex items-start gap-2.5 ${isChecked ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                      <div className={`w-4 h-4 mt-0.5 border flex items-center justify-center text-[11px] rounded-sm transition-colors ${isChecked ? 'border-slate-800 bg-slate-800 text-white' : 'border-slate-300 bg-slate-50'}`}>
                        {isChecked && "✓"}
                      </div>
                      <span className="leading-snug flex-1">
                        {c.label} <span className="font-normal italic text-slate-600">{text}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PIE Y FIRMAS */}
            <div className="mt-20 flex justify-end relative z-10">
              <div className="w-56 text-center">
                <div className="border-t border-slate-800 pt-2 text-[11px] font-bold uppercase tracking-widest text-slate-700">
                  Firma / Tesorería
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}