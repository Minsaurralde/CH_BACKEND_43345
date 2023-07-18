import { Router } from "express";
import { userModel } from "../daos/mongo/models/users.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";

const router = Router();

// Debe mostrar la vista para reistrarase
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  const exist = await userModel.findOne({ email: email });
  //si el usuario ya existe devuelvo error
  if (exist) return res.status(400).send({ error: "existent user" });

  //si el usuario no existe, lo guardi en la base de datos
  try {
    const result = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
    });
    res.status(200).send({ status: "success", message: "register ok" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Debe mostrar la vista para hacer la autenticacion, si la sesion no existe
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
  });
  if (!user) return res.status(404).send({ error: "user not found" });

  if (!isValidPassword(user, password))
    return res.status(403).send({ error: "incorrect password" });

  delete user.password; // IMPORTANTE:  borrar el password porque es un dato sensible

  try {
    req.session.user = {
      name: user.first_name + " " + user.last_name,
      email: user.email,
      age: user.age,
    };

    res.status(200).send({ status: "success", message: req.session.user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/logout", async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).send({ status: "success", message: "Logout OK!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/restartPassword", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email });
  if (!user) return res.status(404).send({ error: "user not found" });

  const newPass = createHash(password);

  try {
    const result = await userModel.updateOne(
      { _id: user._id },
      { $set: { password: newPass } }
    );
    res.status(200).send({ status: "success", message: "update ok" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
