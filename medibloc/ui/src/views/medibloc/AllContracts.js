import React from "react";
import ContractListView from "./ContractListView";

export default function AllContracts(props) {
  return (
    <div>
      <ContractListView
        type={props.type}
        status="all"
        title="All Prescription List"
      />
    </div>
  );
}
