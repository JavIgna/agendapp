import express from "express";
import {
  borrarUsuario,
  editarUsuario,
  listarUsuarios,
  registrarUsuario,
  verUsuario,
} from "../controllers/UsuarioController.js";

const router = express.Router();

router.post("/crear", registrarUsuario);
router.get("/listar", listarUsuarios);
router.get("/ver/:id", verUsuario);
router.put("/actualizar/:id", editarUsuario);
router.delete("/eliminar/:id", borrarUsuario);

export default router;
