import { useContext, useState } from "react";
import { AppContext } from "../App";
import CountForm from "../components/Forms/CountForm";
import ButtonGroup from "../components/ButtonGroup";
import { useNavigate } from "react-router-dom";

function CycleCount() {
  // ** MISSING ** Pull data from database, display cycle count gui, cycle count logic??
  const { whse, cycle, binList } = useContext(AppContext);
  const [binIndex, setBinIndex] = useState(0);
  const navigate = useNavigate();

  const handleClick = (label: string) => {
    if (label == "Continue") {
      if (binIndex < binList.length - 1) {
        setBinIndex(binIndex + 1);
      } else {
        navigate("/Transactions");
      }
    } else if (label == "Back") {
      navigate("/SelectCycle");
    }
  };

  return (
    <>
      <h1>Under Construction Cycle Count</h1>
      <h2>Warehouse: {whse}</h2>
      <h2>Cycle: {cycle}</h2>
      <h2>Bin: {binList[binIndex]}</h2>
      <CountForm />
      <ButtonGroup label="Back" onClick={handleClick} />
      <ButtonGroup label="Continue" onClick={handleClick} />
    </>
  );
}
export default CycleCount;
