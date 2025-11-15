import React from "react";
import "./ClinicDoctorTable.scss";

const ClinicDoctorTable = ({ data, currentPage, onPageChange }) => {
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="clinic-doctors">
      <table>
        <thead>
          <tr>
            <th>Doctor ID</th>
            <th>Doctor Name</th>
            <th>Specialty</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.length > 0 ? (
            paginatedData.map((doctor) => (
              <tr key={doctor.id} className={doctor.isDeleted ? "deleted" : ""}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.specialty}</td>
                <td>
                  <span
                    className={`status ${
                      doctor.isDeleted ? "deleted" : "active"
                    }`}
                  >
                    {doctor.isDeleted ? "Inactive" : "Active"}
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

export default ClinicDoctorTable;
