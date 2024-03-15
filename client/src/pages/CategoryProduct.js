import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../contextApi/cart";
import toast from "react-hot-toast";

function CategoryProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  //Get products by category
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data.products);
      setCategory(data.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProducts();
  }, [params?.slug]);

  return (
    <Layout>
      <h4 className="text-center my-3">{category.name}</h4>
      {products.length < 1 && <p className="text-center">No products found</p>}
      <div className="d-flex flex-wrap justify-content-center">
        {products.map((p) => (
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
    </Layout>
  );
}

export default CategoryProduct;
