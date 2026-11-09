import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const medicoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    especialidad: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true },
);

// Cifrar contraseña antes de guardar
medicoSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// Comparar contraseña durante el login
medicoSchema.methods.compararPassword = function (passwordPlano) {
  return bcrypt.compare(passwordPlano, this.password);
};

// Evitar que la contraseña aparezca en el JSON
medicoSchema.set("toJSON", {
  transform: function (doc, obj) {
    delete obj.password;
    return obj;
  },
});

export const Medico = mongoose.model("Medico", medicoSchema, "medicos");
