import React, { useEffect } from "react";
import "./App.scss";
import { Cloudinary } from "@cloudinary/url-gen";
import { useMatch } from "react-router-dom";
import HomePage from "./components/patients/pages/home-page/HomePage";
import AdminHomePage from "./components/admin/pages/home-page/AdminHomePage";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Chatbox from "./components/partials/chatbox/Chatbox";

library.add(fas, far);

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
    <div>
      {!isAdminPage ? <HomePage /> : <AdminHomePage cloudInstance={cld} />}

      <Chatbox />
    </div>
  );
}

export default App;
