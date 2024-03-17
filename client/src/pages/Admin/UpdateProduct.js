import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useAuth } from "../../contextApi/auth";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";

//Destructing only Option from Select to show the categories as a dropdown
const { Option } = Select;

function UpdateProduct() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [auth, setAuth] = useAuth();
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [show, setShow] = useState(false);

  //Get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.pid}`
      );
      // console.log(data);
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setCategory(data.product.category._id);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();

    //eslint-disable-next-line
  }, []);

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
      // console.log(error);
      toast.error("Something went worng in getting categories!");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //Update Product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // for having image file we are using Form Data which is browser property
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      photo && productData.append("photo", photo);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.error);
      }
      // console.log(data);
    } catch (error) {
      // console.log(error);
      toast.error("Something went worng in updating product");
    }
  };

  //Delete Product
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      toast.success(data.message);
      navigate("/dashboard/admin/products");
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Admin - CreateProduct"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h4>Update Product</h4>
            <div className="p-3 col-md-8">
              <Select
                placeholder="Select a Category"
                showSearch
                size="large"
                className="w-100 mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-secondary col-md-12">
                  {photo ? photo.name : "Upload image"}
                  <input
                    type="file"
                    accept="image/*"
                    name="photo"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product-image"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                      alt="product-image"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  placeholder="Description"
                  rows="3"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Price"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  placeholder="Select Shipping"
                  showSearch
                  size="large"
                  className="w-100 mb-3"
                  onChange={(value) => setShipping(value)}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update Product
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Delete Product
                </button>
              </div>
            </div>
            <Modal
              onCancel={() => setShow(false)}
              width="300px"
              footer={null}
              open={show}
            >
              <div>
                <p>Are you sure, you want to delete the product?</p>
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger ms-2"
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateProduct;
