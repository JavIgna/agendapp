import mongoose from "mongoose";
import bcrypt from "bcrypt";

const esquemaUsuario = new mongoose.Schema(
  {
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    rol: {
      type: String,
      enum: ["admin", "doctor", "administrativo"],
      required: true,
    },
  },
  { timestamps: true }
);

esquemaUsuario.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const textoAleatorio = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, textoAleatorio);
  next();
});

// agregando comentario a modelo Usuario
export const Usuario = mongoose.model("Usuario", esquemaUsuario);
