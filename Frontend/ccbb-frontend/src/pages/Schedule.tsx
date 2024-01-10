import { Link } from "react-router-dom";
import Table2Col from "../components/Table2Col";
import ButtonGroup from "../components/ButtonGroup";

const handleSelectItem = (element: string) => {
  console.log(`Selected Element: ${element}`);
};

const handleClick = (label: string) => {
  console.log(`Button: ${label} clicked`);
  // ** MISSING ** send selected cycle count to database
};

interface Dictionary {
  [id: string]: string;
}

function Schedule() {
  const cycleCountList: Dictionary = { Cycle1: "2/1/24", Cycle2: "2/6/24" };
  return (
    <>
      <h2 className="md-4">Select Cycle Count Below:</h2>
      <Table2Col
        data={cycleCountList}
        heading1="Cycle Count ID"
        heading2="Cycle Date"
        onSelectItem={handleSelectItem}
      />
      <Link to="/CycleCount">
        <ButtonGroup label="Confirm" type="button" onClick={handleClick} />
      </Link>
    </>
  );
}

export default Schedule;
