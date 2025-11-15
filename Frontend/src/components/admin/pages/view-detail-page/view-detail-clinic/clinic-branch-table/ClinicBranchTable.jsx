// ClinicBranchTable.jsx
import React from "react";
import "./ClinicBranchTable.scss";

const ClinicBranchTable = ({ data, currentPage, onPageChange }) => {
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="branches-table">
      <table>
        <thead>
          <tr>
            <th>Branch ID</th>
            <th>Branch Name</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.length > 0 ? (
            paginatedData.map((branch) => (
              <tr
                key={branch.id}
                className={`${branch.isMain ? "main-branch" : ""} ${
                  branch.isDeleted ? "deleted" : ""
                }`}
              >
                <td>{branch.id}</td>
                <td>
                  {branch.name}
                  {branch.isMain && <span className="main-badge">Main</span>}
                </td>
                <td>{branch.address}</td>
                <td>
                  <span
                    className={`status ${
                      branch.isDeleted ? "deleted" : "active"
                    }`}
                  >
                    {branch.isDeleted ? "Inactive" : "Active"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                <i>No data</i>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {paginatedData?.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ClinicBranchTable;
