import React, { useState, useEffect } from "react";
import "./SeeMorePage.scss";
import { useParams, Link } from "react-router-dom";
import { path } from "../../../../../utils/constants.js";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllDataBySlug,
  getAllSpecificMedicalServicesBySlug,
} from "../../../../../services/admin/SiteServices";
import { selectSpecialties } from "../../../../../redux/slices/adminSlice";
import _ from "lodash";

function SeeMorePage(props) {
  const { mainSlug, subSlug } = useParams();
  const dispatch = useDispatch();
  const [isAPICalledSuccessfully, setIsAPICalledSuccessfully] = useState(false);
  const [data, setData] = useState([]);
  const specialties = useSelector(selectSpecialties);

  useEffect(() => {
    const fetchData = async () => {
      if (mainSlug === "chuyen-khoa") {
        switch (subSlug) {
          case "tat-ca":
            dispatch(getAllDataBySlug("specialties"));
            setIsAPICalledSuccessfully(true);
            break;
          case "kham-tu-xa":
            {
              const response = await getAllSpecificMedicalServicesBySlug(subSlug);
              setData(response.data);
              setIsAPICalledSuccessfully(true);
            }
            break;
          default:
            setIsAPICalledSuccessfully(false);
            break;
        }
      }
    };

    fetchData();
  }, [mainSlug, subSlug]);

  useEffect(() => {
    console.log("render", data, specialties, isAPICalledSuccessfully);
    if (
      isAPICalledSuccessfully &&
      mainSlug === "chuyen-khoa" &&
      subSlug === "tat-ca"
    ) {
      setData(specialties);
    }
  }, [isAPICalledSuccessfully, specialties, mainSlug, subSlug]);

  console.log("re-render");

  return (
    <div className="app-container">
      <div className="path-section">
        <Link to={path.HOME}>
          <div className="img-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              preserveAspectRatio="none"
              viewBox="0 0 20 20"
              fill="#45c3d2"
            >
              <path d="M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8z" />
            </svg>
          </div>
          <span> /</span>
        </Link>
        <span className="slug-name">Khám Chuyên khoa</span>
      </div>
      <div className="page-title">
        <span>Khám Chuyên khoa</span>
      </div>
      <div className="see-more-page-content">
        <div className="data-list">
          {data &&
            data.length > 0 &&
            data.map((item) => {
              return (
                <div key={item.id}>
                  <Link>
                    <div className="data-item">
                      <div className="img-container">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="data-item-title">
                        <span>{item.name}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SeeMorePage;
