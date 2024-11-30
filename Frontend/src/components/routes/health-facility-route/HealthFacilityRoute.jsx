import React from "react";
import { useParams, useLocation, matchPath } from "react-router-dom";
import { path } from "../../../utils/constants";
import ClinicIntroduction from "../../patients/pages/health-facility/clinic-introduction/ClinicIntroduction";

const HealthFacilityRoute = () => {
  const location = useLocation();
  const { slug } = useParams();

  const isBaseMedicalService = matchPath(
    path.HEALTH_FACILITY.BASE,
    location.pathname
  );

  if (isBaseMedicalService) {
    return <ClinicIntroduction />;
  }
};

export default HealthFacilityRoute;
