import React, { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";
import { Tranquiluxe } from "uvcanvas"; 
import Login from "./components/Login";
import Header from "./components/Header";
import Table from "./components/Table";
import ReciboForm from "./components/Modals/ReciboForm";
import ReciboPrintView from "./components/Modals/ReciboPrintView";
import DeleteConfirm from "./components/Modals/DeleteConfirm";
import LoadingScreen from "./components/LoadingScreen";
import { useRecibos } from "./hooks/useRecibos";
import { emptyRecibo } from "./utils/constants";

function App() {
  const [session, setSession] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [initialCheck, setInitialCheck] = useState(true); 

  const { recibos, loading, addRecibo, updateRecibo, deleteRecibo } = useRecibos();
  
  // Estados de filtros
  const [search, setSearch] = useState("");
  const [filterConcepto, setFilterConcepto] = useState("todos");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Estados de modales
  const [modal, setModal] = useState(null); 
  const [current, setCurrent] = useState(null); 
  const [form, setForm] = useState(emptyRecibo); 
  const [toast, setToast] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // 1. Verificación inicial de sesión al cargar la página (F5 o pestaña nueva)
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setInitialCheck(false);
    });

    // 2. Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (event === 'SIGNED_IN') {
        // SOLUCIÓN: Solo activa transición si el check inicial terminó Y no había sesión previa.
        // Esto bloquea la animación al cambiar de pestañas o refrescar.
        setSession((prevSession) => {
          if (!initialCheck && prevSession === null && newSession) {
            setIsTransitioning(true);
            setTimeout(() => setIsTransitioning(false), 3000);
          }
          return newSession;
        });
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
        setIsTransitioning(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [initialCheck]);

  const showToast = (msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openCreate = () => { setForm({ ...emptyRecibo, numero: "AUTOGENERADO" }); setModal("create"); };
  const openEdit = (r) => { setCurrent(r); setForm({ ...r, conceptos: { ...r.conceptos } }); setModal("edit"); };
  const openView = (r) => { setCurrent(r); setModal("view"); };
  const openPrint = (r) => { setCurrent(r); setModal("print"); };
  const openDelete = (r) => { setCurrent(r); setModal("delete"); };

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true); 
    try {
      if (modal === "create") { await addRecibo(form); showToast("Recibo creado"); }
      else { await updateRecibo(current.id, form); showToast("Recibo actualizado"); }
      setModal(null);
    } catch { showToast("Error al guardar", "err"); }
    finally { setIsSaving(false); }
  };

  const handleDelete = async () => {
    try { await deleteRecibo(current.id); showToast("Eliminado", "err"); setModal(null); }
    catch { showToast("Error al eliminar", "err"); }
  };

  const totalRecaudado = recibos.reduce((s, r) => s + parseFloat(r.monto || 0), 0).toFixed(2);

  // --- RENDERS ---
  if (isTransitioning) return <LoadingScreen />;
  if (!session && !initialCheck) return <Login />;
  if (!session) return null;

  return (
    <div className="min-h-screen pb-12 relative">
      <div className="fixed inset-0 z-[-1]"><Tranquiluxe /></div>
      <Header />
      <main className="max-w-275 mx-auto mt-8 px-6 relative z-10">
        <div className="flex gap-4 mb-6 flex-wrap">
          <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 px-6 py-4 flex-1 min-w-35 border-t-4 border-t-(--color-navy) rounded-b-lg text-white shadow-xl">
            <div className="text-3xl font-black">{recibos.length}</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-widest mt-1">Total Recibos</div>
          </div>
          <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 px-6 py-4 flex-1 min-w-35 border-t-4 border-t-gold rounded-b-lg text-white shadow-xl">
            <div className="text-3xl font-black">S/. {totalRecaudado}</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-widest mt-1">Total Recaudado</div>
          </div>
        </div>

        <div className="bg-slate-800/90 backdrop-blur-md p-5 rounded-xl border border-slate-700 mb-6 flex flex-col md:flex-row gap-5 items-end justify-between shadow-2xl">
          <div className="flex flex-wrap gap-4 flex-1 w-full text-white">
            <div className="flex-1 min-w-50">
              <label className="text-xs font-bold text-slate-400 uppercase mb-1.5 block">Buscar</label>
              <input className="w-full py-2 px-3 border border-slate-600 bg-slate-900/50 rounded-lg outline-none focus:border-(--color-navy)" value={search} onChange={e => setSearch(e.target.value)} placeholder="Alumno o N° boleta..."/>
            </div>
            <div className="w-full md:w-50">
              <label className="text-xs font-bold text-slate-400 uppercase mb-1.5 block">Concepto</label>
              <select className="w-full py-2 px-3 border border-slate-600 bg-slate-900/50 rounded-lg" value={filterConcepto} onChange={e => setFilterConcepto(e.target.value)}>
                <option value="todos">Todos</option>
                <option value="otros">Otros</option>
              </select>
            </div>
            <div className="flex gap-2">
              <input type="date" className="bg-slate-900/50 border border-slate-600 p-2 rounded-lg" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
              <input type="date" className="bg-slate-900/50 border border-slate-600 p-2 rounded-lg" value={dateTo} onChange={e => setDateTo(e.target.value)} />
            </div>
          </div>
          <button className="bg-(--color-navy) hover:opacity-90 text-white py-2.5 px-6 font-bold rounded-lg shadow-lg" onClick={openCreate}>+ Nuevo Recibo</button>
        </div>

        {loading ? (
          <div className="text-white text-center py-20 bg-slate-800/40 rounded-xl backdrop-blur-sm border border-slate-700 italic">Conectando...</div>
        ) : (
          <Table recibos={recibos} search={search} filterConcepto={filterConcepto} dateFrom={dateFrom} dateTo={dateTo} onOpenView={openView} onOpenEdit={openEdit} onOpenPrint={openPrint} onOpenDelete={openDelete} />
        )}
      </main>

      {toast && <div className="fixed bottom-6 right-6 z-50 bg-slate-800 text-white px-6 py-3 rounded-lg border-l-4 border-gold shadow-2xl">{toast.msg}</div>}
      {(modal === "create" || modal === "edit") && <ReciboForm modal={modal} form={form} setForm={setForm} onClose={() => setModal(null)} onSave={handleSave} isSaving={isSaving} />}
      {(modal === "view" || modal === "print") && current && <ReciboPrintView r={current} modal={modal} onClose={() => setModal(null)} onOpenEdit={openEdit} onOpenPrint={openPrint} showToast={showToast} />}
      {modal === "delete" && current && <DeleteConfirm r={current} onClose={() => setModal(null)} onDelete={handleDelete} />}
    </div>
  );
}

export default App;