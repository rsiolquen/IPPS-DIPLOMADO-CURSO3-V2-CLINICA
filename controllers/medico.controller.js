import * as service from "../services/medico.service.js";

export const listar = async (req, res) => {
  try {
    const especialidad = req.query.especialidad;

    const medicos = await service.listar(especialidad);

    return res.status(200).json(medicos);
  } catch (error) {
    console.error("Error al listar médicos:", error);

    return res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};

export const perfil = async (req, res) => {
  try {
    const id = req.medico.id;

    const medico = await service.obtenerPerfil(id);

    if (!medico) {
      return res.status(404).json({
        mensaje: "Médico no encontrado",
      });
    }

    return res.status(200).json(medico);
  } catch (error) {
    console.error("Error al obtener perfil:", error);

    return res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};

export const obtenerPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return res.status(400).json({
        mensaje: "ID de médico inválido",
      });
    }

    const medico = await service.obtenerPorId(id);

    if (!medico) {
      return res.status(404).json({
        mensaje: "Médico no encontrado",
      });
    }

    return res.status(200).json(medico);
  } catch (error) {
    console.error("Error al buscar médico:", error);

    return res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};

export const listarPacientes = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return res.status(400).json({
        mensaje: "ID de médico inválido",
      });
    }

    const pacientes = await service.listarPacientes(id);

    if (pacientes === null) {
      return res.status(404).json({
        mensaje: "Médico no encontrado",
      });
    }

    return res.status(200).json(pacientes);

  } catch (error) {
    console.error("Error al listar pacientes del médico:", error);

    return res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};