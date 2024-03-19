import { AppContext } from "../App";
import { useContext, useState } from "react";
import { getWarehouseDetail } from "../api/warehousesApi";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import ButtonGroup from "../components/ButtonGroup";
import { getPhysicallyMissingParts } from "../api/physicallyMissingPartsApi";
import { getSystematicallyMissingParts } from "../api/systematicallyMissingPartsApi";
import { format } from "date-fns";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "../api/transactionApi";
import { useNavigate } from "react-router-dom";
import Table4Col from "../components/Table4Col";

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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { whse } = useContext(AppContext);
  const [isGeneratingTransactions, setIsGeneratingTransactions] =
    useState(false);
  const [areTransactionsGenerated, setAreTransactionsUpdated] = useState(false);
  const [selectedTransactionList, setSelectedTransactionList] = useState([-1]);
  const [partNumberList, setPartNumberList] = useState([""]);
  const [quantityList, setQuantityList] = useState([""]);
  const [oldLocationList, setOldLocationList] = useState([""]);
  const [newLocationList, setNewLocationList] = useState([""]);

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
    queryFn: () => getTransactions(),
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

  const updateTransactionMutation = useMutation({
    mutationFn: updateTransaction,
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
      setIsGeneratingTransactions(false);
    }

    for (let i = 0; i < transactionList.length; i++) {
      addTransactionMutation.mutate(transactionList[i]);
    }
    console.log("Transaction Generation Finished!");
  };

  const generateTransactionDataLists = () => {
    let not_executed_list: Transaction[] = transactions?.filter(
      (transaction: Transaction) => transaction.executed == false
    );
    setPartNumberList(
      not_executed_list.map(
        (transaction: Transaction) => transaction.part_number
      )
    );
    setQuantityList(
      not_executed_list.map((transaction: Transaction) =>
        transaction.quantity.toString()
      )
    );
    setOldLocationList(
      not_executed_list.map(
        (transaction: Transaction) => transaction.old_location
      )
    );
    setNewLocationList(
      not_executed_list.map(
        (transaction: Transaction) => transaction.new_location
      )
    );
  };

  const executeTransactions = () => {
    for (let i = 0; i < selectedTransactionList.length; i++) {
      // MISSING Logic to remove transactions from missing part lists
      let not_executed_transactions: Transaction[] = transactions?.filter(
        (transaction: Transaction) => transaction.executed == false
      );
      let transaction = not_executed_transactions[selectedTransactionList[i]];
      transaction.executed = true;
      updateTransactionMutation.mutate(transaction);
    }
  };

  const handleClick = (label: string) => {
    console.log(`Button: ${label} clicked`);
    if (label == "Generate Transactions") {
      setIsGeneratingTransactions(true);
      generateTransactions();
      generateTransactionDataLists();
      setAreTransactionsUpdated(true);
    } else if (label == "View Transaction History") {
      navigate("/Transactions");
    } else if (label == "Execute Moves") {
      executeTransactions();
    }
  };

  const handleSelectItem = (indexList: number[]) => {
    console.log(`Selected Element: ${indexList}`);
    setSelectedTransactionList(indexList);
  };

  // Shows loading/error screen until query is returned successfully
  if (isLoading) {
    return <h1>Fetching Data From Database...</h1>;
  } else if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      {isGeneratingTransactions ? (
        <h1>"Generating Transactions...</h1>
      ) : (
        <>
          {areTransactionsGenerated ? (
            <>
              <h2>List of Identified Transactions for {warehouse?.name}:</h2>
              <p>
                Be sure to select each move as you make them, then click
                "Execute Moves" when you are finished.
              </p>
              <Table4Col
                row1Data={partNumberList}
                row2Data={quantityList}
                row3Data={oldLocationList}
                row4Data={newLocationList}
                heading1="Part Number"
                heading2="Quantity"
                heading3="Move From"
                heading4="Move To"
                onSelectItem={handleSelectItem}
              />
              <ButtonGroup
                label="Execute Moves"
                style="primary"
                onClick={handleClick}
              />
              <ButtonGroup
                label="View Transaction History"
                style="outline-secondary"
                onClick={handleClick}
              />
            </>
          ) : (
            <ButtonGroup label="Generate Transactions" onClick={handleClick} />
          )}
        </>
      )}
    </>
  );
}

export default InventoryManager;
