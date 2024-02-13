import PartListGroup from "../PartListGroup";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../App";
import ButtonGroup from "../ButtonGroup";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getBinParent } from "../../api/binsApi";
import {
  getPresentPartParent,
  addPresentPart,
  deletePresentPart,
} from "../../api/presentPartsApi";
import {
  getSystemPartParent,
  addSystemPart,
  deleteSystemPart,
} from "../../api/systemPartsApi";

interface Part {
  part_number: string;
  qty: number;
}

function CountForm() {
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

  const {
    isLoading,
    isError,
    error,
    data: binData,
  } = useQuery({
    queryKey: ["cycleCountBins"],
    queryFn: () => getBinParent(cycle),
  });

  const { data: presentPartData, refetch } = useQuery({
    queryKey: ["cycleCountPresentParts"],
    queryFn: () => getPresentPartParent(bin),
    enabled: !!(bin > -1),
    refetchInterval: 1500,
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["cycleCountPresentParts"],
    });
    setTimeout(() => {
      refetch;
      let present_part_list: Part[] = [];
      for (let i = 0; i < presentPartData?.length; i++) {
        present_part_list.push({
          part_number: presentPartData[i].number,
          qty: presentPartData[i].quantity,
        });
      }
      setPresentPartList([...present_part_list]);
      console.log("Present part data updated.");
    }, 750);
  }, [presentPartData, bin]);

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
  }, [binData]);

  useEffect(() => {
    setBin(binListIds[binIndex]);
    console.log("Updated Bin to:", bin);
  }, [binIndex]);
  const handleClick = (label: string) => {
    if (label == "Continue") {
      if (binIndex < binList.length - 1) {
        for (let i = 0; i < presentPartData?.length; i++) {
          deletePresentPartMutation.mutate(presentPartData[i].present_part_id);
        }
        for (let i = 0; i < presentPartList.length; i++) {
          addPresentPartMutation.mutate({
            number: presentPartList[i].part_number,
            quantity: presentPartList[i].qty,
            bin_id: bin,
          });
        }
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
      <h1>
        <b>Enter Details for Bin: {binList[binIndex]}</b>
        {bin}
      </h1>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>
              <u>Enter Parts Present:</u>
            </h2>
            <PartListGroup type="present" />
          </div>
          {manual == true && (
            <div className="col">
              <h2>
                <u>Enter Parts in ERP System:</u>
              </h2>
              <PartListGroup type="system" />
            </div>
          )}
        </div>
      </div>
      <ButtonGroup label="Back" onClick={handleClick} />
      <ButtonGroup label="Continue" onClick={handleClick} />
    </>
  );
}

export default CountForm;
