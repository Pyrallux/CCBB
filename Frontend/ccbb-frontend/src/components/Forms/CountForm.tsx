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
import {
  addSystematicallyMissingPart,
  deleteSystematicallyMissingPart,
  getSystematicallyMissingPartParent,
} from "../../api/systematicallyMissingPartsApi";
import {
  addPhysicallyMissingPart,
  deletePhysicallyMissingPart,
  getPhysicallyMissingPartParent,
} from "../../api/physicallyMissingPartsApi";
import { format } from "date-fns";

interface Part {
  part_number: string;
  qty: number;
}

function CountForm() {
  const {
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

  const { data: presentPartData, refetch: refetchPresentParts } = useQuery({
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
      refetchPresentParts;
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

  const { data: systemPartData, refetch: refetchSystemParts } = useQuery({
    queryKey: ["cycleCountSystemParts"],
    queryFn: () => getSystemPartParent(bin),
    enabled: !!(bin > -1 && manual),
    refetchInterval: 1500,
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["cycleCountSystemParts"],
    });
    setTimeout(() => {
      refetchSystemParts;
      let system_part_list: Part[] = [];
      for (let i = 0; i < systemPartData?.length; i++) {
        system_part_list.push({
          part_number: systemPartData[i].number,
          qty: systemPartData[i].quantity,
        });
      }
      setSystemPartList([...system_part_list]);
      console.log("System part data updated.");
    }, 750);
  }, [systemPartData, bin]);

  const addSystemPartMutation = useMutation({
    mutationFn: addSystemPart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cycleCountSystemParts"] });
    },
  });

  const deleteSystemPartMutation = useMutation({
    mutationFn: deleteSystemPart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cycleCountSystemParts"] });
    },
  });

  const { data: physicallyMissingPartData } = useQuery({
    queryKey: ["physicallyMissingPartsCycleCount"],
    queryFn: () => getPhysicallyMissingPartParent(bin),
    refetchInterval: 10000,
  });

  const addPhysicallyMissingPartMutation = useMutation({
    mutationFn: addPhysicallyMissingPart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["physicallyMissingPartsCycleCount"],
      });
    },
  });

  const deletePhysicallyMissingPartMutation = useMutation({
    mutationFn: deletePhysicallyMissingPart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["physicallyMissingPartsCycleCount"],
      });
    },
  });

  const { data: systematicallyMissingPartData } = useQuery({
    queryKey: ["systematicallyMissingPartsCycleCount"],
    queryFn: () => getSystematicallyMissingPartParent(bin),
    refetchInterval: 10000,
  });

  const addSystematicallyMissingPartMutation = useMutation({
    mutationFn: addSystematicallyMissingPart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["systematicallyMissingPartsCycleCount"],
      });
    },
  });

  const deleteSystematicallyMissingPartMutation = useMutation({
    mutationFn: deleteSystematicallyMissingPart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["systematicallyMissingPartsCycleCount"],
      });
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

  const updateMissingPartLists = (
    presentParts: Part[],
    systemParts: Part[]
  ) => {
    for (let i = 0; i < physicallyMissingPartData?.length; i++) {
      deletePhysicallyMissingPartMutation.mutate(
        physicallyMissingPartData[i].physically_missing_part_id
      );
    }
    for (let i = 0; i < systematicallyMissingPartData?.length; i++) {
      deleteSystematicallyMissingPartMutation.mutate(
        systematicallyMissingPartData[i].systematically_missing_part_id
      );
    }
    let presentPartsNotUsed = presentParts;
    let systemPartsNotUsed = systemParts;
    for (let i = 0; i < presentParts.length; i++) {
      for (let j = 0; j < systemParts.length; j++) {
        if (presentParts[i].part_number == systemParts[i].part_number) {
          let quantity_difference = presentParts[i].qty - systemParts[i].qty;
          if (quantity_difference > 0) {
            addSystematicallyMissingPartMutation.mutate({
              number: presentParts[i].part_number,
              quantity: quantity_difference,
              location: binList[binIndex],
              date: format(new Date(), "yyyy-MM-dd"),
              bin_id: bin,
            });
          } else if (quantity_difference < 0) {
            addPhysicallyMissingPartMutation.mutate({
              number: presentParts[i].part_number,
              quantity: -quantity_difference,
              location: binList[binIndex],
              date: format(new Date(), "yyyy-MM-dd"),
              bin_id: bin,
            });
          }
          presentPartsNotUsed.splice(i, 1);
          systemPartsNotUsed.splice(j, 1);
        }
      }
    }
    for (let i = 0; i < presentPartsNotUsed.length; i++) {
      addSystematicallyMissingPartMutation.mutate({
        number: presentPartsNotUsed[i].part_number,
        quantity: presentPartsNotUsed[i].qty,
        location: binList[binIndex],
        date: format(new Date(), "yyyy-MM-dd"),
        bin_id: bin,
      });
    }
    for (let i = 0; i < systemPartsNotUsed.length; i++) {
      addPhysicallyMissingPartMutation.mutate({
        number: systemPartsNotUsed[i].part_number,
        quantity: systemPartsNotUsed[i].qty,
        location: binList[binIndex],
        date: format(new Date(), "yyyy-MM-dd"),
        bin_id: bin,
      });
    }
  };

  const handleClick = (label: string) => {
    if (label == "Continue") {
      // Update Present Part List
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
      // Update System Part List
      if (manual) {
        for (let i = 0; i < systemPartData?.length; i++) {
          deleteSystemPartMutation.mutate(systemPartData[i].system_part_id);
        }
        for (let i = 0; i < systemPartList.length; i++) {
          addSystemPartMutation.mutate({
            number: systemPartList[i].part_number,
            quantity: systemPartList[i].qty,
            bin_id: bin,
          });
        }
      }
      updateMissingPartLists(presentPartList, systemPartList);
      setBinIndex(binIndex + 1);
      if (!(binIndex < binList.length - 1)) {
        navigate("/InventoryManager");
      }
    } else if (label == "Back") {
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
        if (manual) {
          for (let i = 0; i < systemPartData?.length; i++) {
            deleteSystemPartMutation.mutate(systemPartData[i].system_part_id);
          }
          for (let i = 0; i < systemPartList.length; i++) {
            addSystemPartMutation.mutate({
              number: systemPartList[i].part_number,
              quantity: systemPartList[i].qty,
              bin_id: bin,
            });
          }
        }
        updateMissingPartLists(presentPartList, systemPartList);
        setBinIndex(binIndex - 1);
      }
      if (!(binIndex - 1 >= 0)) {
        navigate("/SelectCycle");
      }
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
