import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonGroup from "../../components/ButtonGroup";
import ListGroup from "../../components/ListGroup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getWarehouses } from "../../api/warehousesApi";

interface Data {
  warehouse: number;
}

function SelectWarehouse() {
  const queryClient = useQueryClient();
  const [warehouseList, setWarehouseList] = useState(["Loading..."]);
  const [warehouseListKeys, setWarehouseListKeys] = useState([0]);
  const [selected, setSelected] = useState(false);
  const { setWhse, setManual } = useContext(AppContext);
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    error,
    refetch,
    data: warehouses,
  } = useQuery({
    queryKey: ["getWarehouseList"],
    queryFn: () => getWarehouses(),
    refetchInterval: 2500,
  });

  // Setup Yup Form Schema
  const schema = yup.object().shape({
    warehouse: yup
      .number()
      .min(-1, "*Warehouse Selection is Required")
      .required("*Warehouse Selection is Required"),
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
    setWhse(warehouseListKeys[data.warehouse]);
    setManual(warehouses[data.warehouse].manual);
    // ** MISSING ** send submitted warehouse data to database and continue
    navigate("/SelectCycle");
  };

  const handleSelectItem = (index: number) => {
    console.log(`Selected Element: ${index}`);
    setSelected(true);
    setValue("warehouse", index);
  };

  const handleClick = (label: string) => {
    console.log(`Button: ${label} clicked`);
    if (label == "+ Add New Warehouse") {
      navigate("/AddWarehouse");
    }
  };

  const handleEdit = (index: number) => {
    console.log("Editing Warehouse:", warehouseListKeys[index]);
    setWhse(warehouseListKeys[index]);
    navigate("/EditWarehouse");
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["getWarehouseList"] });
    setTimeout(() => {
      refetch;
      const warehouse_list: string[] = [];
      const warehouse_list_keys: number[] = [];
      for (let i = 0; i < warehouses?.length; i++) {
        if (!warehouses[i].hasOwnProperty("name")) {
          continue;
        }
        warehouse_list.push(warehouses[i].name);
        warehouse_list_keys.push(warehouses[i].warehouse_id);
      }
      setWarehouseList(warehouse_list);
      setWarehouseListKeys(warehouse_list_keys);
    }, 100);
  }, [warehouses]);

  // Shows loading/error screen until query is returned successfully
  if (isLoading) {
    return <h1>Fetching Data From Database...</h1>;
  } else if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Select A Warehouse:</h2>
      <p className="ms-3 text-danger fst-italic">{errors.warehouse?.message}</p>
      <ListGroup
        items={warehouseList}
        onSelectItem={handleSelectItem}
        onClickEdit={handleEdit}
      />
      <input type="hidden" {...register("warehouse")} />
      <div>
        <ButtonGroup
          label="+ Add New Warehouse"
          style="outline-primary"
          onClick={handleClick}
        />
      </div>
      {selected ? (
        <ButtonGroup label="Continue" type="submit" onClick={handleClick} />
      ) : (
        <ButtonGroup
          label="Continue"
          disabled={true}
          type="submit"
          onClick={handleClick}
        />
      )}
    </form>
  );
}

export default SelectWarehouse;
