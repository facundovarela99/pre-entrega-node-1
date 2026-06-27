import { Router } from "express";
import { deleteProductController, getAllProducts, getByCategoryController, getByID, saveProductController, updateProductController } from "../controllers/product.controller.js";

export const productsRouter = Router();

productsRouter.get('/', getAllProducts);
productsRouter.get('/:id', getByID);
productsRouter.get('/category/:category', getByCategoryController);
productsRouter.post('/create', saveProductController);
productsRouter.patch('/update/:id', updateProductController);
productsRouter.delete('/delete/:id', deleteProductController);