import React from "react";
import Header from "../../../partials/header/Header";
import BackToTop from "../../../partials/back-to-top/BackToTop";
import Footer from "../../../partials/footer/Footer";
import { Outlet } from "react-router-dom";

function HomePage() {
  return (
    <>
      <Header />
      <main className="app-content">
        <Outlet />
        <BackToTop />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
