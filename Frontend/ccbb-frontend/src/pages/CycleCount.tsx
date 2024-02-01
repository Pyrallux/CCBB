import { useContext } from "react";
import { AppContext } from "../App";
import PartListGroup from "../components/PartListGroup";

function CycleCount() {
  // ** MISSING ** Pull data from database, display cycle count gui, cycle count logic??
  const { whse, cycle } = useContext(AppContext);

  return (
    <>
      <h1>Under Construction Cycle Count</h1>
      <h2>Warehouse: {whse}</h2>
      <h2>Cycle: {cycle}</h2>
      <PartListGroup type="present" />
    </>
  );
}

export default CycleCount;
