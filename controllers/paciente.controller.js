import * as service from "../services/paciente.service.js";

export const crear = async (req, res) => {
  try {
    const datos = req.body;
    const medicoId = req.medico.id;
    const paciente = await service.crear(datos, medicoId);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ mensahe: "Ya existe un paciente con ese RUT" });
    }
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        mensaje: "Datos del paciente inválidos",
        datalle: error.message,
      });
    }
    console.error("Error al registrar paciente:", error);
    return res.status(500).json({
      mensaje: " Error interno del servidor",
    });
  }
};

export const listar = async (req, res) => {
  try {
    const medicoId = req.medico.id;
    const prevision = req.query.prevision;

    const pacientes = await service.listar(medicoId, prevision);

    return res.status(200).json(pacientes);
  } catch (error) {
    console.error("Error al listar pacientes:", error);

    return res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};
export const obtenerPorId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!/^[a-fa-f0-9]{24}$/.test(id)) {
      return res.status(400).json({ mensaje: "ID de paciente inválido" });
    }
    const paciente = await service.obtenerPorId(id);

    if (!paciente) {
      return res.status(400).json({ mensaje: "paciente no encontrado" });
    }
    return res.status(200).json(paciente);
  } catch (error) {
    console.error("Error al buscar paciente:", error);

    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const medicoId = req.medico.id;
    const datos = req.body;

    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return res.status(400).json({
        mensaje: "ID de paciente inválido",
      });
    }

    const paciente = await service.actualizar(id, medicoId, datos);

    if (!paciente) {
      return res.status(404).json({
        mensaje: "Paciente no encontrado",
      });
    }

    return res.status(200).json(paciente);
  } catch (error) {
    if (error.status === 403) {
      return res.status(403).json({
        mensaje: error.message,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        mensaje: "Ya existe un paciente con ese RUT",
      });
    }

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        mensaje: "Datos del paciente inválidos",
        detalle: error.message,
      });
    }

    console.error("Error al actualizar paciente:", error);

    return res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};

export const eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const medicoId = req.medico.id;
    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return res.status(400).json({ mesaje: "ID de pacinete inválido" });
    }
    const paciente = await service.eliminar(id, medicoId);
    if (!paciente) {
      return res.status(400).json({ mensaje: "Paciente no encontrado" });
    }
    return res.status(204).send();
  } catch (error) {
    if (error.status === 403) {
      return res.status(403).json({ mensaje: error.message });
    }
    console.error("Error al eliminar paciente:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
