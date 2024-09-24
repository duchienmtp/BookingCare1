export const path = {
  HOME: "/",
  HOME_SERVICE: "/dich-vu/tai-nha",
  CLINIC_SERVICE: "/dich-vu/tai-vien",
  HEALTHY_SERVICE: "/dich-vu/song-khoe",
  MEDICAL_SERVICE: {
    BASE: "/dich-vu-y-te/:slug",
    GENERAL_HEALTH_CHECK: "/dich-vu-y-te/kham-tong-quat/:slug/:slug2?",
    MEDICAL_SPECIALTY_HEALTH_CHECK: "/dich-vu-y-te/kham-chuyen-khoa/:slug",
  },
};

export const adminPath = {
  ADMIN: "/admin",
  DASHBOARD: "/admin/dashboard",
  E_COMMERCE: "/admin/eCommerce/:slug?",
  USER: "/admin/user/:slug?",
};

export const objectSlugs = {
  "medical-service": "medicalService",
  "specialty": "specialty",
  "clinic": "clinic",
}