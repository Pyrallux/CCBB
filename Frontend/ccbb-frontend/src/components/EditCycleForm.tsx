import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonGroup from "./ButtonGroup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCycleDetail, updateCycle, deleteCycle } from "../api/cyclesApi";
import { format } from "date-fns";

// Specifies the structure of warehouse data model (accessed through api)
interface CycleData {
  cycle_id?: number;
  name: string;
  date: Date | string;
  warehouse_id?: number;
}

// Main Funciton of Component
function EditWarehouseForm() {
  const { cycle, whse } = useContext(AppContext);

  // Defines react-query client and gathers data from warehouse api
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: cycleData,
  } = useQuery({
    queryKey: ["editCycle"],
    queryFn: () => getCycleDetail(cycle), // ** REMINDER ** This should query the warehouse selected
  });

  const updateCycleMutation = useMutation({
    mutationFn: updateCycle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["editCycle"] });
    },
  });
  const deleteCycleMutation = useMutation({
    mutationFn: deleteCycle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["editCycle"] });
    },
  });

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
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  // Various event handlers
  const onSubmit = (data: CycleData) => {
    data.cycle_id = cycle;
    data.warehouse_id = whse;
    data.date = format(data.date, "yyyy-MM-dd");
    updateCycleMutation.mutate(data);
    console.log(data);
    navigate("/SelectCycle");
  };

  const handleClick = (label: string) => {
    if (label == "Delete Cycle") {
      deleteCycleMutation.mutate(cycle);
      navigate("/SelectCycle");
    }
    if (label == "Return") {
      navigate("/SelectCycle");
    }
  };

  useEffect(() => {
    console.log(cycleData);
    setValue("name", cycleData?.name);
    setValue("date", cycleData?.date);
  }, [cycleData]);

  // Shows loading/error screen until query is returned successfully
  if (isLoading) {
    return <p>Fetching Data From Database...</p>;
  } else if (isError) {
    return <p>{error.message}</p>;
  }

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
      <div>
        <ButtonGroup
          label="Delete Cycle"
          style="outline-danger"
          onClick={handleClick}
        />
      </div>
    </>
  );
}

export default EditWarehouseForm;
