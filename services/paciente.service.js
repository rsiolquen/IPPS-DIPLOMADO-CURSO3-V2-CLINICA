import { Paciente } from "../models/paciente.model.js";

export const crear = async (datos, medicoId) => {
  const paciente = await Paciente.create({
    nombre: datos.nombre,
    rut: datos.rut,
    fechaNacimiento: datos.fechaNacimiento,
    prevision: datos.prevision,
    telefono: datos.telefono,
    email: datos.email,
    medico: medicoId,
  });
  return paciente;
};

export const listar = async (medicoId, prevision) => {
  const filtro = {
    medico: medicoId,
  };

  if (prevision) {
    filtro.prevision = prevision;
  }

  const pacientes = await Paciente.find(filtro);

  return pacientes;
};

export const obtenerPorId = async (id) => {
  const paciente = await Paciente.findById(id);

  return paciente;
};

export const actualizar = async (id, medicoId, datos) => {
  const paciente = await Paciente.findById(id);
  if (!paciente) {
    return null;
  }
  if (paciente.medico.toString() !== medicoId) {
    const error = new Error("No tienes permiso para modificar este paciente");
    error.status = 403;
    throw error;
  }
  const camposPermitidos = [
    "nombre",
    "rut",
    "fechaNacimiento",
    "prevision",
    "telefono",
    "email",
  ];
  for (const campo of camposPermitidos) {
    if (Object.hasOwn(datos, campo)) {
      paciente[campo] = datos[campo];
    }
  }
  await paciente.save();
  return paciente;
};

export const eliminar = async (id, medicoId) => {
  const paciente = await Paciente.findById(id);
  if (!paciente){
    return null;
  }
  if (paciente.medico.toString() !== medicoId){
    const error = new Error("No tienes permiso para eliminar este paciente");
    error.status = 403;
    throw error;
  }
  await paciente.deleteOne();
  return paciente;
};