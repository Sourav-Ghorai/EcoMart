import React, { useEffect, useState } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../contextApi/auth";
import axios from "axios";
import moment from "moment";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  //Get all the user orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h4 className="text-center">All Orders</h4>
            {orders?.length == 0 ? (
              <h5 className="text-center card bg-light p-5">
                Hey! order something now.
              </h5>
            ) : (
              <>
                {orders?.map((o, i) => (
                  <>
                    <table className="table border shadow">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>{i + 1}</th>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="row my-4 px-3 gap-4">
                      {o?.products?.map((p) => (
                        <div className="col-sm-4 col-lg-3 card p-3">
                          <div className="">
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top"
                              alt="Product-image"
                              style={{ width: "60%" }}
                            />
                          </div>
                          <div className="">
                            <p className="my-1">Name: {p.name}</p>
                            <p className="my-1">
                              Description: {p.description.substring(0, 30)}
                            </p>
                            <p className="my-1">Price: ₹ {p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
