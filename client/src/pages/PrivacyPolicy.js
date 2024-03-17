import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactUs ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h3
            className="p-3 text-white text-center"
            style={{ background: "rgb(66, 66, 66)" }}
          >
            Privacy Policy
          </h3>
          <p>Clearly outline types of collected data and purpose.</p>
          <p>Describe how collected data is utilized.</p>
          <p>Detail measures ensuring data protection and confidentiality.</p>
          <p>Disclose any sharing of data with external parties.</p>
          <p>Explain users' data access and control options.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
