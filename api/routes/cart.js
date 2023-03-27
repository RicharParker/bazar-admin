import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import express from "express";
import { createCart, updateCart,deleteCart,getCartUser,getCarts } from "../controller/CartController.js";
const router = express.Router();

//Crear
router.post("/", verifyToken,createCart);

//Actualizar
router.put("/:id", verifyUser,updateCart);

//eliminar
router.delete("/:id", verifyUser,deleteCart);

//Obtener carrito de un usuario
router.get("/find/:userId", verifyUser,getCartUser);

//Obtener todos los carritos
router.get("/", verifyAdmin,getCarts);

export default router;
