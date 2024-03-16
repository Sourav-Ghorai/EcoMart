import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

//Payment gateway
let gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//Create Product controller
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //Validation checking
    switch (true) {
      case !category:
        return res.status(200).send({ error: "Category is require" });
      case !photo:
        return res.status(200).send({ error: "Photo is require" });
      case photo && photo.size > 1000000:
        return res.status(200).send({ error: "Photoshould be less than 1MB" });
      case !name:
        return res.status(200).send({ error: "Name is require" });
      case !description:
        return res.status(200).send({ error: "Description is require" });
      case !price:
        return res.status(200).send({ error: "Price is require" });
      case !quantity:
        return res.status(200).send({ error: "Quantity is require" });
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
      .findOne({ _id: req.params.pid }, { photo: 0 })
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
      case !category:
        return res.status(200).send({ error: "Category is require" });
      case photo && photo.size > 1000000:
        return res.status(200).send({ error: "Photoshould be less than 1MB" });
      case !name:
        return res.status(200).send({ error: "Name is require" });
      case !description:
        return res.status(200).send({ error: "Description is require" });
      case !price:
        return res.status(200).send({ error: "Price is require" });
      case !quantity:
        return res.status(200).send({ error: "Quantity is require" });
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

//Filter Product
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      message: "Here are all the filtered products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while filtering product!",
      error,
    });
  }
};

//Total product count
export const totalProductController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in counting total product",
      error,
    });
  }
};

//Product Lists according to page
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({}, { photo: 0 })
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting product list",
      error,
    });
  }
};

//Search Product Controller
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in searching product",
      error,
    });
  }
};

//Related Product Controller
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error in finding similar products:", error);
    res.status(500).json({
      success: false,
      message: "Error in finding similar products",
    });
  }
};

//Get products by category

export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      products,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while finding products according to category",
      error,
    });
  }
};

//Payment gateway api
//Token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//Payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => (total += i.price));
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
