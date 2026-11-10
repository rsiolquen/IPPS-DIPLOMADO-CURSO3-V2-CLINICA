import { Router } from "express";
import { proteger } from "../middlewares/proteger.js";
import * as controller from "../controllers/medico.controller.js";

export const medicoRoutes = Router();

medicoRoutes.get("/", proteger, controller.listar);
medicoRoutes.get("/perfil", proteger, controller.perfil);
medicoRoutes.get("/:id", proteger, controller.obtenerPorId);
medicoRoutes.get("/:id/pacientes", proteger, controller.listarPacientes);
