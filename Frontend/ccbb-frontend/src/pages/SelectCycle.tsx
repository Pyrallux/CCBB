import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Table2Col from "../components/Table2Col";
import ButtonGroup from "../components/ButtonGroup";
import { getCycleParent } from "../api/cyclesApi";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { addBin } from "../api/binsApi";

interface Data {
  cycle: number;
}

function SelectCycle() {
  const queryClient = useQueryClient();
  const {
    whse,
    cycle,
    manual,
    setCycle,
    binList,
    setBinList,
    binAdded,
    setBinAdded,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [cycleNames, setCycleNames] = useState(["Loading..."]);
  const [cycleDates, setCycleDates] = useState(["Loading..."]);
  const [cycleKeys, setCycleKeys] = useState([0]);
  const [selected, setSelected] = useState(false);

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

  // Defines mutation functions of bin api
  const addBinMutation = useMutation({
    mutationFn: addBin,
    onSuccess: () => {
      console.log("Bin successsfully added");
    },
  });

  // Setup Yup Form Schema
  const schema = yup.object().shape({
    cycle: yup
      .number()
      .min(0, "*Cycle Selection is Required")
      .required("*Cycle Selection is Required"),
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
    setSelected(true);
    setValue("cycle", index);
  };

  const handleClickEdit = (index: number) => {
    setCycle(cycleKeys[index]);
    navigate("/EditCycle");
  };

  const handleClick = (label: string) => {
    console.log(`Button: ${label} clicked`);
    if (label == "Back") {
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

  useEffect(() => {
    if (binAdded == true && cycleKeys.length > 1) {
      console.log("Trying to add bin");
      console.log(binAdded);
      console.log(cycleKeys);
      console.log(binList);
      console.log(cycleKeys[cycleKeys.length - 1]);
      binList.map((bin) =>
        addBinMutation.mutate({
          name: bin,
          cycle_id: cycleKeys[cycleKeys.length - 1],
        })
      );
      setBinAdded(false);
      setBinList([""]);
    }
  }, [binAdded, cycleKeys]);

  // Shows loading/error screen until query is returned successfully
  if (isLoading) {
    return <p>Fetching Data From Database...</p>;
  } else if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="md-4">Select Cycle Count Below:</h2>
      <p className="ms-3 text-danger fst-italic">{errors.cycle?.message}</p>
      <Table2Col
        names={cycleNames}
        dates={cycleDates}
        heading1="Cycle Count ID"
        heading2="Cycle Date"
        onSelectItem={handleSelectItem}
        onClickEdit={handleClickEdit}
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
      <ButtonGroup label="Back" onClick={handleClick} />
      {selected ? (
        <ButtonGroup label="Continue" type="submit" onClick={handleClick} />
      ) : (
        <ButtonGroup
          label="Continue"
          type="submit"
          disabled={true}
          onClick={handleClick}
        />
      )}
    </form>
  );
}

export default SelectCycle;
