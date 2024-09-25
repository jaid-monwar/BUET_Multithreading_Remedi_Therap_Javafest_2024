import React from "react";
import Pneumonia from "../components/Pneumonia";
import Navbar from "../components/Navbar";

export default function PneumoniaPage() {
  return (
    <div className="flex px-20">
      <div className="w-2/12">
        <Navbar />
      </div>
      <div className="w-10/12">
        <Pneumonia />
      </div>
    </div>
  );
}
