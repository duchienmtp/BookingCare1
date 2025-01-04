export const path = {
  HOME: "/",
  HOME_SERVICE: "/dich-vu/tai-nha",
  CLINIC_SERVICE: "/dich-vu/tai-vien",
  HEALTHY_SERVICE: "/dich-vu/song-khoe",
  MEDICAL_SERVICE: {
    BASE: "/dich-vu-y-te/:slug",
    GENERAL_HEALTH_CHECK: "/dich-vu-y-te/kham-tong-quat/:slug/:slug2?",
    MEDICAL_ONLINE_DIAGNOSTIC: "/dich-vu-y-te/kham-tu-xa/:slug/:slug2?",
    MEDICAL_SPECIALTY_HEALTH_CHECK: "/dich-vu-y-te/kham-chuyen-khoa/:slug",
  },
  HEALTH_FACILITY: {
    BASE: "/co-so-y-te/:slug",
  },
  SEE_MORE_PAGE: {
    ALL_CLINICS: "/danh-sach/co-so-y-te/tat-ca",
  },
};

export const adminPath = {
  ADMIN: "/admin",
  DASHBOARD: "/admin/dashboard",
  E_COMMERCE: "/admin/eCommerce/:slug?",
  USER: "/admin/user/:slug?",
};

export const adminPageTableHeader = {
  "medical-services": ["ID", "Tên dịch vụ", "Ngày tạo", "Ngày cập nhật"],
  specialties: ["ID", "Tên chuyên khoa", "Ngày tạo", "Ngày cập nhật"],
  clinics: ["ID", "Tên phòng khám", "Ngày tạo", "Ngày cập nhật"],
  "specific-medical-services": [
    "ID",
    "Tên dịch vụ",
    "Chuyên khoa",
    "Ngày tạo",
    "Ngày cập nhật",
  ],
  blogs: [
    "ID",
    "Tên bài viết",
    "Đăng tại",
    "Chuyên khoa",
    "Ngày tạo",
    "Ngày cập nhật",
  ],
  packages: [
    "ID",
    "Tên gói khám",
    "Chuyên khoa",
    "Loại gói khám",
    "Ngày tạo",
    "Ngày cập nhật",
  ],
};
