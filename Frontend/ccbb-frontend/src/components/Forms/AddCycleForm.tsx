import { useContext } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonGroup from "../ButtonGroup";
import BinListGroup from "../BinListGroup";
import { useMutation } from "@tanstack/react-query";
import { addCycle } from "../../api/cyclesApi";
import { format } from "date-fns";

interface CycleData {
  cycle_id?: number;
  name: string;
  date: Date | string;
  warehouse_id?: number;
}

function AddCycleForm() {
  const { whse, cycle, setBinAdded } = useContext(AppContext);
  const navigate = useNavigate();

  // Defines Mutation Add Function of cycleApi
  const addCycleMutation = useMutation({
    mutationFn: addCycle,
    onSuccess: () => {
      console.log("Cycle successfully added");
      setBinAdded(true);
      navigate("/SelectCycle");
    },
  });

  // Defines react-hook-form and yupResolver form structure
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

  const onSubmit = (data: CycleData) => {
    /**
     * Handles the form's submission
     *
     * @remarks
     * Only runs if the yupResolver finds the form to be valid.
     * Once the form is submitted, a mutation to the database
     * is made with the data given.
     *
     * @param data - The data from the form inside an object
     */
    addCycleMutation.mutate({
      cycle_id: cycle,
      name: data.name,
      date: format(data.date, "yyyy-MM-dd"),
      warehouse_id: whse,
    });
  };

  const handleClick = (label: string) => {
    /**
     * Handles button click events
     *
     * @remarks
     * If the button's label is return,
     * navigates the user to the SelectCycle page.
     *
     * @param label - Label of button clicked
     */
    label == "Return" && navigate("/SelectCycle");
  };

  // Main Rendered Page
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label">Cycle Name</label>
        <p className="ms-3 text-danger fst-italic">{errors.name?.message}</p>
        <input type="text" className="form-control" {...register("name")} />
        <label className="form-label">Cycle Date</label>
        <p className="ms-3 text-danger fst-italic">{errors.date?.message}</p>
        <input type="date" className="form-control" {...register("date")} />
        <label className="form-label">Bins to Count</label>
        <BinListGroup />
        <ButtonGroup label="Return" onClick={handleClick} />
        <ButtonGroup label="Done" type="submit" onClick={handleClick} />
      </form>
    </>
  );
}

export default AddCycleForm;
