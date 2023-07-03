import { Router } from "express";

import ProductManager from "../daos/mongo/class/ProductManager.js";

const router = Router();

router.get("/", async (req, res) => {
  const limit = req.query.limit && Number(req.query.limit);
  const page = req.query.page && Number(req.query.page);
  const sort = req.query.sort && Number(req.query.sort);
  const { filter, filterVal } = req.query;

  //creo instancia de la clase
  const instancia1 = new ProductManager();
  //obtengo los datos
  const data = await instancia1.getProducts(
    limit,
    page,
    sort,
    filter,
    filterVal
  );
  const hasData = !!data.payload.length;

  res.render("home", { hasProduct: hasData, showDelete: false, product: data });
});

router.get("/realtimeproducts", async (req, res) => {
  //creo instancia de la clase
  const instancia1 = new ProductManager();
  //obtengo los datos
  const data = await instancia1.getProducts();
  const hasData = !!data.payload.length;

  res.render("realTimeProducts", {
    hasProduct: hasData,
    showDelete: true,
    product: data,
  });
});

router.get("/chat", async (req, res) => {
  res.render("chat", { data: false });
});

export default router;
