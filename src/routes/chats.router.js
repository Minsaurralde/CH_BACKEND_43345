import { Router } from "express";
import MsgManager from "../daos/mongo/class/MsgManager.js";

const router = Router();

// Debe listar todos los chats
router.get("/", async (req, res) => {
  //creo instancia de la clase
  const instancia1 = new MsgManager();

  //solicito los datos
  try {
    const response = await instancia1.getAllMsg();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Debe crear un nuevo mensaje
router.post("/", async (req, res) => {
  const { user, message } = req.body;
  //creo instancia de la clase
  const instancia1 = new MsgManager();

  //agrego msj
  try {
    await instancia1.addMsg(user, message);

    // req.socketServer.sockets.emit("EVENTNAME", DATA);
    res.status(200).send({ exito: "fue agregado con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
