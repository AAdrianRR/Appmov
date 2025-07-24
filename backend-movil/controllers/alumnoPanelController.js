const Alumno = require('../models/alumno');

const calcularProximaSesion = (diasClase, hora) => {
  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const hoy = new Date();
  const hoyIndex = hoy.getDay();

  const indicesClase = diasClase
    .map(d => diasSemana.indexOf(d))
    .filter(i => i >= 0)
    .sort();

  let proximoIndex = indicesClase.find(i => i >= hoyIndex);
  if (proximoIndex === undefined) proximoIndex = indicesClase[0];

  const diasHasta = (proximoIndex - hoyIndex + 7) % 7;
  const proximaFecha = new Date();
  proximaFecha.setDate(hoy.getDate() + diasHasta);

  const opciones = { weekday: "long", day: "numeric", month: "short" };
  return `${proximaFecha.toLocaleDateString("es-MX", opciones)} a las ${hora}`;
};

const getPanelAlumno = async (req, res) => {
  try {
    const alumno = await Alumno.findById(req.alumno.id).populate({
      path: 'clase',
      populate: { path: 'maestro', select: 'nombre apellido' }
    });

    if (!alumno || !alumno.clase) {
      return res.status(404).json({ message: 'No tienes clase asignada.' });
    }

    const clase = alumno.clase;
    const maestro = clase.maestro;
    const siguienteSesion = calcularProximaSesion(clase.dias, clase.hora);

    const formatoFecha = { year: 'numeric', month: 'long', day: 'numeric' };

    res.status(200).json({
      nombre: alumno.nombre,
      clase: clase.nombre,
      horario: clase.hora,
      dias: clase.dias,
      profesor: `${maestro.nombre} ${maestro.apellido}`,
      inicio: clase.inicio
        ? new Date(clase.inicio).toLocaleDateString("es-MX", formatoFecha)
        : null,
      fin: clase.fin
        ? new Date(clase.fin).toLocaleDateString("es-MX", formatoFecha)
        : null,
      siguienteSesion,
      mensaje: alumno.mensaje || ""
    });
  } catch (error) {
    console.error('❌ Error en getPanelAlumno:', error);
    res.status(500).json({ message: 'Error al obtener panel del alumno.', error });
  }
};

module.exports = { getPanelAlumno };
