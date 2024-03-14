import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../contextApi/search";

function Search() {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Result - EcoMart"}>
      <div className="container">
        <div className="text-center">
          <h4>Search Result</h4>
          <h6>
            {values?.result.length < 1
              ? "No result found"
              : `Found: ${values.result.length}`}
          </h6>
        </div>
        <div className="d-flex flex-wrap justify-content-center">
            {values?.result.map((p) => (
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
                  <a href="#" class="btn btn-primary ms-2">
                    More Details
                  </a>
                  <a href="#" class="btn btn-secondary ms-2">
                    Add to Cart
                  </a>
                </div>
              </div>
            ))}
          </div>
      </div>
    </Layout>
  );
}

export default Search;
