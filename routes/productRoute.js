import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  productPhotoController,
  singleProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes

//Create Product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//Get all products
router.get("/get-product", getProductController);

//Get single product
router.get("/get-product/:pid", singleProductController);

//Get Photo
router.get("/product-photo/:pid", productPhotoController);

//Update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//Delete Product
router.delete("/delete-product/:pid", deleteProductController);

export default router;
