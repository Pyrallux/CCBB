import { Link } from "react-router-dom";
import InputGroup from "../components/InputGroup";
import ButtonGroup from "../components/ButtonGroup";

function Setup() {
  const handleChange = (label: string, input: string) => {
    console.log(`${label}: ${input}`);
  };

  const handleClick = (label: string) => {
    console.log(`Button: ${label} clicked`);
    // ** MISSING ** send submitted warehouse data to database
  };

  return (
    <form>
      <div>
        <h2>Enter Warehouse Setup Info Below:</h2>
        <InputGroup label="Warehouse Nickname" onChange={handleChange} />
        <InputGroup
          label="Warehouse Database Path (Epicor)"
          onChange={handleChange}
        />
      </div>
      <Link to="/SelectWarehouse">
        <ButtonGroup label="Done" type="button" onClick={handleClick} />
      </Link>
    </form>
  );
}

export default Setup;
