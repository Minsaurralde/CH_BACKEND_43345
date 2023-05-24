import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./constants/dirnames.js";

const app = express();
//MEMO: "urlencoded" y "json" middlewate de express necesario para obtener información de los query parameters y leer req json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Indicamos que el public es estatico. En la ruta raiz se mostrara el index.html
// app.use(express.static(__dirname + "/public"));

app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);

const server = app.listen(8080, () => {
  console.log("server ready on port 8080");
});
