import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import Product from "../models/Product.js";
import { createProduct,updateProduct, deleteProduct,getProduct,getProducts } from "../controller/ProductController.js";
import express from "express";
const router = express.Router();

//Crear producto
router.post("/", verifyAdmin, createProduct );

//Actualizar producto
router.put("/:id", verifyAdmin,updateProduct );

//Eliminar producto
router.delete("/:id", verifyAdmin,deleteProduct);

//Obtener producto
router.get("/find/:id", getProduct);

//Obtener todos los productos
router.get("/", getProducts);

export default router
