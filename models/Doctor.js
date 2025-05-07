import mongoose from "mongoose";

// TODO agrega estado, para que el doctor pueda estar inactivo o activo y no tener que eliminarlo
const esquemaDoctor = new mongoose.Schema(
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
    especialidad: {
      type: [String],
      required: [true, "La Especialidad es Obligatoria"],
    },
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", esquemaDoctor);
