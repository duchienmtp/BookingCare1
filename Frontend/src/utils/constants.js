export const path = {
  HOME: "/",
  HOME_SERVICE: "/dich-vu/tai-nha",
  CLINIC_SERVICE: "/dich-vu/tai-vien",
  HEALTHY_SERVICE: "/dich-vu/song-khoe",
  MEDICAL_SERVICE: {
    BASE: "/dich-vu-y-te/:slug",
    GENERAL_HEALTH_CHECK: "/dich-vu-y-te/kham-tong-quat/:slug/:slug2?",
    MEDICAL_ONLINE_DIAGNOSTIC: "/dich-vu-y-te/kham-tu-xa/:slug/:slug2?",
    MEDICAL_SPECIALTY_HEALTH_CHECK_PACKAGE_DETAIL_PAGE:
      "/dich-vu-y-te/kham-chuyen-khoa/:slug",
    MEDICAL_OPERATION_PACKAGE_DETAIL_PAGE: "/dich-vu-y-te/goi-phau-thuat/:slug",
    MEDICAL_GENERAL_HEALTH_CHECK_PACKAGE_DETAIL_PAGE:
      "/dich-vu-y-te/kham-tong-quat/:slug",
    MEDICAL_EXAMINATION: "/dich-vu-y-te/xet-nghiem-y-hoc/:slug",
    BOOKING_CHECKOUT_PAGE: "/dat-lich-kham/:packageScheduleId",
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

export const appMainDataSlug = [
  "medical-services",
  "specialties",
  "clinics",
  "specific-medical-services",
  "blogs",
  "packages",
  "orders",
  "patients",
  "doctors",
];
