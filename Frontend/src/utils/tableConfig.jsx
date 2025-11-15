export const tableConfigs = {
  doctors: {
    columns: [
      { key: "id", header: "ID" },
      { key: "name", header: "Tên bác sĩ" },
      { key: "gender", header: "Giới tính" },
      { key: "dob", header: "Ngày sinh" },
      { key: "phoneNumber", header: "Liên hệ" },
      {
        key: "status",
        header: "Trạng thái",
        headerClassName: "status-cell-header",
        className: "status-cell",
        render: (value) => {
          const statusMap = {
            active: { label: "Đang hoạt động", className: "status-green" },
            inactive: { label: "Đã nghỉ việc", className: "status-red" },
          };
          const status = statusMap[value] || { label: value, className: "" };
          return <span className={status.className}>{status.label}</span>;
        },
      },
      {
        key: "createdAt",
        header: "Ngày tạo",
      },
      {
        key: "updatedAt",
        header: "Ngày cập nhật",
      },
    ],
    basePath: "/admin/users/doctors",
  },
  orders: {
    columns: [
      { key: "id", header: "ID" },
      { key: "patientName", header: "Tên bệnh nhân" },
      { key: "packageName", header: "Tên gói khám" },
      { key: "clinicName", header: "Khám tại" },
      {
        key: "status",
        header: "Trạng thái",
        headerClassName: "status-cell-header",
        className: "status-cell",
        render: (value) => {
          const statusMap = {
            pending: { label: "Chờ xác nhận", className: "status-yellow" },
            confirmed: { label: "Đã xác nhận", className: "status-blue" },
            completed: { label: "Hoàn thành", className: "status-green" },
            cancelled: { label: "Đã hủy", className: "status-red" },
            no_show: { label: "Không đến", className: "status-gray" }, // New status
          };
          const status = statusMap[value] || { label: value, className: "" };
          return (
            <span className={`${status.className} col-using-render`}>
              {status.label}
            </span>
          );
        },
      },
      {
        key: "createdAt",
        header: "Ngày tạo",
      },
      {
        key: "updatedAt",
        header: "Ngày cập nhật",
      },
    ],
    basePath: "/admin/eCommerce/orders",
  },
  "medical-services": {
    columns: [
      { key: "id", header: "ID" },
      { key: "name", header: "Tên dịch vụ" },
      {
        key: "status",
        header: "Trạng thái",
        headerClassName: "status-cell-header",
        className: "status-cell",
        render: (value) => {
          const statusMap = {
            active: { label: "Đang hoạt động", className: "status-green" },
            inactive: { label: "Đã dừng hoạt động", className: "status-red" },
          };
          const status = statusMap[value] || { label: value, className: "" };
          return <span className={status.className}>{status.label}</span>;
        },
      },
      {
        key: "createdAt",
        header: "Ngày tạo",
      },
      {
        key: "updatedAt",
        header: "Ngày cập nhật",
      },
    ],
    basePath: "/admin/eCommerce/medical-services",
  },
  patients: {
    columns: [
      { key: "id", header: "ID" },
      { key: "name", header: "Tên bệnh nhân" },
      { key: "gender", header: "Giới tính" },
      { key: "dob", header: "Ngày sinh" },
      { key: "phoneNumber", header: "Liên hệ" },
      {
        key: "status",
        header: "Trạng thái",
        headerClassName: "status-cell-header",
        className: "status-cell",
        render: (value) => {
          const statusMap = {
            active: { label: "Đang hoạt động", className: "status-green" },
            inactive: { label: "Đã nghỉ việc", className: "status-red" },
          };
          const status = statusMap[value] || { label: value, className: "" };
          return <span className={status.className}>{status.label}</span>;
        },
      },
      {
        key: "createdAt",
        header: "Ngày tạo",
      },
      {
        key: "updatedAt",
        header: "Ngày cập nhật",
      },
    ],
    basePath: "/admin/users/patients",
  },
  specialties: {
    columns: [
      { key: "id", header: "ID" },
      { key: "name", header: "Tên dịch vụ" },
      {
        key: "status",
        header: "Trạng thái",
        headerClassName: "status-cell-header",
        className: "status-cell",
        render: (value) => {
          const statusMap = {
            active: { label: "Đang hoạt động", className: "status-green" },
            inactive: { label: "Đã nghỉ việc", className: "status-red" },
          };
          const status = statusMap[value] || { label: value, className: "" };
          return <span className={status.className}>{status.label}</span>;
        },
      },
      {
        key: "createdAt",
        header: "Ngày tạo",
      },
      {
        key: "updatedAt",
        header: "Ngày cập nhật",
      },
    ],
    basePath: "/admin/eCommerce/specialties",
  },
  "specific-medical-services": {
    columns: [
      { key: "id", header: "ID" },
      { key: "name", header: "Tên dịch vụ" },
      {
        key: "status",
        header: "Trạng thái",
        headerClassName: "status-cell-header",
        className: "status-cell",
        render: (value) => {
          const statusMap = {
            active: { label: "Đang hoạt động", className: "status-green" },
            inactive: { label: "Đã nghỉ việc", className: "status-red" },
          };
          const status = statusMap[value] || { label: value, className: "" };
          return <span className={status.className}>{status.label}</span>;
        },
      },
      {
        key: "createdAt",
        header: "Ngày tạo",
      },
      {
        key: "updatedAt",
        header: "Ngày cập nhật",
      },
    ],
    basePath: "/admin/eCommerce/specific-medical-services",
  },
  packages: {
    columns: [
      { key: "id", header: "ID" },
      { key: "name", header: "Tên gói khám" },
      { key: "packageType", header: "Loại gói khám" },
      {
        key: "status",
        header: "Trạng thái",
        headerClassName: "status-cell-header",
        className: "status-cell",
        render: (value) => {
          const statusMap = {
            active: { label: "Đang kinh doanh", className: "status-green" },
            inactive: { label: "Đã khóa", className: "status-red" },
          };
          const status = statusMap[value] || { label: value, className: "" };
          return <span className={status.className}>{status.label}</span>;
        },
      },
      {
        key: "createdAt",
        header: "Ngày tạo",
      },
      {
        key: "updatedAt",
        header: "Ngày cập nhật",
      },
    ],
    basePath: "/admin/eCommerce/packages",
    filters: [
      {
        id: "packageType",
        label: "Loại gói khám",
        options: [
          { value: "", label: "Tất cả" },
          { value: "3", label: "Gói khám" },
          { value: "4", label: "Nội soi" },
          { value: "5", label: "Phẫu thuật" },
          { value: "6", label: "Xét nghiệm" },
          { value: "7", label: "VideoCare" },
          { value: "8", label: "Chụp chiếu" },
          { value: "9", label: "Xét nghiệm tại nhà" },
          { value: "10", label: "Tổng quát" },
          { value: "11", label: "Khác" },
        ],
      },
      {
        id: "status",
        label: "Trạng thái",
        options: [
          { value: "", label: "Tất cả" },
          { value: "active", label: "Đang hoạt động" },
          { value: "inactive", label: "Đã ẩn" },
        ],
      },
    ],
  },
  clinics: {
    columns: [
      { key: "id", header: "ID" },
      { key: "name", header: "Tên phòng khám" },
      {
        key: "status",
        header: "Trạng thái",
        headerClassName: "status-cell-header",
        className: "status-cell",
        render: (value) => {
          const statusMap = {
            active: { label: "Đang hoạt động", className: "status-green" },
            inactive: { label: "Đã nghỉ việc", className: "status-red" },
          };
          const status = statusMap[value] || { label: value, className: "" };
          return <span className={status.className}>{status.label}</span>;
        },
      },
      {
        key: "createdAt",
        header: "Ngày tạo",
      },
      {
        key: "updatedAt",
        header: "Ngày cập nhật",
      },
    ],
    basePath: "/admin/clinics",
    filters: [
      {
        id: "status",
        label: "Trạng thái",
        options: [
          { value: "", label: "Tất cả" },
          { value: "active", label: "Đang hoạt động" },
          { value: "inactive", label: "Đã ẩn" },
        ],
      },
    ],
  },
  blogs: {
    columns: [
      { key: "id", header: "ID" },
      { key: "name", header: "Tên bài viết" },
      { key: "uploadedTo", header: "Đăng tại" },
      { key: "specialty", header: "Chuyên khoa" },
      {
        key: "status",
        header: "Trạng thái",
        headerClassName: "status-cell-header",
        className: "status-cell",
        render: (value) => {
          const statusMap = {
            active: { label: "Đang hoạt động", className: "status-green" },
            inactive: { label: "Đã nghỉ việc", className: "status-red" },
          };
          const status = statusMap[value] || { label: value, className: "" };
          return <span className={status.className}>{status.label}</span>;
        },
      },
      {
        key: "createdAt",
        header: "Ngày tạo",
      },
      {
        key: "updatedAt",
        header: "Ngày cập nhật",
      },
    ],
    basePath: "/admin/blogs",
    filters: [
      {
        id: "uploadedTo",
        label: "Loại gói khám",
        options: [
          { value: "", label: "Tất cả" },
          { value: "1", label: "Gói khám" },
          { value: "2", label: "Nội soi" },
          { value: "3", label: "Phẫu thuật" },
        ],
      },
      {
        id: "status",
        label: "Trạng thái",
        options: [
          { value: "", label: "Tất cả" },
          { value: "active", label: "Đang hoạt động" },
          { value: "inactive", label: "Đã ẩn" },
        ],
      },
    ],
  },
  // Add more table configs as needed
};
