import { Link } from "react-router-dom";
import ButtonGroup from "../components/ButtonGroup";
import ListGroup from "../components/ListGroup";

function SelectWarehouse() {
  // ** MISSING ** pull warehouse list from database
  const warehouse_list: string[] = ["Example1", "Example2", "Example3"]; // Example List

  const handleSelectItem = (element: string) => {
    console.log(`Selected Element: ${element}`);
    let whse = element;
  };

  const handleClick = (label: string) => {
    console.log(`Button: ${label} clicked`);
    // ** MISSING ** send submitted warehouse data to database and continue
  };

  return (
    <div>
      <h2 className="mb-3">Select A Warehouse:</h2>
      <ListGroup items={warehouse_list} onSelectItem={handleSelectItem} />
      <div>
        <Link to="Setup">
          <ButtonGroup
            label="+ Add New Warehouse"
            style="outline-primary"
            onClick={handleClick}
          />
        </Link>
      </div>
      <Link to="/Schedule">
        <ButtonGroup label="Next" type="button" onClick={handleClick} />
      </Link>
    </div>
  );
}

export default SelectWarehouse;
