import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Table2Col from "../components/Table2Col";
import ButtonGroup from "../components/ButtonGroup";
import { getCycleParent } from "../api/cyclesApi";
import { useQuery } from "@tanstack/react-query";

interface Data {
  cycle: string;
}

function SelectCycle() {
  const { whse, cycle, setCycle } = useContext(AppContext);
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    error,
    data: cycles,
  } = useQuery({
    queryKey: ["getCycleParent"],
    queryFn: () => getCycleParent(whse),
  });

  const cycle_names: string[] = [];
  const cycle_dates: string[] = [];
  const cycle_keys: number[] = [];
  for (let i = 0; i < cycles?.length; i++) {
    cycle_names.push(cycles[i].name);
    cycle_dates.push(cycles[i].date);
    cycle_keys.push(cycles[i].cycle_id);
  }

  // Setup Yup Form Schema
  const schema = yup.object().shape({
    cycle: yup.string().required("*Cycle Selection is Required"),
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
    // ** MISSING ** send selected cycle count to database
    setCycle(data.cycle);
    navigate("/CycleCount");
  };

  const handleSelectItem = (element: string) => {
    console.log(`Selected Element: ${element}`);
    setValue("cycle", element);
  };

  const handleClick = (label: string) => {
    console.log(`Button: ${label} clicked`);
  };

  // Shows loading/error screen until query is returned successfully
  if (isLoading) {
    return <p>Fetching Data From Database...</p>;
  } else if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="md-4">Select Cycle Count Below:</h2>
      <text className="ms-3 text-danger fst-italic">
        {errors.cycle?.message}
      </text>
      <Table2Col
        names={cycle_names}
        dates={cycle_dates}
        heading1="Cycle Count ID"
        heading2="Cycle Date"
        onSelectItem={handleSelectItem}
      />
      {cycles.length === 0 && <p>No Items Found</p>}
      <input type="hidden" defaultValue={cycle} {...register("cycle")} />
      <ButtonGroup label="Next" type="submit" onClick={handleClick} />
    </form>
  );
}

export default SelectCycle;
