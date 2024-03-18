import { AppContext } from "../App";
import { useContext, useState } from "react";
import { getWarehouseDetail } from "../api/warehousesApi";
import { useQuery } from "@tanstack/react-query";
import ButtonGroup from "../components/ButtonGroup";
import { getPhysicallyMissingParts } from "../api/physicallyMissingPartsApi";
import { getSystematicallyMissingParts } from "../api/systematicallyMissingPartsApi";

interface PhysicallyMissingPart {
  physically_missing_part_id?: number;
  number: string;
  quantity: number;
  date: Date | string;
  bin_id: number;
}

interface SystematicallyMissingPart {
  systematically_missing_part_id?: number;
  number: string;
  quantity: number;
  date: Date | string;
  bin_id: number;
}

function InventoryManager() {
  const { whse } = useContext(AppContext);
  const [isGeneratingTransactions, setIsGeneratingTransactions] =
    useState(false);

  const { data: physicallyMissingParts } = useQuery({
    // Replace with physically missing parts
    queryKey: ["getPhysicallyMissingParts"],
    queryFn: () => getPhysicallyMissingParts(),
  });

  const { data: systematicallyMissingParts } = useQuery({
    // Replace with systematically missing parts
    queryKey: ["getSystematicallyMissingParts"],
    queryFn: () => getSystematicallyMissingParts(),
  });

  const {
    isLoading,
    isError,
    error,
    data: warehouse,
  } = useQuery({
    queryKey: ["getWarehouse"],
    queryFn: () => getWarehouseDetail(whse),
  });

  const handleClick = (label: string) => {
    console.log(`Button: ${label} clicked`);
    if (label == "Generate Transactions") {
      generateTransactions();
    }
  };

  const generateTransactions = () => {
    setIsGeneratingTransactions(true);
    let phyiscallyMissingPartMoveList: PhysicallyMissingPart[];
    let systematicallyMissingPartMoveList: SystematicallyMissingPart[];

    for (let i = 0; i < physicallyMissingParts.length; i++) {
      // Gets the number of occurances of the current part in the physicallyMissingPartList
      let physicallyMissingOccurances = physicallyMissingParts.filter(
        (part: PhysicallyMissingPart) =>
          part.number == physicallyMissingParts[i].number
      );
      // Gets the number of occurances of the current part in the systematicallyMissingPartList
      let systematicallyMissingOccurances = systematicallyMissingParts.filter(
        (part: SystematicallyMissingPart) =>
          part.number == systematicallyMissingParts[i].number
      );

      if (systematicallyMissingOccurances.length > 0) {
        if (systematicallyMissingOccurances.length > 1) {
          // Do something
        }
        if (physicallyMissingOccurances.length > 1) {
          //Do Something
        }
      }
    }
  };

  // Shows loading/error screen until query is returned successfully
  if (isLoading) {
    return <h1>Fetching Data From Database...</h1>;
  } else if (isError) {
    return <p>{error.message}</p>;
  } else if (isGeneratingTransactions) {
    return <h1>Generating Transaction list...</h1>;
  }

  return (
    <>
      <h2>You are managing inventory errors for warehouse {warehouse.name}:</h2>
      <ButtonGroup label="Generate Transactions" onClick={handleClick} />
    </>
  );
}

export default InventoryManager;
