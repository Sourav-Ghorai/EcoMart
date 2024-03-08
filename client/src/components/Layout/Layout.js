import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

function Layout({ children, title, description, keywords, author }) {
  return (
    <>
      {/* For setting title according to different page we use Helmet  */}
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />
      {/* For generating success popup or error popup, we use toaster  */}
      <Toaster />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: "EcoMart - Shop Now",
  description: "Buy your favourite items quickly",
  keywords: "MERN",
  author: "Sourav Ghorai",
};

export default Layout;
