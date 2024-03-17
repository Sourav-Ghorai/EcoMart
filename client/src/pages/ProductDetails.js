import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contextApi/cart";
import toast from "react-hot-toast";
import "../Styles/ProductDetails.css";

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
      <div className="container-fluid mb-5 product-details">
        <div className="row ">
          <div className="col-md-4 text-center">
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
              className="card-img-top mb-3"
              alt="Product-image"
              style={{ width: "60%" }}
            />
          </div>
          <div className="col-md-6 product-details-info px-4">
            <h2 className="text-center" style={{ fontWeight: "400" }}>
              Product Details
            </h2>
            <hr />
            <h6>Name : {product.name}</h6>
            <h6>Description : {product.description}</h6>
            <h6>
              Price :
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </h6>
            <h6>Category : {product?.category?.name}</h6>
            <button
              class="btn btn-secondary mt-2"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Product added to cart successfully");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <hr />
      <div className="container-fluid similar-products">
        <h4 className="my-3" style={{ fontWeight: "400" }}>
          Similar Products ➡️
        </h4>
        {relatedProduct.length < 1 && (
          <p className="text-center">No similar products found</p>
        )}
        <div className="d-flex flex-wrap justify-content-center mb-3">
          {relatedProduct.map((p) => (
            <div className="card m-3" style={{ width: "18rem" }} key={p._id}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt="Product-image"
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h5>
                </div>
                <p className="card-text">{p.description.substring(0, 60)}</p>

                <div className="card-name-price">
                  <button
                    class="btn btn-info ms-2"
                    onClick={() => navigate(`/product/${p._id}`)}
                  >
                    More Details
                  </button>
                  <button
                    class="btn btn-dark ms-2"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Product added to cart successfully");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;
