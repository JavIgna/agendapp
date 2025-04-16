import mongoose from "mongoose";

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
    },
    rol: {
      type: String,
      enum: ["admin", "doctor"],
      required: true,
    },
  },
  { timestamps: true }
);

// agregando comentario a modelo Usuario
export const Usuario = mongoose.model("Usuario", esquemaUsuario);


//Esquema Paciente
const esquemaPaciente = new mongoose.Schema(
  {
    rut: {
      type: String,
      required: [true, "El Rut es Obligatorio"],
      unique: true,
      trim: true,
     },   
     nombreCompleto: {
      type: String,
      required: [true, "El Nombre es Obligatorio"],      
     },
     genero: {
      type: String,
      required: [true, "El Género es Obligatorio"],      
     },
     fNacimiento:{
      type:Date,
      required:[true, "La fecha de nacimiento es Obligatoria"],
     },
     nFicha:{
      type:String,      
     },
     direccion:{
      type: String,
      required: [true, "La Dirección es Obligatoria"],   
     },
     telefono:{
      type: String,  
     },
     correo: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      match:[/\S+@\S+\.\S+/,"eL correo no tiene un formato válido"],
    },  
  },
  { timestamps: true }
);

// agregando comentario a modelo Usuario
export const Paciente = mongoose.model("Paciente", esquemaPaciente);