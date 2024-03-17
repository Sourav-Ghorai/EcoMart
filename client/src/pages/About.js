import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - EcoMart"}>
      <div className="row contactUs ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h3
            className="p-3 text-white text-center"
            style={{ background: "rgb(66, 66, 66)" }}
          >
            About Us
          </h3>
          <p className="text-justify mt-2">
          At EcoMart, we're dedicated to provide top-quality products and exceptional service. With a passion for innovation and customer satisfaction, we strive to exceed expectations in every interaction. Our team is committed to transparency, integrity, and fostering lasting relationships with our valued customers. From our humble beginnings to our vision for the future, discover the journey of EcoMart and join us in shaping a brighter tomorrow.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
