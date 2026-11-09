import { Medico } from "../models/medico.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRA } from "../config/jwt.js";

const firmarToken = (medico) => {
  const token = jwt.sign({ id: medico._id, email: medico.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRA,
  });
  return token;
};

export const registrar = async (datos) => {
  const { nombre, especialidad, email, password } = datos;
  // comprobar que estén los datos obligatorios
  if (!nombre || !especialidad || !email || !password) {
    const error = new Error("Todos los campos son obligatorios");
    error.status = 400;
    throw error;
  }

  // Normalizar el correo
  const emailNormalizado = email.trim().toLowerCase();
  //Comprobar si el correo ya exixte
  const medicoExistente = await Medico.findOne({ email: emailNormalizado });

  if (medicoExistente) {
    const error = new Error("El correo ya está registrado");
    error.status = 409;
    throw error;
  }

  // Crear el médico
  const medico = await Medico.create({
    nombre,
    especialidad,
    email: emailNormalizado,
    password,
  });

  // Generar token JWTs
  const token = firmarToken(medico);
  return { medico, token };
};

export const login = async (email, password) => {
  const medico = await Medico.findOne({ email });
  if (!medico) return null;

  const ok = await medico.compararPassword(password);
  if (!ok) return null;

  const token = firmarToken(medico);
  return { medico, token };
};
