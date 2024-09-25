import React from "react";
import Navbar from "../components/Navbar";
import Heart from "../components/Heart";

export default function HeartPage() {
  return (
    <div className="flex px-20">
      <div className="w-2/12">
        <Navbar />
      </div>
      <div className="w-10/12">
        <Heart />
      </div>
    </div>
  );
}
