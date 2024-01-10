import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonGroup from "../components/ButtonGroup";
import ListGroup from "../components/ListGroup";

interface Data {
  whse: string;
}

function SelectWarehouse() {
  const { whse, setWhse } = useContext(AppContext);
  const navigate = useNavigate();

  // ** MISSING ** pull warehouse list from database
  const warehouse_list: string[] = ["Example1", "Example2", "Example3"]; // Example List

  // Setup Yup Form Schema
  const schema = yup.object().shape({
    whse: yup.string().required("*Warehouse Selection is Required"),
  });

  // Setup React-Hook-Form Structure
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Data) => {
    console.log(data);
    setWhse(data.whse);
    // ** MISSING ** send submitted warehouse data to database and continue
    navigate("/SelectCycle");
  };

  const handleSelectItem = (element: string) => {
    console.log(`Selected Element: ${element}`);
    setValue("whse", element);
  };

  const handleClick = (label: string) => {
    console.log(`Button: ${label} clicked`);
    if (label == "+ Add New Warehouse") {
      navigate("/AddWarehouse");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Select A Warehouse:</h2>
      <text className="ms-3 text-danger fst-italic">
        {errors.whse?.message}
      </text>
      <ListGroup items={warehouse_list} onSelectItem={handleSelectItem} />
      <input type="hidden" defaultValue={whse} {...register("whse")} />
      <div>
        <ButtonGroup
          label="+ Add New Warehouse"
          style="outline-primary"
          onClick={handleClick}
        />
      </div>
      <ButtonGroup label="Next" type="submit" onClick={handleClick} />
    </form>
  );
}

export default SelectWarehouse;
