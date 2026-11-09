import * as service from "../services/auth.service.js";

export const registrar = async (req, res) => {
  try {
    const datos = req.body;
    console.log("datos recibidos:", datos);

    const resultado = await service.registrar(datos);

    return res.status(201).json(resultado);
  } catch (error) {
    console.error("Error al registrar médico:", error);

    // Correo duplicado en MongoDB
    if (error.code === 11000) {
      return res.status(409).json({
        mensaje: "El correo ya está registrado",
      });
    }

    // Error de validación de Mongoose
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        mensaje: "Datos de entrada inválidos",
      });
    }

    // Error controlado desde el servicio
    if (error.status) {
      return res.status(error.status).json({
        mensaje: error.message,
      });
    }

    // Error inesperado
    return res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res
        .status(400)
        .json({ mensaje: "Email y contraseña son requeridos" });
    }
    const resultado = await service.login(
      email.trim().toLocaleLowerCase(),
      password,
    );
    if (!resultado) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }
    return res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
