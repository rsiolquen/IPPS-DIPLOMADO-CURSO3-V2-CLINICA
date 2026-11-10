import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";

export const proteger = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Falta el token" });
  }
  //Bearer edwsdadd4.32223123.dfadsadasd
  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.medico = payload;
    next();
  } catch {
    return res.status(401).json({
      error: "Token inválido o expirado",
    });
  }
};
