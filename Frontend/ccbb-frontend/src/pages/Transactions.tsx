import { AppContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/transactionApi";
import Table5Col from "../components/Table5Col";

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

function Transactions() {
  const { whse } = useContext(AppContext);
  const [partNumberList, setPartNumberList] = useState([""]);
  const [quantityList, setQuantityList] = useState([""]);
  const [oldLocationList, setOldLocationList] = useState([""]);
  const [newLocationList, setNewLocationList] = useState([""]);
  const [dateList, setDateList] = useState([""]);

  const {
    isLoading,
    isError,
    error,
    data: transactions,
  } = useQuery({
    queryKey: ["getTransactionHistory"],
    queryFn: () => getTransactions(),
  });

  useEffect(() => {
    setTimeout(() => {
      let executed_list: Transaction[] = transactions?.filter(
        (transaction: Transaction) =>
          transaction.executed == true && transaction.warehouse_id == whse
      );
      setPartNumberList(
        executed_list.map((transaction: Transaction) => transaction.part_number)
      );
      setQuantityList(
        executed_list.map((transaction: Transaction) =>
          transaction.quantity.toString()
        )
      );
      setOldLocationList(
        executed_list.map(
          (transaction: Transaction) => transaction.old_location
        )
      );
      setNewLocationList(
        executed_list.map(
          (transaction: Transaction) => transaction.new_location
        )
      );
      setDateList(
        executed_list.map((transaction: Transaction) =>
          transaction.date.toString()
        )
      );
    }, 500);
  }, [transactions]);

  const handleSelectItem = (indexList: number[]) => {
    console.log(`Selected Element: ${indexList}`);
  };

  // Shows loading/error screen until query is returned successfully
  if (isLoading) {
    return <h1>Fetching Data From Database...</h1>;
  } else if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <h2>Transaction History List for Warehouse #{whse}:</h2>
      <Table5Col
        row1Data={partNumberList}
        row2Data={quantityList}
        row3Data={oldLocationList}
        row4Data={newLocationList}
        row5Data={dateList}
        heading1="Part Number"
        heading2="Quantity"
        heading3="Moved From"
        heading4="Moved To"
        heading5="Date Executed"
        onSelectItem={handleSelectItem}
      />
    </>
  );
}

export default Transactions;
