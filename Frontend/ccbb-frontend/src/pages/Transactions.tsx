// Make New Table4Col Component
import { AppContext } from "../App";
import { useContext } from "react";

function Transactions() {
  const { whse } = useContext(AppContext);

  return (
    <>
      <h2>Transaction List for Warehouse #{whse}:</h2>
    </>
  );
}

export default Transactions;
