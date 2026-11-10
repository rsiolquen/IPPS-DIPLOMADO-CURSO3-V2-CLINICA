import { Router } from "express";
import { proteger } from "../middlewares/proteger.js";
import * as controller from "../controllers/paciente.controller.js";

export const pacienteRoutes = Router();

pacienteRoutes.post("/", proteger, controller.crear);
pacienteRoutes.get("/", proteger, controller.listar);
pacienteRoutes.get("/:id", proteger, controller.obtenerPorId);
pacienteRoutes.put("/:id", proteger, controller.actualizar);
pacienteRoutes.delete("/:id", proteger, controller.eliminar);
