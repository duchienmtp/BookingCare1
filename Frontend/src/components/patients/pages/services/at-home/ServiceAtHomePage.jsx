import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSpecificMedicalServices,
  selectLivingHealthyBlogPosts,
} from "../../../../../redux/slices/adminSlice";
import { getAllDataBySlug } from "../../../../../services/admin/SiteServices";
import OnlineDiagnostic from "../../../../patients/online-diagnostic/OnlineDiagnostic";
import QuestionAndAnswer from "../../../../patients/question-and-answer/QuestionAndAnswer";
import LivingHealthy from "../../../../patients/living-healthy/LivingHealthy";
import ImageBanner from "../../../../partials/PageBanner/image-banner/ImageBanner";
import BannerImg from "/src/assets/images/113503-dich-vu-cham-soc-suc-khoe-tai-nha.png";
import TestAtHome from "../../../test-at-home/TestAtHome";
import FamilyPractitioner from "../../../family-practitioner/FamilyPractitioner";

function ServiceAtHomePage() {
  const dispatch = useDispatch();
  const specificMedicalServices = useSelector(selectSpecificMedicalServices);
  const livingHealthyBlogPosts = useSelector(selectLivingHealthyBlogPosts);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const isError = useSelector((state) => state.admin.isError);

  useEffect(() => {
    dispatch(getAllDataBySlug("specific-medical-services"));
    dispatch(getAllDataBySlug("living-healthy-blog-post"));
  }, []);
  return (
    <div>
      <>
        <section className="page-banner">
          <ImageBanner
            image={BannerImg}
            title={"Dịch vụ chăm sóc sức khỏe tại nhà"}
          />
        </section>
        <section className="test-at-home-section">
          <TestAtHome />
        </section>
        <section className="family-practitioner-section">
          <FamilyPractitioner />
        </section>
        <section className="online-diagnostic-section">
          <OnlineDiagnostic data={specificMedicalServices} />
        </section>
        <section className="question-and-answer-section">
          <QuestionAndAnswer />
        </section>
        <section className="living-healthy">
          <LivingHealthy data={livingHealthyBlogPosts} />
        </section>
      </>
    </div>
  );
}

export default ServiceAtHomePage;
