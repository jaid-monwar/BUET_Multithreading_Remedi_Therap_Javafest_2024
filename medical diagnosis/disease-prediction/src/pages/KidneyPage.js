import React from "react";
import Kidney from "../components/Kidney";
import Navbar from "../components/Navbar";

export default function KidneyPage() {
  return (
    <div className="flex px-20">
      <div className="w-2/12">
        <Navbar />
      </div>
      <div className="w-10/12">
        <Kidney />
      </div>
    </div>
  );
}
