import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  User.findOne({ email }).then((usuario) => {
    if (usuario) {
      return res.json({ mensaje: "Ya existe un usuario con ese email" });
    } else if (!username || !email || !password) {
      return res.json({ mensaje: "Falta el username / email / contraseña" });
    } else {
      bcrypt.hash(password, 10, (error, passwordHasheada) => {
        if (error) res.json({ error });
        else {
          const nuevoUser = new User({
            username,
            email,
            password: passwordHasheada,
          });

          nuevoUser
            .save()
            .then((usuario) => {
              res.json({ mensaje: "Usuario creado correctamente", usuario });
            })
            .catch((error) => console.error(error));
        }
      });
    }
  });
};


export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User no encontrado!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "User o password incorrectas!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "hola"
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
