import ButtonGroup from "./ButtonGroup";
import { useContext, useState } from "react";
import { AppContext } from "../App";

interface Props {
  type: "present" | "system";
}

interface Part {
  part_number: string;
  qty: number;
}

function PartListGroup({ type }: Props) {
  const { presentPartList, setPresentPartList } = useContext(AppContext);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  let part_list: Part[];

  const handleAddPart = () => {
    /**
     * Handles the "Add Part" event
     *
     * @remarks
     * Adds a blank part to the partList context variable
     */
    part_list = presentPartList;
    part_list.push({ part_number: "", qty: 0 });
    setPresentPartList([...part_list]);
    console.log(part_list);
  };

  const handleEditPartNumber = (value: string, index: number) => {
    part_list = presentPartList;
    part_list[index].part_number = value;
    setPresentPartList([...part_list]);
    console.log(presentPartList);
  };

  const handleEditPartQty = (value: number, index: number) => {
    part_list = presentPartList;
    part_list[index].qty = value;
    setPresentPartList([...part_list]);
    console.log(presentPartList);
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
    part_list = presentPartList;
    part_list.splice(index, 1);
    setPresentPartList([...part_list]);
    console.log(presentPartList);
  };

  // Rendered Page
  return (
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
          {presentPartList.map((part_number, index) => (
            <tr
              className={
                selectedIndex === index
                  ? "table-active"
                  : "table-active table-light bg-white"
              }
            >
              <th scope="row">{index + 1}</th>
              <td>
                <input
                  defaultValue={presentPartList[index].part_number}
                  type="text"
                  className="form-control me-3"
                  onBlur={(e) => handleEditPartNumber(e.target.value, index)}
                />
              </td>
              <td>
                <div className="d-flex justify-content-between">
                  <input
                    defaultValue={presentPartList[index].qty}
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
    </>
  );
}

export default PartListGroup;
