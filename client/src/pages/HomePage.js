import React, { useState, useEffect } from "react";
import "../Styles/HomePage.css";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../contextApi/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { PriceRange } from "../components/PriceRange";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contextApi/cart";
import { AiOutlineReload } from "react-icons/ai";
import toast from "react-hot-toast";

function HomePage() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //Get all the categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    totalProduct();
  }, []);

  //Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      // console.log(error);
    }
  };

  //Get total products
  const totalProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/total-product`
      );
      setTotal(data.total);
    } catch (error) {
      // console.log(error);
    }
  };

  //Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data.products]);
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page == 1) return;
    loadMore();
  }, [page]);

  //Get Filtered Products
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filter`,
        { checked, radio }
      );
      setProducts(data.products);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length == 0 && radio.length == 0) {
      getAllProducts();
    }
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProducts();
    }
  }, [checked, radio]);

  return (
    <Layout title={"EcoMart - Best Offers"}>
      {/* <p>{JSON.stringify(radio)}</p> */}

      {/* banner image */}
      <img
        src="./images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      {/* banner image */}

      <div className="container-fluid p-3 mt-3 home-page">
        <div className="row">
          <div className="col-md-2 filters">
            <h4>Filters</h4>
            {/* filter by category  */}
            <div className="mb-3">
              <h5 className="" style={{ fontWeight: "400" }}>
                Select by Category
              </h5>
              <div className="d-flex flex-column checkbox">
                {categories.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
            </div>

            {/* filter by price  */}
            <div className="mb-3">
              <h5 className="" style={{ fontWeight: "400" }}>
                Select by Price
              </h5>
              <div className="d-flex flex-column">
                <Radio.Group
                  onChange={(e) => setRadio(e.target.value)}
                  className="checkbox"
                >
                  {PriceRange.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-dark mb-4"
                onClick={() => window.location.reload()}
                style={{ width: "100%" }}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="col-md-10">
            <h3 className="text-center mb-3" style={{ fontWeight: 600 }}>
              All Products
            </h3>
            <div className="d-flex flex-wrap justify-content-center">
              {products.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
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
                    <p className="card-text">
                      {p.description.substring(0, 60)}
                    </p>

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
            <div className="m-3">
              {products && products.length < total && (
                <button
                  className="btn loadmore"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    "Loading ..."
                  ) : (
                    <>
                      {" "}
                      Loadmore <AiOutlineReload />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
