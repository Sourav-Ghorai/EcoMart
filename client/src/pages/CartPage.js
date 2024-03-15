import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../contextApi/auth";
import { useCart } from "../contextApi/cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CartPage() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //Calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Handle remove cart item
  const removeCartItem = (pid) => {
    try {
      const myCart = [...cart];
      const index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item removed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <h4
              className="text-center "
              style={{ fontWeight: "400" }}
            >{`Hello ${auth?.token && auth.user.name}`}</h4>

            <h6
              className="text-center mb-4"
              style={{ fontSize: "1.1rem", fontWeight: "300" }}
            >
              {cart.length > 0
                ? `You have ${cart.length} items in your cart. ${
                    auth?.token ? "" : "Please login to checkout."
                  }`
                : `You have no items in your cart.`}
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row card flex-row mb-3 p-2">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt="Product-image"
                    style={{ width: "60%" }}
                  />
                </div>
                <div className="col-md-8">
                  <p className="my-1">Name: {p.name}</p>
                  <p className="my-1">
                    Description: {p.description.substring(0, 30)}
                  </p>
                  <p className="my-1">Price: {p.price}</p>
                  <button
                    className="btn btn-danger mt-1"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h4 style={{ fontWeight: "400" }}>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h5>Total: {totalPrice()}</h5>
            <hr />
            {auth?.user?.address ? (
              <>
                <div className="m-3">
                  <h5 style={{ fontWeight: "400" }}>Current Address</h5>
                  <h6 style={{ fontWeight: "300" }}>{auth?.user?.address}</h6>
                  <button
                    className="btn btn-outline-warning mt-2"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
