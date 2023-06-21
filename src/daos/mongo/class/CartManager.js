import mongoose from "mongoose";
import { cartModel } from "../models/cart.model.js";
import mongoUri from "../constants/mongourl.js";

class CartManager {
  DBconection = mongoose.connect(mongoUri);

  getCarts = async () => {
    let result = await cartModel.find();
    return result;
  };

  getCartsById = async (id) => {
    let result = await cartModel.findOne({ _id: id });
    return result;
  };

  addCart = async () => {
    const newCart = {
      products: [],
    };
    const result = await cartModel.create(newCart);
    return result;
  };

  addProductCart = async (cartID, prodID, Qty) => {
    if (!cartID || !prodID || !Qty) {
      throw new Error("addProductCart responde: faltan datos obligatorios");
    }

    const cart = await this.getCartsById(cartID);

    const prodList = cart.products;
    console.log(prodList);

    const existsProd = prodList.findIndex(
      (el) => el.product.toString() === prodID
    );

    if (existsProd == -1) {
      cart.products.push({ product: prodID, quantity: Qty });
    } else {
      prodList[existsProd].quantity += Qty;
    }
    cart.save();

    return;
  };
}

export default CartManager;
