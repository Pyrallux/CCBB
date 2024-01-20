import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Table2Col from "../components/Table2Col";
import ButtonGroup from "../components/ButtonGroup";
import { getCycleParent } from "../api/cyclesApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Data {
  cycle: number;
}

function SelectCycle() {
  const queryClient = useQueryClient();
  const { whse, cycle, manual, setCycle } = useContext(AppContext);
  const navigate = useNavigate();
  const [cycleNames, setCycleNames] = useState(["Loading..."]);
  const [cycleDates, setCycleDates] = useState(["Loading..."]);
  const [cycleKeys, setCycleKeys] = useState([0]);

  const {
    isLoading,
    isError,
    error,
    refetch,
    data: cycles,
  } = useQuery({
    queryKey: ["getCycleParent"],
    queryFn: () => getCycleParent(whse),
    refetchInterval: 2500,
  });

  // Setup Yup Form Schema
  const schema = yup.object().shape({
    cycle: yup.number().required("*Cycle Selection is Required"),
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

  const handleSelectItem = (index: number) => {
    console.log(`Selected Element: ${index}`);
    setValue("cycle", index);
  };

  const handleClick = (label: string) => {
    console.log(`Button: ${label} clicked`);
    if (label == "Return") {
      navigate("/SelectWarehouse");
    }
    if (label == "+ Add New Cycle") {
      navigate("/AddCycle");
    }
    if (label == "View Transactions") {
      navigate("/Transactions");
    }
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["getCycleParent"] });
    setTimeout(() => {
      refetch;
      const cycle_names: string[] = [];
      const cycle_dates: string[] = [];
      const cycle_keys: number[] = [];
      for (let i = 0; i < cycles?.length; i++) {
        cycle_names.push(cycles[i].name);
        cycle_dates.push(cycles[i].date);
        cycle_keys.push(cycles[i].cycle_id);
      }
      setCycleNames(cycle_names);
      setCycleDates(cycle_dates);
      setCycleKeys(cycle_keys);
    }, 100);
  }, [cycles]);

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
        names={cycleNames}
        dates={cycleDates}
        heading1="Cycle Count ID"
        heading2="Cycle Date"
        onSelectItem={handleSelectItem}
      />
      {cycles.length === 0 && <p>No Items Found</p>}
      <input type="hidden" defaultValue={cycle} {...register("cycle")} />
      {manual === true && (
        <div>
          <ButtonGroup
            label="+ Add New Cycle"
            style="outline-primary"
            onClick={handleClick}
          />
        </div>
      )}
      <div>
        <ButtonGroup
          label="View Transactions"
          style="outline-dark"
          onClick={handleClick}
        />
      </div>
      <ButtonGroup label="Return" onClick={handleClick} />
      <ButtonGroup label="Next" type="submit" onClick={handleClick} />
    </form>
  );
}

export default SelectCycle;
