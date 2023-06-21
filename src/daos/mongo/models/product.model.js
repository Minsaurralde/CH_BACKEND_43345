import mongoose from "mongoose";

const nameCollection = "products"; // asi se llama la coleccion en la base de datos

const customScheema = new mongoose.Schema({
  //aqui escribimos todas las propiedades que debe tener nuestro modelo
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  status: { type: Boolean, required: true },
});

export const productModel = mongoose.model(nameCollection, customScheema);
