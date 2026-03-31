export const CONCEPTOS = [
  { id: "cert_estudios", label: "Certificado de Estudios", col: 0 },
  { id: "cert_conducta", label: "Certificado de Buena Conducta", col: 0 },
  { id: "const_matricula", label: "Constancia de Matrícula", col: 0 },
  { id: "const_estudios", label: "Constancia de Estudios", col: 0 },
  { id: "exoneracion", label: "Exoneración", col: 0 },
  { id: "actas", label: "Actas", col: 0 },
  { id: "otros", label: "Otros", col: 0, hasText: true },
  { id: "subsanacion", label: "Curso de Subsanación", col: 1 },
  { id: "curso_cargo", label: "Curso a Cargo", col: 1 },
  { id: "aplazado", label: "Curso de Aplazado", col: 1 },
  { id: "tramite", label: "Trámite Documentario", col: 1 },
  { id: "refuerzo", label: "Refuerzo Escolar", col: 1 },
  { id: "fut", label: "Solicitud (F.U.T.)", col: 1 },
  { id: "pra", label: "PRA", col: 1 },
];

export const emptyRecibo = {
  numero: "",
  destinatario: "",
  monto: "",
  montoLetras: "",
  conceptos: {},
  otrosTexto: "",
  fecha: new Date().toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" }),
  fechaISO: new Date().toISOString().split("T")[0],
};