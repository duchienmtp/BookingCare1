import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DashboardPage() {
  const { slug1, slug2, slug3 } = useParams();

  return (
    <div className="admin-dashboard-page">
      <h1>
        Dashboard from {slug1} {slug2}
      </h1>
    </div>
  );
}

export default DashboardPage;
