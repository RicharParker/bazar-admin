import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { updateUser, deleteUser,getUser, getUsers } from "../controller/UserController.js";
import express from "express";

const router = express.Router();

//Actualizar
router.put("/:id", verifyUser,updateUser );

//Eliminar
router.delete("/:id", verifyUser, deleteUser);

//Obtener un usuario
router.get("/find/:id", verifyAdmin, getUser);

//Obtener todos los usuarios
router.get("/", verifyAdmin, getUsers );

export default router
