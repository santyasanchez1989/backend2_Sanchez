import { Router } from "express";
import userDao from "../dao/mongoDB/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import passport from "passport";
import { createToken } from "../utils/jwt.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

router.post("/register", passportCall("register"), async (req, res) => {
  try {
    res.status(201).json({ status: "ok", msg: "Usuario creado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Error interno del servidor" });
  }
});

router.post("/login", passportCall("login"), async (req, res) => {
  try {
    const token = createToken(req.user);

    res.cookie("token", token, { httpOnly: true });
    
    return res.status(200).json({ status: "ok", payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Error interno del servidor" });
  }
});


router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false,
  }),
  async (req, res) => {
    try {
      return res.status(200).json({ status: "ok", payload: req.user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
  }
);

router.get("/current", passportCall("current"), async (req, res) => {
  res.status(200).json({ status: "ok", user: req.user });
});

export default router;