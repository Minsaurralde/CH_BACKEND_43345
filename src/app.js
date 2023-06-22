import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";

import viewsRouter from "./routes/views.router.js";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import chatsRouter from "./routes/chats.router.js";

import ProductManager from "./daos/mongo/class/ProductManager.js";
import __dirname from "./constants/dirnames.js";
import mongoUri from "./daos/mongo/constants/mongourl.js";
import MsgManager from "./daos/mongo/class/MsgManager.js";

const app = express();
//MEMO: "urlencoded" y "json" middlewate de express necesario para obtener información de los query parameters y leer req json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//MEMO: handlebars es un motor de plantillas que simula un front basico
app.engine("handlebars", handlebars.engine()); // 1 - inicializar
app.set("views", `${__dirname}/src/views`); // 2 - setear la ruta de las vistas
app.set("view engine", "handlebars"); // 3 - setear para que el server renderice con handlebars

// Indicamos que el public es estatico. En la ruta raiz se mostrara el index.html
app.use(express.static(`${__dirname}/public`));

const httpServer = app.listen(8080, () =>
  console.log("server ready on port 8080")
);

const DBconection = mongoose.connect(mongoUri);

const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  console.log("New conection id: " + socket.id);

  socket.on("new-product", async (newProduct) => {
    try {
      const instancia1 = new ProductManager();
      const res = await instancia1.addProduct(newProduct);

      //si todo sale bien envio el update al cliente
      socket.emit("update", res);
    } catch (error) {
      //si hay un error envio el detalle del error
      socket.emit("error", error.message);
    }
  });

  socket.on("chat-authenticated", async (newUser) => {
    socket.broadcast.emit("alert-chat-user", newUser);
  });
  socket.on("chat-message", async (newMessage) => {
    const { user, message } = newMessage;
    try {
      const instancia1 = new MsgManager();
      const res = await instancia1.addMsg(user, message);

      //si todo sale bien imprimo el msj en todos los clientes
      socketServer.emit("chat-print", res);
    } catch (error) {
      //si hay un error envio el detalle del error
      socket.emit("error", error.message);
    }
  });
});

//codigo para agregar el servidor de websocket en todas las pegadas (las rutas deben ir debajo)
// app.use((req, res, next) => {
//   req.socketServer = socketServer;
//   next();
// });

//RUTAS DISPONIBLES
app.use("/", viewsRouter);
app.use("/api/carts/", cartsRouter);
app.use("/api/products/", productsRouter);
app.use("/api/chats/", chatsRouter);
