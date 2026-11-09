import express from "express";
import cors from "cors";

import { conectarDB } from "./config/db.js";

import { authRoutes } from "./routes/auth.routes.js";
import { medicoRoutes } from "./routes/medico.route.js";
import { pacienteRoutes } from "./routes/paciente.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
//http://localhost:3001/auth/registrar/
//http://localhost:3001/auth/login/

app.use("/medicos", medicoRoutes);

app.use("/pacientes", pacienteRoutes);

await conectarDB();

app.listen(3001, () => {
  console.log("levantmos al API");
});
