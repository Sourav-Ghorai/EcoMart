import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

//Create Product controller
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //Validation checking
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is require" });
      case !description:
        return res.status(400).send({ error: "Description is require" });
      case !price:
        return res.status(400).send({ error: "Price is require" });
      case !category:
        return res.status(400).send({ error: "Category is require" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is require" });
      case photo && photo.size > 1000000:
        return res
          .status(400)
          .send({ error: "Photo is require and should be less than 1MB" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "Product added successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

//Get all products controller
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({}, { photo: 0 })
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Here are all the products",
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching product",
      error,
    });
  }
};

//Get single Product
export const singleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug }, { photo: 0 })
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Here is the product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching product",
      error,
    });
  }
};

//Get product photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid, { photo: 1 });
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching product photo",
      error,
    });
  }
};

//Update product controller
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //Validation checking
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is require" });
      case !description:
        return res.status(400).send({ error: "Description is require" });
      case !price:
        return res.status(400).send({ error: "Price is require" });
      case !category:
        return res.status(400).send({ error: "Category is require" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is require" });
      case photo && photo.size > 1000000:
        return res
          .status(400)
          .send({ error: "Photo is require and should be less than 1MB" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      {
        new: true,
      }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating product",
      error,
    });
  }
};

//Delete Product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid, { photo: 0 });
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting product",
      error,
    });
  }
};
