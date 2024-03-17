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
           <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
           <div className="card">
             <Link to={`/category/${c.slug}`} className="btn cat-btn">
               {c.name}
             </Link>
           </div>
         </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Categories;
