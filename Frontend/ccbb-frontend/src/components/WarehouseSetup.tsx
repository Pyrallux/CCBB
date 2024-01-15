import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonGroup from "./ButtonGroup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getWarehouseDetail,
  addWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from "../api/warehousesApi";

// Specifies the parameters of the component
interface Props {
  type: "Add" | "Edit" | "Setup";
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

// Main Funciton of Component
function WarehouseSetup({ type }: Props) {
  // Defines react-query client and gathers data from warehouse api
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: warehouse,
  } = useQuery({
    queryKey: ["editWarehouse"],
    queryFn: () => getWarehouseDetail(6), // ** REMINDER ** This should query the warehouse selected
  });

  // Defines mutation functions of warehouse api
  const addWarehouseMutation = useMutation({
    mutationFn: addWarehouse,
    onSuccess: () => {
      //Invalidates cache and refetch
      queryClient.invalidateQueries({ queryKey: ["editWarehouse"] });
    },
  });
  const updateWarehouseMutation = useMutation({
    mutationFn: updateWarehouse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["editWarehouse"] });
    },
  });
  const deleteWarehouseMutation = useMutation({
    mutationFn: deleteWarehouse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["editWarehouse"] });
    },
  });

  // Initializes context, navigate, and effect hooks needed later in script
  const { manual, setManual } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (type == "Edit") {
      setManual(warehouse?.manual);
      setValue("name", warehouse?.name);
      setValue("path", warehouse?.path);
      setValue("abc_code_path", warehouse?.abc_code_path);
      setValue("cycles_per_year", warehouse?.cycles_per_year);
    }
  }, [warehouse]);

  // Setup yup form structure and initialize form hook
  const schema = yup.object().shape({
    name: yup.string().required("*Warehouse Nickname is Required"),
    path: yup.string().when("manual", ([manual], schema) => {
      return !manual
        ? yup.string().required("*Warehouse Path is Required")
        : schema;
    }),
    abc_code_path: yup.string().when("manual", ([manual], schema) => {
      return !manual
        ? yup.string().required("*ABC Code Path is Required")
        : schema;
    }),
    cycles_per_year: yup.number().when("manual", ([manual], schema) => {
      return !manual
        ? yup.number().required("*Cycles/Year Input is Required")
        : schema;
    }),
    manual: yup.boolean(),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Various event handlers
  const onSubmit = (data: WarehouseData) => {
    data.warehouse_id = warehouse.warehouse_id;
    type == "Edit"
      ? updateWarehouseMutation.mutate(data)
      : addWarehouseMutation.mutate(data);
    console.log(data);
    navigate("/SelectWarehouse");
  };

  const handleClick = (label: string) => {
    label == "Return" && navigate("/SelectWarehouse");
  };

  const handleChange = () => {
    setManual(!manual);
    setValue("path", undefined);
    setValue("abc_code_path", undefined);
    setValue("cycles_per_year", undefined);
  };

  // Shows loading/error screen until query is returned successfully
  if (isLoading) {
    return <h1>Fetching Data From Database...</h1>;
  } else if (isError) {
    return <p>{error.message}</p>;
  }

  // Main Page
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {type == "Setup" && <h2>Enter Initial Warehouse Setup Info Below:</h2>}
      {type == "Add" && <h2>Enter New Warehouse Setup Info Below:</h2>}
      {type == "Edit" && <h2>Edit Warehouse Info Below:</h2>}

      <label className="form-label">Warehouse Nickname</label>
      <text className="ms-3 text-danger fst-italic">
        {errors.name?.message}
      </text>
      <input type="text" className="form-control" {...register("name")} />
      {manual == false && (
        <>
          <label className="form-label mt-3">Warehouse Database Path</label>
          <text className="ms-3 text-danger fst-italic">
            {errors.path?.message}
          </text>
          <input type="text" className="form-control" {...register("path")} />
          <label className="form-labe mt-3">
            Warehouse ABC Code Database Path
          </label>
          <text className="ms-3 text-danger fst-italic">
            {errors.abc_code_path?.message}
          </text>
          <input
            type="text"
            className="form-control"
            {...register("abc_code_path")}
          />
          <label className="form-label mt-3">
            Number of Cycles/Year to Generate
          </label>
          <text className="ms-3 text-danger fst-italic">
            {errors.cycles_per_year?.message}
          </text>
          <input
            type="text"
            className="form-control"
            {...register("cycles_per_year")}
          />
        </>
      )}
      <div className="mt-4 form-check form-switch">
        <input
          className="mt-1 form-check-input"
          type="checkbox"
          role="switch"
          checked={manual}
          {...register("manual")}
          onChange={handleChange}
        />
        <label className="form-check-label">Enable Manual Mode?</label>
      </div>
      {type != "Setup" && <ButtonGroup label="Return" onClick={handleClick} />}
      <ButtonGroup label="Done" type="submit" onClick={handleClick} />
    </form>
  );
}

export default WarehouseSetup;
