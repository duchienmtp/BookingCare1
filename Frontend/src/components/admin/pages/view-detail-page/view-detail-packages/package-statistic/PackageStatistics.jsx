import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faDollarSign,
  faCalendarCheck,
  faStar,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import "./PackageStatistics.scss";

const PackageStatistics = ({ packageData }) => {
  const {
    totalBookings,
    revenueGenerated,
    lastBookingDate,
    bookingPackages,
    bookingsPerPackage,
    revenuePerPackage,
  } = packageData;

  // Find the most booked package
  const mostBookedPackage = bookingPackages.reduce((prev, current) =>
    bookingsPerPackage[prev] > bookingsPerPackage[current] ? prev : current
  );

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: faShoppingCart,
      color: "#4CAF50",
      bgColor: "#E8F5E9",
    },
    {
      title: "Revenue Generated",
      value: `$${revenueGenerated.toLocaleString()}`,
      icon: faDollarSign,
      color: "#2196F3",
      bgColor: "#E3F2FD",
    },
    {
      title: "Last Booking Date",
      value: lastBookingDate,
      icon: faCalendarCheck,
      color: "#9C27B0",
      bgColor: "#F3E5F5",
    },
    {
      title: "Most Booked Package",
      value: mostBookedPackage,
      icon: faStar,
      color: "#FF9800",
      bgColor: "#FFF3E0",
    },
  ];

  return (
    <div className="package-statistics">
      <h2>Package Statistics</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-card"
            style={{ backgroundColor: stat.bgColor }}
          >
            <div className="stat-icon" style={{ color: stat.color }}>
              <FontAwesomeIcon icon={stat.icon} size="2x" />
            </div>
            <div className="stat-content">
              <div className="stat-value" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="stat-title">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Statistics: Bookings and Revenue per Package */}
      <div className="additional-stats">
        <h3>Bookings and Revenue per Package</h3>
        <div className="stats-grid">
          {bookingPackages.map((packageName, index) => (
            <div
              key={index}
              className="stat-card"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <div className="stat-icon" style={{ color: "#607D8B" }}>
                <FontAwesomeIcon icon={faChartBar} size="2x" />
              </div>
              <div className="stat-content">
                <div className="stat-value" style={{ color: "#607D8B" }}>
                  {bookingsPerPackage[packageName]} Bookings
                </div>
                <div className="stat-title">{packageName}</div>
                <div className="stat-subtitle">
                  Revenue: ${revenuePerPackage[packageName].toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageStatistics;
