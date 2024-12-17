export const statusTranslations: { [key: string]: string } = {
  pending: 'Pendiente',
  onHold: 'En Espera',
  inProgress: 'En Progreso',
  underReview: 'En Revisión',
  completed: 'Completado',
}

export const fallasIncidencias: { [key: string]: string } = {
  f_val: 'Falla en validador',
  f_asc: 'Alerta en sistema central memoria llena',
  f_saa: 'Alerta en sistema central sam ausente',
  f_ane: 'Apagado, No enciende',
  f_fds: 'Fuera de servicio',
  f_fda: 'Fuera de servicio aleatoriamente',
  f_inv: 'Instalación del validador',
  f_nrc: 'No lee tarjetas',
  f_pcr: 'Pantalla de color',
  f_pps: 'Pantalla pasmada',
  f_sri: 'Se reinicia',
  f_sia: 'Sin antenas',
  f_sad: 'Sin audio',
  f_sco: 'Sin conexión',
  f_sgp: 'Sin señal GPS',
  f_har: 'Tornillos sueltos, remaches, respaldo',
  f_otr: 'Otra (ver en detalle)',
}