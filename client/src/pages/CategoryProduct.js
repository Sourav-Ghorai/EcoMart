import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CategoryProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

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
              <a class="btn btn-secondary ms-2">Add to Cart</a>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default CategoryProduct;
