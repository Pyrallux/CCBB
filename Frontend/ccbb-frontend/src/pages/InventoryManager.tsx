import { AppContext } from "../App";
import { useContext, useState } from "react";
import { getWarehouseDetail } from "../api/warehousesApi";
import { useQuery } from "@tanstack/react-query";
import ButtonGroup from "../components/ButtonGroup";
import { getPresentParts } from "../api/presentPartsApi";
import { getSystemParts } from "../api/systemPartsApi";

interface PresentPart {
  present_part_id?: number;
  number: string;
  quantity: number;
  bin_id: number;
}

interface SystemPart {
  system_part_id?: number;
  number: string;
  quantity: number;
  bin_id: number;
}

function InventoryManager() {
  const { whse } = useContext(AppContext);
  const [isGeneratingTransactions, setIsGeneratingTransactions] =
    useState(false);

  const { data: presentParts } = useQuery({
    // Replace with physically missing parts
    queryKey: ["getPresentParts"],
    queryFn: () => getPresentParts(),
  });

  const { data: systemParts } = useQuery({
    // Replace with systematically missing parts
    queryKey: ["getPresentParts"],
    queryFn: () => getSystemParts(),
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
    // Logic here
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
