import mongoose from "mongoose";

const nameCollection = "carts"; // asi se llama la coleccion en la base de datos

const customScheema = new mongoose.Schema({
  //aqui escribimos todas las propiedades que debe tener nuestro modelo
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products", // NOTA: que es esta referencia? de donde sale?
        },
        quantity: Number,
      },
    ],
  },
});

export const cartModel = mongoose.model(nameCollection, customScheema);
