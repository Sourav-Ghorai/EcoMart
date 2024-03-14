import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

function Categories() {
  const categories = useCategory();
  return (
    <Layout>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 my-4">
              <Link to={`/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Categories;
