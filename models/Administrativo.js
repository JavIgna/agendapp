import mongoose from "mongoose";

const esquemaAdministrativo = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
      unique: true,
    },
    rut: {
      type: String,
      required: [true, "El Rut es Obligatorio"],
      match: [/^\d{7,8}-[0-9kK]$/, "El formato es incorrecto"],
      unique: true,
      trim: true,
    },
    nombreCompleto: {
      type: String,
      required: [true, "El Nombre es Obligatorio"],
    },
  },
  { timestamps: true }
);

export const Administrativo = mongoose.model("Administrativo", esquemaAdministrativo);
