import mongoose from "mongoose";

export const conectarDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("conectado a la DB");
};
