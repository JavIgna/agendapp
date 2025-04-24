import express from "express";
import { registrarUsuario } from "../controllers/UsuarioController.js";


const router = express.Router();

router.post("/crear", registrarUsuario);


export default router;