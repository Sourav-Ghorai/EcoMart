import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contextApi/cart";
import toast from "react-hot-toast";

function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params?.pid}`
      );
      setProduct(data.product);
      // console.log(data?.product._id, data?.product.category._id)
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.pid) getProduct();
  }, [params?.pid]);

  //Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      // console.log(data);
      setRelatedProduct(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container my-4">
        <div className="col-md-6 text-center">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top mb-2"
            alt="Product-image"
            style={{ width: "60%" }}
          />
        </div>
        <div className="col-md-6">
          <h4 className="mb-3" style={{ fontWeight: "400" }}>
            Product Details
          </h4>
          <p className="my-1">Name: {product.name}</p>
          <p className="my-1">Description: {product.description}</p>
          <p className="my-1">Price: {product.price}</p>
          <p className="my-1">Category: {product.category?.name}</p>
          <button
            class="btn btn-secondary mt-2"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Product added to cart successfully");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h5 className="px-3" style={{ fontWeight: "400" }}>
          Similar Products
        </h5>
        {relatedProduct.length < 1 && (
          <p className="text-center">No similar products found</p>
        )}
        <div className="d-flex flex-wrap justify-content-center">
          {relatedProduct.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt="Product-image"
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}</p>
                <p className="card-text">₹ {p.price}</p>
                <a
                  class="btn btn-primary ms-2"
                  onClick={() => navigate(`/product/${p._id}`)}
                >
                  More Details
                </a>
                <button
                  class="btn btn-secondary ms-2"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Product added to cart successfully");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;
