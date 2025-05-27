import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import mainRouters from "./routes/index.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: "http://localhost:5173/" }));

app.use(express.json());

// Eliminamos las rutas y las centralizamos en un solo archivo
app.use("/api", mainRouters);

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
