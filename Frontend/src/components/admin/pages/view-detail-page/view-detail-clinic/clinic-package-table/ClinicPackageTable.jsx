import React from "react";
import "./ClinicPackageTable.scss";

const ClinicPackageTable = ({ data, currentPage, onPageChange }) => {
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="clinic-packages">
      <table>
        <thead>
          <tr>
            <th>Package ID</th>
            <th>Package Name</th>
            <th>Rank</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.length > 0 ? (
            paginatedData.map((pkg) => (
              <tr
                key={pkg.id}
                className={`${pkg.isDeleted ? "deleted" : ""} ${getRowClass(
                  pkg.rank
                )}`}
              >
                <td>{pkg.id}</td>
                <td>{pkg.name}</td>
                <td>
                  {pkg.rank && (
                    <span className={`rank-badge ${getRankClass(pkg.rank)}`}>
                      {pkg.rank}
                    </span>
                  )}
                </td>
                <td>
                  <span
                    className={`status ${pkg.isDeleted ? "deleted" : "active"}`}
                  >
                    {pkg.isDeleted ? "Inactive" : "Active"}
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

// Helper function to get rank class
const getRankClass = (rank) => {
  switch (rank) {
    case 1:
      return "gold";
    case 2:
      return "silver";
    case 3:
      return "bronze";
    default:
      return "";
  }
};

// Helper function to get row class based on rank
const getRowClass = (rank) => {
  switch (rank) {
    case 1:
      return "gold-row";
    case 2:
      return "silver-row";
    case 3:
      return "bronze-row";
    default:
      return "";
  }
};

export default ClinicPackageTable;
