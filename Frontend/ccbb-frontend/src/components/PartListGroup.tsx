import ButtonGroup from "./ButtonGroup";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { useQuery } from "@tanstack/react-query";
import { getPresentPartParent } from "../api/presentPartsApi";
import { getSystemPartParent } from "../api/systemPartsApi";

interface Props {
  type: "present" | "system";
}

interface Part {
  part_number: string;
  qty: number;
}

function PartListGroup({ type }: Props) {
  const {
    bin,
    presentPartList,
    setPresentPartList,
    systemPartList,
    setSystemPartList,
    manual,
  } = useContext(AppContext);

  let part_list: Part[];

  const { data: presentPartData, refetch: refetchPresentParts } = useQuery({
    queryKey: ["cycleCountPresentParts"],
    queryFn: () => getPresentPartParent(bin),
    enabled: !!(bin > -1),
  });

  const { data: systemPartData, refetch: refetchSystemParts } = useQuery({
    queryKey: ["cycleCountSystemParts"],
    queryFn: () => getSystemPartParent(bin),
    enabled: !!(bin > -1 && manual),
  });

  useEffect(() => {
    let present_part_list: Part[] = [];
    for (let i = 0; i < presentPartData?.length; i++) {
      present_part_list.push({
        part_number: presentPartData[i].number,
        qty: presentPartData[i].quantity,
      });
    }
    setPresentPartList([...present_part_list]);
    console.log("Present part data updated.");
  }, [presentPartData]);

  useEffect(() => {
    let system_part_list: Part[] = [];
    for (let i = 0; i < systemPartData?.length; i++) {
      system_part_list.push({
        part_number: systemPartData[i].number,
        qty: systemPartData[i].quantity,
      });
    }
    setSystemPartList([...system_part_list]);
  }, [systemPartData]);

  const handleAddPart = () => {
    /**
     * Handles the "Add Part" event
     *
     * @remarks
     * Adds a blank part to the partList context variable
     */
    if (type == "present") {
      part_list = presentPartList;
      part_list.push({ part_number: "", qty: 0 });
      setPresentPartList([...part_list]);
    } else if (type == "system") {
      part_list = systemPartList;
      part_list.push({ part_number: "", qty: 0 });
      setSystemPartList([...part_list]);
    }
  };

  const handleEditPartNumber = (value: string, index: number) => {
    /**
     * Handles the "Add Part Number" event
     *
     * @remarks
     * Edits the part number with the value given at the index given
     *
     * @param value - New value to replace the old part_number attribute
     * @param index - Index of the part object to be edited.
     */
    if (type == "present") {
      part_list = presentPartList;
      part_list[index].part_number = value;
      setPresentPartList([...part_list]);
    } else if (type == "system") {
      part_list = systemPartList;
      part_list[index].part_number = value;
      setSystemPartList([...part_list]);
    }
  };

  const handleEditPartQty = (value: number, index: number) => {
    /**
     * Handles the "Add Part Number" event
     *
     * @remarks
     * Edits the part number with the value given at the index given
     *
     * @param value - New value to replace the old part_number attribute
     * @param index - Index of the part object to be edited.
     */
    if (type == "present") {
      part_list = presentPartList;
      part_list[index].qty = value;
      setPresentPartList([...part_list]);
    } else if (type == "system") {
      part_list = systemPartList;
      part_list[index].qty = value;
      setSystemPartList([...part_list]);
    }
  };

  const handleClickDelete = (index: number) => {
    /**
     * Handles the "Click Delete" event
     *
     * @remarks
     * Splices onve value from the partList context variable
     * at the location given by the index.
     *
     * @param index - index of the part to be deleted
     */
    if (type == "present") {
      part_list = presentPartList;
      part_list.splice(index, 1);
      setPresentPartList([...part_list]);
    } else if (type == "system") {
      part_list = systemPartList;
      part_list.splice(index, 1);
      setSystemPartList([...part_list]);
    }
  };

  // Rendered Page
  return (
    <>
      {type == "present" ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Part Number</th>
                <th scope="col">QTY</th>
              </tr>
            </thead>
            {presentPartList.length === 0 && (
              <p className="text text-danger fst-italic">No Parts Found!</p>
            )}

            <tbody>
              {presentPartList.map((part, index) => (
                <tr className={"table-active table-light bg-white"}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <input
                      defaultValue={part.part_number}
                      type="text"
                      className="form-control me-3"
                      onBlur={(e) =>
                        handleEditPartNumber(e.target.value, index)
                      }
                    />
                  </td>
                  <td>
                    <div className="d-flex justify-content-between">
                      <input
                        defaultValue={part.qty}
                        type="number"
                        className="form-control me-3"
                        onBlur={(e) =>
                          handleEditPartQty(Number(e.target.value), index)
                        }
                      />
                      <button
                        className="btn btn-danger"
                        onClick={() => handleClickDelete(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ButtonGroup
            label="+ Add New Bin"
            style="outline-secondary"
            margin={false}
            onClick={handleAddPart}
          />
        </>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Part Number</th>
                <th scope="col">QTY</th>
              </tr>
            </thead>
            {systemPartList.length === 0 && (
              <p className="text text-danger fst-italic">No Parts Found!</p>
            )}

            <tbody>
              {systemPartList.map((part, index) => (
                <tr className={"table-active table-light bg-white"}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <input
                      defaultValue={part.part_number}
                      type="text"
                      className="form-control me-3"
                      onBlur={(e) =>
                        handleEditPartNumber(e.target.value, index)
                      }
                    />
                  </td>
                  <td>
                    <div className="d-flex justify-content-between">
                      <input
                        defaultValue={part.qty}
                        type="number"
                        className="form-control me-3"
                        onBlur={(e) =>
                          handleEditPartQty(Number(e.target.value), index)
                        }
                      />
                      <button
                        className="btn btn-danger"
                        onClick={() => handleClickDelete(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ButtonGroup
            label="+ Add New Bin"
            style="outline-secondary"
            margin={false}
            onClick={handleAddPart}
          />
        </>
      )}
    </>
  );
}

export default PartListGroup;
