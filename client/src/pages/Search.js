import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../contextApi/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contextApi/cart";
import toast from "react-hot-toast";
import "../Styles/CategoryProduct.css";

function Search() {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  return (
    <Layout title={"Search Result - EcoMart"}>
      <div className="container category">
        <h4 className="text-center">Search Result</h4>
        <h6 className="text-center">{values?.result.length} result found </h6>

        <div className="d-flex flex-wrap justify-content-center mb-3">
          {values?.result.map((p) => (
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

export default Search;
