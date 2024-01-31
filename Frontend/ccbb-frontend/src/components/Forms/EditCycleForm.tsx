import { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonGroup from "../ButtonGroup";
import BinListGroup from "../BinListGroup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCycleDetail, updateCycle, deleteCycle } from "../../api/cyclesApi";
import { getBinParent, deleteBin, addBin } from "../../api/binsApi";
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
  const { cycle, whse, binList, setBinList } = useContext(AppContext);

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

  const deleteCycleMutation = useMutation({
    mutationFn: deleteCycle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["editCycle"] });
    },
  });

  const updateCycleMutation = useMutation({
    mutationFn: updateCycle,
    onSuccess: () => {
      console.log(binList);
      for (let i = 0; i < binData?.length; i++) {
        deleteBinMutation.mutate(binData[i].bin_id);
      }
      binList.map((bin) =>
        addBinMutation.mutate({
          name: bin,
          cycle_id: cycle,
        })
      );
      // queryClient.invalidateQueries({ queryKey: ["editCycle"] });
      navigate("/SelectCycle");
    },
  });

  const addBinMutation = useMutation({
    mutationFn: addBin,
    onSuccess: () => {
      console.log("Bin Added");
    },
  });

  const deleteBinMutation = useMutation({
    mutationFn: deleteBin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["editCycleBins"] });
    },
  });

  const cycleId = cycleData?.cycle_id;
  const { data: binData } = useQuery({
    queryKey: ["editCycleBins"],
    queryFn: () => getBinParent(cycleId),
    enabled: !!cycleId,
  });

  const navigate = useNavigate();

  // Setup yup form structure and initialize form hook
  const schema = yup.object().shape({
    name: yup.string().required("*Cycle Name is Required"),
    date: yup.date().required("*Cycle Date is Required"),
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
    updateCycleMutation.mutate({
      cycle_id: cycle,
      name: data.name,
      date: format(data.date, "yyyy-MM-dd"),
      warehouse_id: whse,
    });
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

  useEffect(() => {
    let bin_names: string[] = [];
    for (let i = 0; i < binData?.length; i++) {
      bin_names.push(binData[i].name);
    }
    setBinList(bin_names);
  }, [binData]);

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
