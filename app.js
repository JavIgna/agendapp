import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/UsuarioRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);

const iniciarServidor = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conexión a MongoDB exitosa");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`❌ Error al iniciar el servidor: ${error}`);
    process.exit(1);
  }
};

iniciarServidor();
