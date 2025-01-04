import React, { useEffect } from "react";
import "./App.scss";
import { Cloudinary } from "@cloudinary/url-gen";
import { useMatch } from "react-router-dom";
import HomePage from "./components/patients/pages/home-page/HomePage";
import AdminHomePage from "./components/admin/pages/home-page/AdminHomePage";

function App() {
  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME },
  });
  const isAdminPage = useMatch("/admin/*");

  useEffect(() => {
    if (isAdminPage) {
      document.body.classList.add("no-scroll");
    }
  }, [isAdminPage]);

  return (
    <>{!isAdminPage ? <HomePage /> : <AdminHomePage cloudInstance={cld} />}</>
  );
}

export default App;
