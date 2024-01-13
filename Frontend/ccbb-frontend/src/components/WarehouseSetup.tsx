import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonGroup from "./ButtonGroup";

interface Props {
  type: "Add" | "Edit" | "Setup";
}

interface Data {
  whseName: string;
  whsePath?: string | undefined;
  whseABCPath?: string | undefined;
  numCycles?: number | undefined;
  manual?: boolean | undefined;
}

function WarehouseSetup({ type }: Props) {
  const { manual, setManual } = useContext(AppContext);
  const navigate = useNavigate();

  // Setup form structure
  const schema = yup.object().shape({
    whseName: yup.string().required("*Warehouse Nickname is Required"),
    whsePath: yup.string().when("manual", ([manual], schema) => {
      return !manual
        ? yup.string().required("*Warehouse Path is Required")
        : schema;
    }),
    whseABCPath: yup.string().when("manual", ([manual], schema) => {
      return !manual
        ? yup.string().required("*ABC Code Path is Required")
        : schema;
    }),
    numCycles: yup.number().when("manual", ([manual], schema) => {
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
  const onSubmit = (data: Data) => {
    // ** MISSING ** send submitted warehouse data to database
    console.log(data);
    navigate("/SelectWarehouse");
  };

  const handleClick = (label: string) => {
    console.log(`Button: ${label} clicked`);
  };

  const handleChange = () => {
    setManual(!manual);
    setValue("whsePath", undefined);
    setValue("whseABCPath", undefined);
    setValue("numCycles", undefined);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {type == "Setup" && <h2>Enter Initial Warehouse Setup Info Below:</h2>}
      {type == "Add" && <h2>Enter New Warehouse Setup Info Below:</h2>}
      {type == "Edit" && <h2>Edit Warehouse Info Below:</h2>}

      <label className="form-label">Warehouse Nickname</label>
      <text className="ms-3 text-danger fst-italic">
        {errors.whseName?.message}
      </text>
      <input type="text" className="form-control" {...register("whseName")} />
      {manual == false && (
        <>
          <label className="form-label">Warehouse Database Path</label>
          <text className="ms-3 text-danger fst-italic">
            {errors.whsePath?.message}
          </text>
          <input
            type="text"
            className="form-control"
            {...register("whsePath")}
          />
          <label className="form-label">Warehouse ABC Code Database Path</label>
          <text className="ms-3 text-danger fst-italic">
            {errors.whseABCPath?.message}
          </text>
          <input
            type="text"
            className="form-control"
            {...register("whseABCPath")}
          />
          <label className="form-label">
            Number of Cycles/Year to Generate
          </label>
          <text className="ms-3 text-danger fst-italic">
            {errors.numCycles?.message}
          </text>
          <input
            type="text"
            className="form-control"
            {...register("numCycles")}
          />
        </>
      )}
      <div>
        <input
          type="checkbox"
          checked={manual}
          {...register("manual")}
          onChange={handleChange}
        />
        <text className="ms-2">Enable Manual Mode?</text>
      </div>
      <ButtonGroup label="Done" type="submit" onClick={handleClick} />
    </form>
  );
}

export default WarehouseSetup;
