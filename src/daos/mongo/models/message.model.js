import mongoose from "mongoose";

const nameCollection = "messages"; // asi se llama la coleccion en la base de datos

const customScheema = new mongoose.Schema({
  //aqui escribimos todas las propiedades que debe tener nuestro modelo
  user: String,
  message: String,
});

export const msgModel = mongoose.model(nameCollection, customScheema);
