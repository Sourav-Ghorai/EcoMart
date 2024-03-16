import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../contextApi/auth";
import { useCart } from "../contextApi/cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

function CartPage() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
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

  //Payment gateway.
  //Get token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //Handle payment function
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        { cart, nonce },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment completed successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
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
          <div className="col-md-6">
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
          <div className="col-md-6 text-center px-5">
            <h4 style={{ fontWeight: "400" }}>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h5>Total: {totalPrice()}</h5>
            <hr />
            {auth?.user?.address ? (
              <>
                <div className="m-2">
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
              <div className="mb-2">
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
            {!clientToken || !cart.length ? (
              ""
            ) : (
              <div className="mt-3">
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  className="btn btn-primary mt-3 mb-5"
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth?.user?.address}
                >
                  {loading ? "Processing...." : "Make Payment"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
