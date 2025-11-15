import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./PatientUsedPackagesTable.scss";

const bookingStatusEnum = {
  pending: "Đang chờ",
  cancelled: "Đã hủy",
  confirmed: "Đã xác nhận",
  no_show: "Không đến khám",
  completed: "Đã hoàn thành",
};

const bookingStatusColor = {
  pending: "status-yellow",
  cancelled: "status-red",
  confirmed: "status-blue",
  no_show: "Không đến khám",
  completed: "status-gray",
};

const PatientUsedPackagesTable = ({ packages }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Number of items per page

  // Calculate the current items to display
  const offset = currentPage * itemsPerPage;
  const currentItems = packages.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="patient-package-table">
      <h3>Packages Used by Patient</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Package Name</th>
              <th>Package Type</th>
              <th>Date Used</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((pkg, index) => (
              <tr key={index}>
                <td>{pkg.packageName}</td>
                <td>{pkg.packageTypeName}</td>
                <td>{pkg.scheduleDate}</td>
                <td>
                  <span
                    className={`status ${
                      bookingStatusColor[pkg.bookingStatus]
                    }`}
                  >
                    {bookingStatusEnum[pkg.bookingStatus]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(packages.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default PatientUsedPackagesTable;
