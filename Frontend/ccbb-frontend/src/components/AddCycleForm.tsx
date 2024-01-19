import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonGroup from "./ButtonGroup";
import { useMutation } from "@tanstack/react-query";
import { addCycle } from "../api/cyclesApi";
import { format } from "date-fns";

interface CycleData {
  cycle_id?: number;
  name: string;
  date: Date | string;
  warehouse_id?: number;
}

// Main Function of Component
function AddCycleForm() {
  const { whse, cycle } = useContext(AppContext);

  // Defines mutation functions of warehouse api
  const addCycleMutation = useMutation({
    mutationFn: addCycle,
    onSuccess: () => {
      console.log("Cycle successfully added");
    },
  });

  // Initializes context, navigate, and effect hooks needed later in script
  const navigate = useNavigate();

  // Setup yup form structure and initialize form hook
  const schema = yup.object().shape({
    name: yup.string().required("*Cycle Name is Required"),
    date: yup
      .date()
      .min(new Date(), "*Date Must be in the future")
      .required("*Cycle Date is Required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Various event handlers
  const onSubmit = (data: CycleData) => {
    data.cycle_id = cycle;
    data.warehouse_id = whse;
    data.date = format(data.date, "yyyy-MM-dd");
    addCycleMutation.mutate(data);
    console.log(data);
    navigate("/SelectCycle");
  };

  const handleClick = (label: string) => {
    label == "Return" && navigate("/SelectCycle");
  };

  // Main Page
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label">Cycle Name</label>
        <text className="ms-3 text-danger fst-italic">
          {errors.name?.message}
        </text>
        <input type="text" className="form-control" {...register("name")} />
        <label className="form-label">Cycle Date</label>
        <text className="ms-3 text-danger fst-italic">
          {errors.date?.message}
        </text>
        <input type="date" className="form-control" {...register("date")} />
        <ButtonGroup label="Return" onClick={handleClick} />
        <ButtonGroup label="Done" type="submit" onClick={handleClick} />
      </form>
    </>
  );
}

export default AddCycleForm;
