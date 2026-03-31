import { useState, useEffect, useCallback } from "react";
import { supabase } from "../utils/supabase";

export function useRecibos() {
  const [recibos, setRecibos] = useState([]);
  const [loading, setLoading] = useState(true); // Ya empieza en true

  const fetchRecibos = useCallback(async () => {
    const { data, error } = await supabase
      .from('recibos')
      .select('*')
      .order('numero', { ascending: false });

    if (error) {
      console.error("Error cargando recibos:", error);
    } else {
      const formattedData = data.map(r => ({
        id: r.id,
        numero: String(r.numero).padStart(6, "0"),
        destinatario: r.destinatario,
        monto: r.monto,
        montoLetras: r.monto_letras,
        conceptos: r.conceptos,
        otrosTexto: r.otros_texto,
        fecha: r.fecha,
        fechaISO: r.fecha_iso
      }));
      setRecibos(formattedData);
    }
  }, []);

    useEffect(() => {
    const initLoad = async () => {
      await fetchRecibos();
      setLoading(false);
    };
    initLoad();

    const channel = supabase
      .channel('recibos-en-vivo')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'recibos' }, (payload) => {
        console.log("¡Cambio detectado en la nube!", payload);
        fetchRecibos(); 
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchRecibos]);

  const addRecibo = async (nuevoRecibo) => {
    const dbPayload = {
      destinatario: nuevoRecibo.destinatario,
      monto: nuevoRecibo.monto,
      monto_letras: nuevoRecibo.montoLetras,
      conceptos: nuevoRecibo.conceptos,
      otros_texto: nuevoRecibo.otrosTexto,
      fecha: nuevoRecibo.fecha,
      fecha_iso: nuevoRecibo.fechaISO
    };

    const { error } = await supabase.from('recibos').insert([dbPayload]);
    if (error) throw error;
    await fetchRecibos(); 
  };

  const updateRecibo = async (id, reciboActualizado) => {
    const dbPayload = {
      destinatario: reciboActualizado.destinatario,
      monto: reciboActualizado.monto,
      monto_letras: reciboActualizado.montoLetras,
      conceptos: reciboActualizado.conceptos,
      otros_texto: reciboActualizado.otrosTexto,
      fecha: reciboActualizado.fecha,
      fecha_iso: reciboActualizado.fechaISO
    };

    const { error } = await supabase.from('recibos').update(dbPayload).eq('id', id);
    if (error) throw error;
    await fetchRecibos();
  };

  const deleteRecibo = async (id) => {
    const { error } = await supabase.from('recibos').delete().eq('id', id);
    if (error) throw error;
    setRecibos((prev) => prev.filter((r) => r.id !== id));
  };

  return { recibos, loading, addRecibo, updateRecibo, deleteRecibo };
}