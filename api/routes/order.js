import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { createOrder, updateOrder, deleteOrder, getOrderUser, getOrders} from "../controller/OrderController.js";
import express from "express";
const router = express.Router();


//Crear orden
router.post("/", verifyToken, createOrder);

//Actualizar orden
router.put("/:id", verifyAdmin, updateOrder);

//Eliminar orden
router.delete("/:id", verifyAdmin,deleteOrder);

//Obtener las ordenes de un usuario
router.get("/find/:userId", verifyUser,getOrderUser);

//Obtener todas las ordenes
router.get("/", verifyAdmin, getOrders);


export default router
