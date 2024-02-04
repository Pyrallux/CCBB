import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import CountForm from "../components/Forms/CountForm";
import ButtonGroup from "../components/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getBinParent } from "../api/binsApi";
import { getPresentParts } from "../api/presentPartsApi";
import { getSystemParts } from "../api/systemPartsApi";

function CycleCount() {
  // ** MISSING ** Pull data from database, display cycle count gui, cycle count logic??
  const { whse, cycle, bin, setBin, binList, setBinList } =
    useContext(AppContext);
  const [binIndex, setBinIndex] = useState(0);
  const [binListId, setBinListIds] = useState([-1]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // const updateWarehouseMutation = useMutation({
  //   mutationFn: updateWarehouse,
  //   onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["editCycleBins"] });
  //   },
  // });

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

  useEffect(() => {
    let bin_names: string[] = [];
    let bin_ids: number[] = [];
    for (let i = 0; i < binData?.length; i++) {
      bin_names.push(binData[i].name);
      bin_ids.push(binData[i].bin_id);
    }
    setBinList(bin_names);
    setBinListIds(bin_ids);
    console.log("CYCLE:", cycle);
    console.log("BINS ARE:", bin_names);
  }, [binData]);

  const handleClick = (label: string) => {
    if (label == "Continue") {
      if (binIndex < binList.length - 1) {
        setBinIndex(binIndex + 1);
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
