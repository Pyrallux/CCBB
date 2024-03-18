import { AppContext } from "../App";
import { useContext } from "react";
import Table4Col from "../components/Table4Col";

function Transactions() {
  const { whse } = useContext(AppContext);

  const handleSelectItem = (index: number) => {
    console.log(`Selected Element: ${index}`);
  };

  return (
    <>
      <h2>Transaction List for Warehouse #{whse}:</h2>
      <Table4Col
        row1Data={["0"]}
        row2Data={["0"]}
        row3Data={["0"]}
        row4Data={["0"]}
        heading1="Part Number"
        heading2="Quantity"
        heading3="Move From"
        heading4="Move To"
        onSelectItem={handleSelectItem}
      />
    </>
  );
}

export default Transactions;
