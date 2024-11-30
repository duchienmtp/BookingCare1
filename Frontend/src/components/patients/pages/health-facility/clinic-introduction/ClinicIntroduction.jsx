import React from "react";
import { useParams } from "react-router-dom";
import "./ClinicIntroduction.scss";
import { useDispatch } from "react-redux";

const ClinicIntroduction = () => {
  const dispatch = useDispatch();
  const param = useParams();

  return (
    <div className="clinic-introduction">
      <div className="page-header">
        <div className="page-banner">
          <img src="/src/assets/images/114348-bv-viet-duc.jpg" alt="" />
        </div>
        <div className="clinic-introduction-container">
          <div className="banner">
            <div className="upper">
              <div className="img-container">
                <img
                  src="/src/assets/images/clinic-images/benh-vien-an-viet.jpg"
                  alt=""
                />
              </div>
              <div className="clinic-basic-info">
                <div className="clinic-name">
                  <h1>Bệnh viện hữu nghị Việt Đức</h1>
                </div>
                <div className="clinic-address">
                  <span>Địa chỉ: 40 Tràng Thi, Hoàn Kiếm, Hà Nội</span>
                </div>
              </div>
            </div>
            <div className="lower">
              <div className="menu-item">
                <span>giới thiệu</span>
              </div>
              <div className="menu-item">
                <span>thế mạnh chuyên môn</span>
              </div>
              <div className="menu-item">
                <span>trang thiết bị</span>
              </div>
              <div className="menu-item">
                <span>vị trí</span>
              </div>
              <div className="menu-item">
                <span>quy trình khám</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="clinic-introduction-container">
        <div className="notice-section">
          <div className="first-notice">
            <p>
              BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu
              Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng khám uy
              tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản
              phẩm y tế chất lượng cao.
            </p>
          </div>
          <div className="second-notice">
            <div>
              <p>
                Từ nay, người bệnh có thể đặt lịch tại Khu khám bệnh theo yêu
                cầu, Bệnh viện Hữu nghị Việt Đức thông qua hệ thống đặt khám
                BookingCare.
              </p>
              <ul>
                <li>
                  Được lựa chọn các giáo sư, tiến sĩ, bác sĩ chuyên khoa giàu
                  kinh nghiệm
                </li>
                <li>
                  Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt
                  lịch)
                </li>
                <li>
                  Giảm thời gian chờ đợi khi làm thủ tục khám và ưu tiên khám
                  trước
                </li>
                <li>Nhận được hướng dẫn chi tiết sau khi đặt lịch</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="clinic-detail-info-section">
          <div className="clinic-detail-info-section-item">
            <div className="blank-div"></div>
            <h2>giới thiệu</h2>
            <div>
              <p>
                <strong>Địa chỉ:&nbsp;&nbsp;</strong>
                Bệnh viện có nhiều cổng, bệnh nhân đến khám sẽ đến cổng:
                <strong>&nbsp;</strong>
              </p>
              <ul style={{ textAlign: "justify" }}>
                <li style={{ textAlign: "left" }}>
                  Số 16 - 18 Phủ Doãn, Hoàn Kiếm, Hà Nội
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <strong>Thời gian làm việc:&nbsp;</strong>Thứ 2 đến thứ 7
              </p>
              <ul style={{ textAlign: "justify" }}>
                <li style={{ textAlign: "justify" }}>Sáng: 7h00 - 12h00</li>
                <li>Chiều: 13h30 - 16h30</li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                Bệnh viện Việt Đức là một trong 5 bệnh viện tuyến Trung ương,
                hạng đặc biệt của Việt Nam. Bệnh viện có lịch sử trên 100 năm,
                bề dày truyền thống danh tiếng, là cái nôi của ngành ngoại khoa
                Việt Nam gắn liền với những thành tựu Y học quan trọng của đất
                nước.&nbsp;
              </p>
              <p style={{ textAlign: "justify" }}>
                Việt Đức là địa chỉ uy tín hàng đầu về ngoại khoa, tiến hành
                khám bệnh, chữa bệnh và thực hiện các kỹ thuật chụp chiếu, xét
                nghiệm, thăm dò chức năng cơ bản và chuyên sâu hàng ngày cho
                người dân.&nbsp;
              </p>
              <p style={{ textAlign: "justify" }}>
                Bệnh viện có đội ngũ y bác sĩ hùng hậu, nhiều người kiêm là cán
                bộ giảng dạy tại Đại học Y khoa Hà Nội hoặc Khoa Y Dược - Đại
                học Quốc gia Hà Nội. Trong số họ nhiều người là chuyên gia đầu
                ngành và bác sĩ giàu kinh nghiệm ở các chuyên khoa khác
                nhau.&nbsp;
              </p>
              <p style={{ textAlign: "justify" }}>
                <strong>Lưu ý quan trọng</strong>
              </p>
              <ul style={{ textAlign: "justify" }}>
                <li style={{ textAlign: "justify" }}>
                  Bệnh viện có nhiều khu khám bệnh, hiện tại BookingCare đang hỗ
                  trợ đăng ký khám tại tòa nhà C4 - Khoa khám bệnh theo yêu cầu.
                  Người bệnh đến khám đúng tòa nhà C4 để được hỗ trợ.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Bệnh viện chuyên về Ngoại khoa nên lịch của các bác sĩ thường
                  linh động và ưu tiên khám cho các ca cấp cứu.
                </li>
                <li style={{ textAlign: "justify" }}>
                  Mỗi bệnh nhân trong ngày chỉ được đặt trước 1 chuyên khoa, nếu
                  đăng kí 2 chuyên khoa trở lên sẽ trao đổi bác sĩ thăm khám ban
                  đầu chuyển khám thêm khoa khác.
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <strong>Chi phí khám</strong>
              </p>
              <p style={{ textAlign: "justify" }}>
                Người bệnh có thể lựa chọn một trong các gói khám sau:
              </p>
              <ol>
                <li style={{ textAlign: "justify" }}>
                  Gói 1:
                  <ul style={{ listStyleType: "disc" }}>
                    <li>
                      Khám Giáo sư, Phó Giáo sư, Tiến sĩ, Bác sĩ Chuyên khoa II
                      - Chi phí 500.000 đồng/lần khám
                    </li>
                    <li>
                      Khám với bác sĩ Trưởng khoa hoặc Phó khoa - Chi phí
                      500.000 đồng/lần khám
                    </li>
                  </ul>
                </li>
                <li>
                  Gói 2:
                  <ul style={{ listStyleType: "disc" }}>
                    <li style={{ textAlign: "justify" }}>
                      Khám Thạc sĩ, Bác sĩ Chuyên khoa I - Chi phí: 300.000
                      đồng/lần khám
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
          <div className="clinic-detail-info-section-item">
            <div className="blank-div"></div>
            <h2>thế mạnh chuyên môn</h2>
            <div>
              <p style={{ textAlign: "justify" }}>
                Bệnh viện Việt Đức là bệnh viện chuyên khoa Ngoại (phẫu thuật),
                có thế mạnh về khám, điều trị và Phẫu thuật nhiều chuyên khoa.
                Một số thế mạnh của Bệnh viện Việt Đức là:
              </p>
              <ul>
                <li style={{ textAlign: "justify" }}>
                  <strong>
                    Khám, điều trị, phẫu thuật về Thần kinh (Thần kinh I, Thần
                    kinh II):
                  </strong>
                  &nbsp;Chấn thương; Bệnh lý sọ não; Tuỷ sống; Dây thần kinh
                  ngoại vi; Ứng dụng nội soi trong phẫu thuật thần kinh; Phẫu
                  thuật thần kinh chức năng; Phẫu thuật u nền sọ;...
                </li>
                <li style={{ textAlign: "justify" }}>
                  <strong>Khám, điều trị, phẫu thuật về Cơ xương khớp:</strong>
                  <ul>
                    <li>
                      <strong>
                        Khám,&nbsp;điều trị, phẫu thuật về Chi trên và Y học thể
                        thao:&nbsp;
                      </strong>
                      Khám các bệnh lý do chấn thương thể thao; Bệnh lý đứt dây
                      chằng gối do chơi thể thao; Chấn thương chỉnh hình xương
                      khớp; Phẫu thuật bàn tay; Bệnh lý cơ xương khớp về tay;...
                    </li>
                    <li>
                      <strong>
                        Khám,&nbsp;điều trị, phẫu thuật về Chi dưới:&nbsp;
                      </strong>
                      Điều trị thoái hóa khớp gối, khớp háng; Bệnh lý đứt dây
                      chằng gối; Phẫu thuật khớp gối, khớp háng, khớp cổ chân;
                      Bệnh lý về chân;...
                    </li>
                    <li>
                      <strong>
                        Khám, điều trị, phẫu thuật về Xương và điều trị ngoại
                        trú:
                      </strong>
                      Nắn chỉnh về xương, tai nạn bị gãy tay gãy chân, tháo bột,
                      kiểm tra lại sau khi nắn chỉnh về xương.
                    </li>
                    <li>
                      <strong>
                        Khám, điều trị, phẫu thuật về chấn thương chung:
                      </strong>
                      tháo đinh, kiếm tra lại sau mổ,...
                    </li>
                  </ul>
                </li>
                <li style={{ textAlign: "justify" }}>
                  <strong>Khám, điều trị, phẫu thuật về Cột sống:</strong>
                  &nbsp;Bệnh lý cột sống; Đau vai gáy; Thoái hoá và thoát vị đĩa
                  đệm; Chấn thương chỉnh hình cột sống; Trượt đốt sống; Vẹo cột
                  sống; Bơm xi-măng vào thân đốt sống;...
                </li>
                <li style={{ textAlign: "justify" }}>
                  <strong>
                    Khám, điều trị, phẫu thuật về Tim mạch và lồng ngực:
                  </strong>
                  &nbsp;Khám và điều trị bệnh lý tim bẩm sinh trẻ em; Khám và
                  điều trị các bệnh lý nội, ngoại khoa về tim mạch; Điều trị các
                  bệnh lý phức tạp về động - tĩnh mạch bằng các phương pháp tiên
                  tiến; Các bệnh lý về xương sườn;...
                </li>
                <li style={{ textAlign: "justify" }}>
                  <strong>
                    Khám, điều trị, phẫu thuật về Tạo hình-Hàm mặt-Thẩm mỹ:
                  </strong>
                  &nbsp;Bệnh lý và chấn thương vùng hàm mặt; Phục hồi tái tạo
                  các cơ quan sau điều trị ung thư; Sửa chữa các dị tật sọ mặt;
                  Nối vành tai đứt rời, mũi đứt rời ; Phẫu thuật thẩm mĩ mi mắt,
                  mũi, tạo hình ngực, bụng….
                </li>
                <li style={{ textAlign: "justify" }}>
                  <strong>Khám, điều trị, phẫu thuật về Tiêu hóa: </strong>Cắt
                  bỏ và tạo hình thực quản; Cắt khối tá tuỵ; Cắt toàn bộ dạ dày,
                  cắt đại tràng các loại.
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <strong>
                  Ngoài ra, bệnh viện khám, điều trị, phâu thuật các chuyên khoa
                  khác như:
                </strong>
              </p>
              <ul>
                <li style={{ textAlign: "justify" }}>Bệnh lý thần kinh</li>
                <li style={{ textAlign: "justify" }}>
                  Nội - Hồi sức thần kinh
                </li>
                <li style={{ textAlign: "justify" }}>
                  Bệnh tim mạch và lồng ngực
                </li>
                <li style={{ textAlign: "justify" }}>
                  Phẫu thuật tim mạch - lồng ngực
                </li>
                <li style={{ textAlign: "justify" }}>
                  Ngoại nhi và trẻ sơ sinh
                </li>
                <li style={{ textAlign: "justify" }}>Bệnh lý tiêu hóa</li>
                <li style={{ textAlign: "justify" }}>Phẫu thuật tiêu hóa</li>
                <li style={{ textAlign: "justify" }}>
                  Bệnh cột sống/thoát vị đĩa đệm
                </li>
                <li style={{ textAlign: "justify" }}>
                  Chi trên và y học&nbsp; thể thao
                </li>
                <li style={{ textAlign: "justify" }}>Bệnh lý chi dưới</li>
                <li style={{ textAlign: "justify" }}>
                  Khám xương và điều trị ngoại trú
                </li>
                <li style={{ textAlign: "justify" }}>
                  Phẫu thuật chấn thương chung
                </li>
                <li style={{ textAlign: "justify" }}>
                  Phẫu thuật tạo hình - hàm mặt - thẩm mỹ
                </li>
                <li style={{ textAlign: "justify" }}>Phục hồi chức năng</li>
                <li style={{ textAlign: "justify" }}>Nhiễm khuẩn</li>
                <li style={{ textAlign: "justify" }}>Phẫu thuật nhiễm khuẩn</li>
                <li style={{ textAlign: "justify" }}>Bệnh đường tiết niệu</li>
                <li style={{ textAlign: "justify" }}>Bệnh nam học/nam khoa</li>
                <li style={{ textAlign: "justify" }}>Bệnh lý gan mật</li>
                <li style={{ textAlign: "justify" }}>Ung bướu</li>
                <li style={{ textAlign: "justify" }}>Thận lọc máu</li>
                <li style={{ textAlign: "justify" }}>
                  Bệnh lý hậu môn trực tràng
                </li>
                <li style={{ textAlign: "justify" }}>Trung tâm ghép tạng</li>
                <li style={{ textAlign: "justify" }}>
                  Phòng khám Tai mũi họng
                </li>
              </ul>
            </div>
          </div>
          <div className="clinic-detail-info-section-item">
            <div className="blank-div"></div>
            <h2>TRANG THIẾT BỊ</h2>
            <div>
              <p style={{ textAlign: "justify" }}>
                Bệnh viện Việt Đức được trang bị hầu hết các trang thiêt bị hiện
                đại hàng đầu hiện nay phục vụ trong chẩn đoán và thực hiện các
                xét nghiệm cơ bản, xét nghiệm kỹ thuật cao như các xét nghiệm
                theo dõi bệnh nhân ghép tạng, các xét nghiệm chỉ điểm khối u.
              </p>
              <ul style={{ textAlign: "justify" }}>
                <li style={{ textAlign: "justify" }}>Xquang số hóa</li>
                <li>Máy siêu âm</li>
                <li>Máy chụp cắt lớp vi tính đa dãy CT Scan</li>
                <li>Máy chụp cộng hưởng từ MRI 3.0 Tesla</li>
                <li>Hệ thống chụp mạch máy chuyên dụng</li>
                <li>
                  Hệ thống PET/CT phát hiện ung thư sớm và đánh giá các bệnh lý
                  tim mạch, thần kinh
                </li>
                <li>
                  Hệ thống máy sinh hóa miễn dịch tự động, máy sinh hóa tự động,
                  máy xét nghiệm huyết học, xét nghiệm đông máu tự động…
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                Các thiết bị thăm dò chức năng hỗ trợ thăm khám và thực hiện các
                thủ thuật nội soi tiêu hóa - gan mật.
              </p>
              <ul>
                <li style={{ textAlign: "justify" }}>
                  Nội soi thực quản - dạ dày - tá tràng chẩn đoán
                </li>
                <li style={{ textAlign: "justify" }}>
                  Nội soi đại trực tràng chẩn đoán
                </li>
                <li style={{ textAlign: "justify" }}>
                  Nội soi đường mật - tụy ngược dòng ERCP
                </li>
                <li style={{ textAlign: "justify" }}>
                  Siêu âm nội soi chẩn đoán bệnh lý thuộc cơ quan tiêu hóa, chọc
                  hút tế bào
                </li>
                <li style={{ textAlign: "justify" }}>
                  Nội soi can thiệp, nong hẹp đường tiêu hóa
                </li>
                <li style={{ textAlign: "justify" }}>
                  Nội soi đặt stent khí quản, đặt sonde tá tràng
                </li>
                <li style={{ textAlign: "justify" }}>
                  Nội soi can thiệp đại tràng.
                </li>
              </ul>
            </div>
          </div>
          <div className="clinic-detail-info-section-item">
            <div className="blank-div"></div>
            <h2>VỊ TRÍ</h2>
            <div>
              <p style={{ textAlign: "justify" }}>
                Các trang web khác ghi địa chỉ Bệnh viện Việt Đức ở 40 Tràng
                Thi, đây là cổng chính nhưng thông thường chỉ dành cho những
                công việc giấy tờ, hành chính. Bệnh nhân đến khám sẽ đi các cổng
                phụ trên đường Phủ Doãn.&nbsp;
              </p>
              <p style={{ textAlign: "justify" }}>
                Trên đường Phủ Doãn có 3 cổng và đường Tràng Thi có 1 cổng
                chính. Người bệnh nên đi đúng cổng như chỉ dẫn để đi đến phòng
                khám dễ dàng, nhanh chóng nhất.
              </p>
              <p>
                <img
                  src="/src/assets/images/133335so-do-benh-vien-viet-duc.jpg"
                  alt=""
                />
              </p>
            </div>
          </div>
          <div className="clinic-detail-info-section-item">
            <div className="blank-div"></div>
            <h2>QUY TRÌNH KHÁM</h2>
            <div>
              <p>
                Quy trình khám dành cho người bệnh đặt khám thông qua
                BookingCare
              </p>
              <p>
                <img
                  src="/src/assets/images/164343-huong-dan-kham-c4.png"
                  alt=""
                />
              </p>
              <p style={{ textAlign: "justify" }}>
                Dưới đây là <strong>Hướng dẫn làm thủ tục ưu tiên</strong>
                &nbsp;cho người bệnh đặt khám qua BookingCare tại Bệnh viện Hữu
                nghị Việt Đức.
              </p>

              <p>
                <strong>1.</strong> Bạn đến cổng&nbsp;số
                <strong>16-18&nbsp;Phủ Doãn</strong>
              </p>
              <p>Về nơi gửi xe:</p>
              <ul style={{ listStyleType: "disc" }}>
                <li style={{ textAlign: "justify" }}>
                  Xe máy gửi tại bãi đỗ xe trước cửa bệnh viện (có nhân viên bảo
                  vệ hướng dẫn).
                </li>
                <li style={{ textAlign: "justify" }}>
                  Xe ô tô gửi tại Cung Văn hóa Hữu nghị Việt Xô, cách bệnh viện
                  khoảng 500m.
                </li>
              </ul>
              <p>
                <img
                  src="/src/assets/images/114926cong--so--1-benh-vien-viet-duc.jpg"
                  alt=""
                />
              </p>
              <p>
                2. Bạn đến <strong>Tòa nhà C4</strong>:&nbsp;Tòa nhà thứ 2 bên
                tay trái từ cổng vào số 16-18 Phủ Doãn.
              </p>
              <p>
                <img
                  src="/src/assets/images/160715-c4-bv-viet-duc.jpg"
                  alt=""
                />
              </p>
              <p style={{ textAlign: "justify" }}>
                3. Vào tầng 1,
                <strong>
                  ĐẾN QUẦY CUNG CẤP THÔNG TIN BÁO ĐẶT QUA BOOKINGCARE
                </strong>
                để nhân viên hỗ trợ&nbsp;(xem thêm hình dưới).
              </p>

              <p>
                <img
                  src="/src/assets/images/160921-cung-cap-thong-tin-vd1.jpg"
                  alt=""
                />
              </p>
              <ul>
                <li>
                  Quý khách lấy số ưu tiên và chờ gọi{" "}
                  <strong>số tại quầy đăng ký số 7,9</strong> (phiếu khám đã
                  được in sẵn, người bệnh KHÔNG cần khai báo thêm).
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <strong>4.</strong>&nbsp;Bạn sẽ nhận được phiếu khám
                <strong> có dán tem ưu tiên</strong>
              </p>
              <p>
                <img
                  src="/src/assets/images/145644-kham-uu-tien-benh-vien-viet-duc.jpg"
                  alt=""
                />
              </p>
              <p style={{ textAlign: "justify" }}>
                5. Bạn vào thẳng phòng khám,&nbsp;
                <strong>
                  nộp phiếu khám, sổ khám bệnh và báo đã đặt khám qua
                  BookingCare&nbsp;
                </strong>
                cho nhân viên điều dưỡng tại phòng để được
                <strong>&nbsp;ưu tiên khám.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicIntroduction;
