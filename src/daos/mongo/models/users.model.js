import mongoose from "mongoose";

const nameCollection = "users"; // asi se llama la coleccion en la base de datos

const customScheema = new mongoose.Schema({
  //aqui escribimos todas las propiedades que debe tener nuestro modelo
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

export const userModel = mongoose.model(nameCollection, customScheema);
