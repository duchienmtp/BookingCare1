import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AddPage() {
  const { slug1, slug2, slug3 } = useParams();

  return (
    <div>
      <h1>
        Add Page {slug1} {slug2}
      </h1>
    </div>
  );
}

export default AddPage;
