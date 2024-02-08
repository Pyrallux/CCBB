import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import CountForm from "../components/Forms/CountForm";
import ButtonGroup from "../components/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getBinParent } from "../api/binsApi";
import {
  getPresentPartParent,
  addPresentPart,
  deletePresentPart,
} from "../api/presentPartsApi";
import {
  getSystemPartParent,
  addSystemPart,
  deleteSystemPart,
} from "../api/systemPartsApi";

interface Part {
  part_number: string;
  qty: number;
}

function CycleCount() {
  // ** MISSING ** Pull data from database, display cycle count gui, cycle count logic??
  const {
    whse,
    cycle,
    bin,
    setBin,
    binList,
    setBinList,
    manual,
    presentPartList,
    setPresentPartList,
    systemPartList,
    setSystemPartList,
  } = useContext(AppContext);
  const [binIndex, setBinIndex] = useState(0);
  const [binListIds, setBinListIds] = useState([-1]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // README: For future Nate - Implement state management using the current bin
  // querying the present and system parts with parent of said bin

  const {
    isLoading,
    isError,
    error,
    data: binData,
  } = useQuery({
    queryKey: ["cycleCountBins"],
    queryFn: () => getBinParent(cycle),
  });

  // BIN INDEX NEEDS TO BE LOADED DIFFERENTLY HERE
  const { data: presentPartData } = useQuery({
    queryKey: ["cycleCountPresentParts"],
    queryFn: () => getPresentPartParent(bin),
    enabled: !!bin,
  });

  const { data: systemPartData } = useQuery({
    queryKey: ["cycleCountSystemParts"],
    queryFn: () => getSystemPartParent(bin),
    enabled: !!(bin && manual),
  });

  const addPresentPartMutation = useMutation({
    mutationFn: addPresentPart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cycleCountPresentParts"] });
    },
  });

  const deletePresentPartMutation = useMutation({
    mutationFn: deletePresentPart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cycleCountPresentParts"] });
    },
  });

  useEffect(() => {
    let bin_names: string[] = [];
    let bin_ids: number[] = [];
    for (let i = 0; i < binData?.length; i++) {
      bin_names.push(binData[i].name);
      bin_ids.push(binData[i].bin_id);
    }
    setBinList(bin_names);
    setBinListIds(bin_ids);
    setBin(bin_ids[binIndex]);
    console.log("CYCLE:", cycle);
    console.log("BINS ARE:", bin_names);
    console.log("BIN IDS ARE", bin_ids);
    console.log("Current Bin is:", bin);
  }, [binData]);

  useEffect(() => {
    let present_part_list: Part[] = [];
    for (let i = 0; i < presentPartData?.length; i++) {
      present_part_list.push({
        part_number: presentPartData[i].number,
        qty: presentPartData[i].quantity,
      });
    }
    setPresentPartList(present_part_list);
  }, [presentPartData]);

  useEffect(() => {
    let system_part_list: Part[] = [];
    for (let i = 0; i < systemPartData?.length; i++) {
      system_part_list.push({
        part_number: systemPartData[i].number,
        qty: systemPartData[i].quantity,
      });
    }
    setSystemPartList(system_part_list);
  }, [systemPartData]);

  const handleClick = (label: string) => {
    if (label == "Continue") {
      if (binIndex < binList.length - 1) {
        setBin(binListIds[binIndex + 1]);
        setBinIndex(binIndex + 1);
        console.log("Updated Bin to:", bin);
        for (let i = 0; i < presentPartData?.length; i++) {
          deletePresentPartMutation.mutate(binListIds[i]);
        }
        for (let i = 0; i < presentPartList.length; i++) {
          addPresentPartMutation.mutate({
            number: presentPartList[i].part_number,
            quantity: presentPartList[i].qty,
            bin_id: bin,
          });
        }
      } else {
        navigate("/Transactions");
      }
    } else if (label == "Back") {
      navigate("/SelectCycle");
    }
  };

  // Shows loading/error screen until query is returned successfully
  if (isLoading) {
    return <p>Fetching Data From Database...</p>;
  } else if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <p>{bin}</p>
      <h1>Under Construction Cycle Count</h1>
      <h2>Warehouse: {whse}</h2>
      <h2>Cycle: {cycle}</h2>
      <h2>Bin: {binList[binIndex]}</h2>
      <CountForm />
      <ButtonGroup label="Back" onClick={handleClick} />
      <ButtonGroup label="Continue" onClick={handleClick} />
    </>
  );
}
export default CycleCount;
