import React from "react";
import BrainTumor from "../components/BrainTumor";
import Navbar from "../components/Navbar";

export default function BrainPage() {
  return (
    <div className="flex px-20">
      <div className="w-2/12">
        <Navbar />
      </div>
      <div className="w-10/12">
        <BrainTumor />
      </div>
    </div>
  );
}
