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
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h4 className="text-center p-2">{`Hello ${
              auth?.token && auth.user.name
            }`}</h4>

            <p className="text-center" style={{ fontSize: "1.1rem" }}>
              {cart.length > 0
                ? `You have ${cart.length} items in your cart. ${
                    auth?.token ? "" : "Please login to checkout."
                  }`
                : `You have no items in your cart.`}
            </p>
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
            <h4>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h5>Total: {totalPrice()}</h5>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
