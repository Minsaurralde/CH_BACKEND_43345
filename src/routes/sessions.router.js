import { Router } from "express";
import passport from "passport";

import { userModel } from "../daos/mongo/models/users.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
// import { passportCall } from "../middleware/passportCall.js";
// import { authorization } from "../middleware/authorization.js";
import jwt from "jsonwebtoken";
import { JWT_COOKIE, JWT_SECRET } from "../constants/enviorments.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { session: false }),
  async (req, res) => {
    res.status(200).send({ status: "success", message: "register ok" });
  }
);

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  async (req, res) => {
    let token = jwt.sign(
      {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
      },
      JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res
      .cookie(JWT_COOKIE, token, { httpOnly: true })
      .status(200)
      .send({ status: "success", message: req.user });
  }
);

router.get(
  "/current",
  passport.authenticate(["jwt", "github"], { session: false }),
  async (req, res) => {
    res.status(200).send(req.user);
  }
);

// router.get(
//   "/current",
//   passportCall(["jwt", "github"], { session: false }),
//   authorization("user"),
//   (req, res) => {
//     res.send(req.user);
//   }
// );

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

router.get(
  "/github",
  passport.authenticate("github", { scope: "user:email" }),
  (req, res) => {}
);

router.get(
  "/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    console.log("exito");
    res.redirect("/");
  }
);

export default router;
