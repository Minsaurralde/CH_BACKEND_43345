import mongoose from "mongoose";
import { productModel } from "../models/product.model.js";
import mongoUri from "../constants/mongourl.js";

class ProductManager {
  DBconection = mongoose.connect(mongoUri);

  getProducts = async () => {
    let result = await productModel.find().lean(); // se agrega lean para que se convierta en un array de objetos comun
    return result;
  };

  getProductById = async (id) => {
    let result = await productModel.findOne({ _id: id });
    return result;
  };

  addProduct = async (product) => {
    const newProduct = { ...product, status: true };
    const result = await productModel.create(newProduct);
    return result;
  };

  updateProduct = async (id, product) => {
    let result = await productModel.updateOne({ _id: id }, { $set: product });
    return result;
  };

  deleteProduct = async (id) => {
    let result = await productModel.deleteOne({ _id: id });
    return result;
  };
}

export default ProductManager;
