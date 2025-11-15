import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./DoctorPackageTable.scss";

const PackageTable = ({ packages }) => {
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
    <div className="package-table">
      <h3>Medical Health Check Packages</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Doctor ID</th>
              <th>Package Name</th>
              <th>Package Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((pkg, index) => (
              <tr key={index}>
                <td>{pkg.packageId}</td>
                <td>{pkg.packageName}</td>
                <td>{pkg.packageTypeName}</td>
                <td>
                  <span
                    className={`status ${
                      pkg.isDeleted ? "inactive" : "active"
                    }`}
                  >
                    {pkg.isDeleted ? "Inactive" : "Active"}
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

export default PackageTable;
