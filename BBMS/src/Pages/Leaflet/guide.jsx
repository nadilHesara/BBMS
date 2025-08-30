import { auto } from "@popperjs/core";
import React from "react";

export default function BloodDonationGuide() {
  return (
    <div className=" mx-auto mt-10 p-5 bg-white rounded-xl shadow-md">
      {/* PDF Viewer */}
      <iframe
        src="/InformationLeaflet.html"
        title="Blood Donation Guide"
        width="100%"
        height="800px"
        className="rounded-lg shadow-lg"
      />

       </div>
  );
}
