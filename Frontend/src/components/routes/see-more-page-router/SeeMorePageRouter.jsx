import React from "react";
import { useParams, useLocation, matchPath } from "react-router-dom";
import { path } from "../../../utils/constants";
import SeeMorePageClinic from "../../patients/pages/see-more-page/see-more-page-clinic/SeeMorePageClinic";
import SeeMorePage from "../../patients/pages/see-more-page/list-base/SeeMorePage";

function SeeMorePageRouter() {
  const location = useLocation();

  const isAllClinicsList = matchPath(
    path.SEE_MORE_PAGE.ALL_CLINICS,
    location.pathname
  );

  if (isAllClinicsList) {
    return <SeeMorePageClinic />;
  }

  return <SeeMorePage />;
}

export default SeeMorePageRouter;
