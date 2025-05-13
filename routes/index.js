import express from "express";
import usuarioRoutes from "./UsuarioRoutes.js";
import doctorRouters from "./DoctorRouters.js";
import agendaRouters from "./AgendaRouters.js";
import pacienteRouters from "./PacienteRouters.js";
import administrativoRouters from "./AdministrativoRouters.js";
import graficoRouters from "./GraficoRouters.js";
import authRouters from "./AuthRouters.js";

// Importamos todas las rutas en un solo archivo
// y las centralizamos en un solo router

const mainRouters = express.Router();

mainRouters.use("/usuarios", usuarioRoutes);
mainRouters.use("/doctor", doctorRouters);
mainRouters.use("/agenda", agendaRouters);
mainRouters.use("/paciente", pacienteRouters);
mainRouters.use("/administrativo", administrativoRouters);
mainRouters.use("/graficos", graficoRouters);
mainRouters.use("/", authRouters);

export default mainRouters;
