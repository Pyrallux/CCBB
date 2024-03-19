import { AppContext } from "../App";
import { useContext, useState } from "react";
import { getWarehouseDetail } from "../api/warehousesApi";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import ButtonGroup from "../components/ButtonGroup";
import { getPhysicallyMissingParts } from "../api/physicallyMissingPartsApi";
import { getSystematicallyMissingParts } from "../api/systematicallyMissingPartsApi";
import { format } from "date-fns";
import { addTransaction, deleteTransaction } from "../api/transactionApi";

interface Transaction {
  transaction_id?: number;
  part_number: string;
  old_location: string;
  new_location: string;
  quantity: number;
  date: Date | string;
  executed: boolean;
  warehouse_id: number;
}

interface MissingPart {
  part_id?: number;
  number: string;
  quantity: number;
  location: string;
  date: Date | string;
  bin_id: number;
}

function InventoryManager() {
  const queryClient = useQueryClient();
  const { whse } = useContext(AppContext);
  const [isGeneratingTransactions, setIsGeneratingTransactions] =
    useState(false);

  const { data: physicallyMissingParts } = useQuery({
    queryKey: ["getPhysicallyMissingParts"],
    queryFn: () => getPhysicallyMissingParts(),
  });

  const { data: systematicallyMissingParts } = useQuery({
    queryKey: ["getSystematicallyMissingParts"],
    queryFn: () => getSystematicallyMissingParts(),
  });

  const { data: transactions } = useQuery({
    queryKey: ["getTransactions"],
    queryFn: () => getPhysicallyMissingParts(),
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

  const addTransactionMutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTransactions"] });
    },
  });

  const deleteTransactionMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTransactions"] });
    },
  });

  const generateTransactions = () => {
    console.log("Generating Transcations...");
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].executed == false) {
        deleteTransactionMutation.mutate(transactions[i].transaction_id);
      }
    }

    let systematicallyMissingPartsList: MissingPart[] =
      systematicallyMissingParts;
    let physicallyMissingPartsList: MissingPart[] = physicallyMissingParts;
    let transactionList: Transaction[] = [];

    for (let i = 0; i < physicallyMissingPartsList.length; i++) {
      let matchingPartsList: MissingPart[] =
        systematicallyMissingPartsList.filter(
          (part: MissingPart) =>
            part.number == physicallyMissingPartsList[i].number
        );
      if (matchingPartsList.length > 0) {
        let matchingPartsIndex = 0;
        while (
          physicallyMissingPartsList[i].quantity > 0 &&
          matchingPartsIndex < matchingPartsList.length
        ) {
          let j = systematicallyMissingParts.indexOf(
            matchingPartsList[matchingPartsIndex]
          );
          let transactionQty =
            physicallyMissingPartsList[i].quantity >=
            systematicallyMissingPartsList[j].quantity
              ? systematicallyMissingPartsList[j].quantity
              : physicallyMissingPartsList[i].quantity;
          transactionList.push({
            part_number: physicallyMissingPartsList[i].number,
            old_location: physicallyMissingPartsList[i].location,
            new_location: systematicallyMissingPartsList[j].location,
            quantity: transactionQty,
            date: format(new Date(), "yyyy-MM-dd"),
            executed: false,
            warehouse_id: whse,
          });
          physicallyMissingPartsList[i].quantity -= transactionQty;
          matchingPartsIndex++;
        }
      }
    }

    for (let i = 0; i < transactionList.length; i++) {
      addTransactionMutation.mutate(transactionList[i]);
    }
    console.log("Transaction Generation Finished!");
  };

  const handleClick = (label: string) => {
    console.log(`Button: ${label} clicked`);
    if (label == "Generate Transactions") {
      generateTransactions();
    }
  };

  // Shows loading/error screen until query is returned successfully
  if (isLoading) {
    return <h1>Fetching Data From Database...</h1>;
  } else if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <h2>You are managing inventory errors for warehouse {warehouse.name}:</h2>
      <ButtonGroup label="Generate Transactions" onClick={handleClick} />
    </>
  );
}

export default InventoryManager;
