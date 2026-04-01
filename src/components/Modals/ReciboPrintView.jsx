import React, { useEffect } from 'react';
import logo from '../../assets/logo.png';
import { CONCEPTOS } from '../../utils/constants';

export default function ReciboPrintView({ r, modal, onClose, onOpenEdit }) {
  useEffect(() => {
    if (modal === "print") {
      setTimeout(() => {
        window.print();
      }, 500); 
    }
  }, [modal]);

  if (!r) return null;

  const handlePrint = () => {
    window.print();
  };

  // Función para separar la fecha (ej: 2026-03-30 -> 30, Marzo, 26)
  const formatFecha = (fechaStr) => {
    if (!fechaStr) return { dia: '', mes: '', anio: '' };
    const [y, m, d] = fechaStr.split('-');
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return {
      dia: d,
      mes: meses[parseInt(m, 10) - 1],
      anio: y.substring(2) 
    };
  };

  const fecha = formatFecha(r.fecha);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm print:absolute print:inset-0 print:bg-white print:p-0 print:block">
      
      {/* Contenedor del Modal */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
        
        {/* === BOTONERA DE CONTROLES (SE OCULTA TOTALMENTE AL IMPRIMIR) === */}
        <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50 print:hidden">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            📄 Vista Previa de Impresión
          </h2>
          <div className="flex gap-3">
            <button onClick={() => onOpenEdit(r)} className="px-4 py-2 text-sm font-bold bg-white text-blue-800 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
              ✎ Editar
            </button>
            <button onClick={handlePrint} className="px-5 py-2 text-sm font-bold bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-900 transition-colors flex items-center gap-2">
              🖨 Imprimir
            </button>
            <button onClick={onClose} className="px-4 py-2 text-sm font-bold bg-white text-slate-600 border-2 border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
              ✕ Cerrar
            </button>
          </div>
        </div>

        {/* === ZONA EXACTA DE LA BOLETA === */}
        {/* Aquí aplicamos las medidas en CENTÍMETROS para que no ocupe toda la hoja */}
        <div className="p-8 print:p-4 bg-white flex justify-center">
          
          <div className="w-[20cm] min-h-[13.5cm] border-2der-[#1e3a8a] rounded-lg p-5 flex flex-col font-sans text-[#1e3a8a] bg-white print:border-[#1e3a8a] print:m-0 box-border">
            
            {/* 1. CABECERA */}
            <div className="flex items-center border-b-2 border-[#1e3a8a] pb-2 mb-3">
              <div className="w-17.5 shrink-0 mr-4">
                <img src={logo} alt="Logo JP" className="w-full h-auto object-contain grayscale-30" />
              </div>
              <div className="flex-1 text-center leading-tight">
                <h1 className="font-bold text-[17px] tracking-wide uppercase">
                  Institución Educativa Emblemática
                </h1>
                <h2 className="font-black text-[24px] italic tracking-widest mt-0.5">
                  "JIMÉNEZ PIMENTEL"
                </h2>
                <p className="font-medium text-[13px] mt-1 text-slate-800">
                  Jr. Orellana 3ra. cuadra - Tarapoto
                </p>
                <p className="font-black text-[14px] mt-0.5 tracking-widest text-[#1e3a8a]">
                  R.U.C. 20285268142
                </p>
              </div>
            </div>

            {/* 2. NÚMERO DE RECIBO Y MONTO */}
            <div className="flex justify-between items-end mb-3 px-2">
              <div className="flex items-center gap-6">
                <span className="font-serif font-black text-[34px] tracking-[0.2em] leading-none">
                  RECIBO
                </span>
                <span className="font-serif font-bold text-[22px] text-red-600 leading-none print:text-[#dc2626]">
                  Nº <span className="tracking-widest">{String(r.numero).padStart(6, '0')}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 font-bold text-[18px]">
                <span>Por S/</span>
                <div className="border-2 border-[#1e3a8a] px-3 py-0.5 min-w-25 text-center rounded-sm text-slate-900">
                  {parseFloat(r.monto || 0).toFixed(2)}
                </div>
              </div>
            </div>

            {/* 3. DATOS DEL EMISOR / CANTIDAD */}
            <div className="space-y-2 mb-3 px-2 text-[14px]">
              <div className="flex items-end">
                <span className="whitespace-nowrap mr-2 font-medium">Recibí del Sr.(a):</span>
                <div className="flex-1 border-b-2 border-dotted border-[#1e3a8a] pb-0.5 px-3 font-medium italic text-slate-900 leading-none">
                  {r.destinatario}
                </div>
              </div>
              <div className="flex items-end">
                <span className="whitespace-nowrap mr-2 font-medium">La suma de:</span>
                <div className="flex-1 border-b-2 border-dotted border-[#1e3a8a] pb-0.5 px-3 font-medium italic text-slate-900 leading-none">
                  {r.montoLetras || "---"}
                </div>
                <span className="ml-2 font-medium">Soles</span>
              </div>
              <div className="pt-1">
                <span className="font-medium">por concepto de:</span>
              </div>
            </div>

            {/* 4. CONCEPTOS (2 Columnas con recuadros a la derecha) */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-1.5 px-2 mb-6 text-[12px] flex-1">
              {CONCEPTOS.map(c => {
                const isChecked = r.conceptos[c.id];
                const textLabel = (c.id === 'otros' && r.otrosTexto && isChecked) 
                  ? `Otros: ${r.otrosTexto}` 
                  : c.label;

                return (
                  <div key={c.id} className="flex items-center justify-between group">
                    <span className="whitespace-nowrap text-slate-800">{textLabel}</span>
                    <div className="flex-1 border-b-2 border-dotted border-[#1e3a8a] mx-2 opacity-50 relative top-1"></div>
                    <div className="w-4 h-4 border-2 border-[#1e3a8a] flex items-center justify-center shrink-0 bg-white">
                      {isChecked && (
                        <span className="text-black font-black text-[14px] leading-none -mt-0.5 print:text-black">
                          ✕
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 5. FIRMA Y FECHA */}
            <div className="flex justify-between items-end px-2 mt-auto pb-2">
              <div className="w-40 text-center">
                <div className="border-t-2 border-dotted border-[#1e3a8a] pt-1 text-[13px] tracking-widest font-medium">
                  FIRMA
                </div>
              </div>
              
              <div className="flex items-end text-[14px]">
                <span className="font-medium">Tarapoto,</span>
                <div className="border-b-2 border-dotted border-[#1e3a8a] min-w-8.75 text-center mx-1.5 font-medium italic text-slate-900 pb-0.5 leading-none">
                  {fecha.dia}
                </div>
                <span className="font-medium">de</span>
                <div className="border-b-2 border-dotted border-[#1e3a8a] min-w-22.5 text-center mx-1.5 font-medium italic text-slate-900 pb-0.5 leading-none">
                  {fecha.mes}
                </div>
                <span className="font-medium">del 20</span>
                <div className="border-b-2 border-dotted border-[#1e3a8a] min-w-7.5 text-center ml-1 font-medium italic text-slate-900 pb-0.5 leading-none">
                  {fecha.anio}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}