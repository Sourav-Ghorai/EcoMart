import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  productCategoryController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  singleProductController,
  totalProductController,
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

//Filter product
router.post("/product-filter", productFilterController);

//Total product count
router.get("/total-product", totalProductController);

//Product lists according to page
router.get("/product-list/:page", productListController);

//Search Product
router.get("/search/:keyword", searchProductController);

//Similar Product
router.get("/related-product/:pid/:cid", relatedProductController);

//Get product by category
router.get("/product-category/:slug", productCategoryController);

export default router;
