import React from "react";

export default function Loader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      <p className="mt-4 text-blue-600 font-semibold">{message}</p>
    </div>
  );
}
