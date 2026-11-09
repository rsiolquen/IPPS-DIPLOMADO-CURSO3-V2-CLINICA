import { Medico } from "../models/medico.model.js";
import { Paciente } from "../models/paciente.model.js";

export const listar = async (especialidad) => {
  const filtro = {};
  if (especialidad) {
    filtro.especialidad = especialidad;
  }
  const medicos = await Medico.find(filtro).select("-password");
  return medicos;
};
export const obtenerPerfil = async (id) => {
  const medico = await Medico.findById(id).select("-password");

  return medico;
};
export const obtenerPorId = async (id) => {
  const medico = await Medico.findById(id).select("-password");

  return medico;
};

export const listarPacientes = async (id) => {
  const medico = await Medico.findById(id);

  if (!medico) {
    return null;
  }

  const pacientes = await Paciente.find({ medico: id });

  return pacientes;
};