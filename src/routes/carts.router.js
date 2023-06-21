import { Router } from "express";
import ProductManager from "../daos/mongo/class/ProductManager.js";
import CartManager from "../daos/mongo/class/CartManager.js";

const router = Router();

// Debe crear un nuevo carrito. estructura id: number|string, products: []
router.post("/", async (req, res) => {
  const newProduct = req.body;
  //creo instancia de la clase
  const instancia1 = new CartManager();

  //agrego un carrito
  try {
    await instancia1.addCart();
    res.status(200).send({ exito: "fue agregado con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Debe listar los productos que pertenezcan al carrito con el parámetro cid.
router.get("/", async (req, res) => {
  //creo instancia de la clase
  const instancia1 = new CartManager();

  //solicito los datos
  try {
    const response = await instancia1.getCarts();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Debe listar los productos que pertenezcan al carrito con el parámetro cid.
router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  //creo instancia de la clase
  const instancia1 = new CartManager();

  //solicito los datos
  try {
    const response = await instancia1.getCartsById(cartId);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Debe agregar el producto al arreglo “products” del carrito seleccionado. estructura "product": id, "quantity": N (si ya existe el prod, incrementar)
router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const prodId = req.params.pid;

  //creo instancia de la clase
  const instancia1 = new ProductManager();
  const instancia2 = new CartManager();

  //inserto los datos
  try {
    await instancia1.getProductById(prodId); // 1 - valido prodId
    await instancia2.addProductCart(cartId, prodId, 1); // 2 - proceso el update
    res.status(200).send({ exito: "fue agregado con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
