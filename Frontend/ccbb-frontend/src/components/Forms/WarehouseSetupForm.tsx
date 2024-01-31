import { useContext } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonGroup from "../ButtonGroup";
import { useMutation } from "@tanstack/react-query";
import { addWarehouse } from "../../api/warehousesApi";

// Specifies the parameters of the component
interface Props {
  type: "Add" | "Setup";
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
function WarehouseSetupForm({ type }: Props) {
  const { manual, setManual, whse } = useContext(AppContext);

  // Defines mutation functions of warehouse api
  const addWarehouseMutation = useMutation({
    mutationFn: addWarehouse,
    onSuccess: () => {
      console.log("Warehouse successfully added");
    },
  });

  // Initializes context, navigate, and effect hooks needed later in script
  const navigate = useNavigate();

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
    data.warehouse_id = whse;
    addWarehouseMutation.mutate(data);
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

  // Main Page
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label">Warehouse Nickname</label>
        <p className="ms-3 text-danger fst-italic">{errors.name?.message}</p>
        <input type="text" className="form-control" {...register("name")} />
        {manual == false && (
          <>
            <label className="form-label mt-3">Warehouse Database Path</label>
            <p className="ms-3 text-danger fst-italic">
              {errors.path?.message}
            </p>
            <input type="text" className="form-control" {...register("path")} />
            <label className="form-labe mt-3">
              Warehouse ABC Code Database Path
            </label>
            <p className="ms-3 text-danger fst-italic">
              {errors.abc_code_path?.message}
            </p>
            <input
              type="text"
              className="form-control"
              {...register("abc_code_path")}
            />
            <label className="form-label mt-3">
              Number of Cycles/Year to Generate
            </label>
            <p className="ms-3 text-danger fst-italic">
              {errors.cycles_per_year?.message}
            </p>
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
        {type != "Setup" && (
          <ButtonGroup label="Return" onClick={handleClick} />
        )}
        <ButtonGroup label="Done" type="submit" onClick={handleClick} />
      </form>
    </>
  );
}

export default WarehouseSetupForm;
