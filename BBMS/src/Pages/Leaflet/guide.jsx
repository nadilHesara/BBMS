import React from "react";

export default function BloodDonationGuide() {
  return (
    <div className=" mx-auto mt-10 p-5 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">
        Blood Donation Guide
      </h1>

      {/* PDF Viewer */}
      <iframe
        src="/eligibility-guide-v12.pdf"
        title="Blood Donation Guide"
        width="100%"
        height="800px"
        className="rounded-lg shadow-lg"
      />

       </div>
  );
}
