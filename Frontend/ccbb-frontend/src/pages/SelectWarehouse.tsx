import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonGroup from "../components/ButtonGroup";
import ListGroup from "../components/ListGroup";
import { useQuery } from "@tanstack/react-query";
import { getWarehouses } from "../api/warehousesApi";

interface Data {
  whse: string;
}

// Specifies the structure of warehouse data model (accessed through api)
interface WarehouseData {
  warehouse_id?: number;
  name: string;
  path?: string;
  abc_code_path?: string;
  cycles_per_year?: number;
  manual?: boolean;
}

function SelectWarehouse() {
  const { whse, setWhse } = useContext(AppContext);
  const [warehouseList, setWarehouseList] = useState([]);
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    error,
    data: warehouses,
  } = useQuery({
    queryKey: ["getWarehouseList"],
    queryFn: () => getWarehouses(), // ** REMINDER ** This should query the warehouse selected
  });

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

  // Shows loading/error screen until query is returned successfully
  if (isLoading) {
    return <h1>Fetching Data From Database...</h1>;
  } else if (isError) {
    return <p>{error.message}</p>;
  }

  const warehouse_list: string[] = [];
  for (let i = 0; i < warehouses.length; i++) {
    if (!warehouses[i].hasOwnProperty("name")) {
      continue;
    }
    warehouse_list.push(warehouses[i].name);
  }

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
