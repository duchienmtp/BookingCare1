import React, { useEffect, useState } from "react";
import "./MediaAboutBookingCare.scss";
import { Link } from "react-router-dom";
import VTV1Img from "../../../assets/images/media-images/vtv1.png";
import VNExpressImg from "../../../assets/images/media-images/vnexpress.png";
import VCTNewsImg from "../../../assets/images/media-images/165432-vtcnewslogosvg.png";
import InfoNetImg from "../../../assets/images/media-images/infonet.png";
import DanTriImg from "../../../assets/images/media-images/110757-dantrilogo.png";

function MediaAboutBookingCare() {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    setMedias([
      {
        id: 1,
        title: "VTV1",
        image: VTV1Img,
        link: "https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm",
      },
      {
        id: 2,
        title: "VNExpress",
        image: VNExpressImg,
        link: "https://video.vnexpress.net/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html",
      },
      {
        id: 3,
        title: "VCTNews",
        image: VCTNewsImg,
        link: "https://vtcnews.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-ar434101.html",
      },
      {
        id: 4,
        title: "Info net",
        image: InfoNetImg,
        link: "https://infonet.vietnamnet.vn/da-co-hon-20000-luot-benh-nhan-dat-lich-kham-qua-bookingcare-175080.html",
      },
      {
        id: 5,
        title: "Dân trí",
        image: DanTriImg,
        link: "https://dantri.com.vn/nhan-tai-dat-viet/san-pham-nen-tang-dat-kham-booking-care-201908201625624751.htm",
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <div className="md-px-10 medias">
        <div className="medias-header">
          <span>Truyền thông nói về BookingCare</span>
        </div>
        <div className="medias-content">
          <div className="medias-content-video">
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/FyDQljKtWnI"
                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                style={{ border: "0" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="medias-content-channels">
            {medias && medias.length > 0
              ? medias.map((item) => {
                  return (
                    <Link
                      key={item.id}
                      to={item.link}
                      target="_blank"
                      className="media-link"
                    >
                      <div className="media">
                        <div className="media-img-container">
                          <img src={item.image} alt={item.title} />
                        </div>
                      </div>
                    </Link>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaAboutBookingCare;
