import ButtonGroup from "./ButtonGroup";
import { useContext } from "react";
import { AppContext } from "../App";

function ListGroup() {
  const { binList, setBinList } = useContext(AppContext);
  let bin_list: string[];

  const handleAddBin = () => {
    bin_list = binList;
    bin_list.push("");
    setBinList([...bin_list]);
    console.log(bin_list);
  };

  const handleEditBin = (value: string, index: number) => {
    bin_list = binList;
    bin_list[index] = value;
    setBinList([...bin_list]);
    console.log(binList);
  };

  const handleClickDelete = (index: number) => {
    bin_list = binList;
    bin_list.splice(index, 1);
    setBinList([...bin_list]);
    console.log(binList);
  };

  return (
    <>
      <ul className="list-group">
        {binList.length === 0 && (
          <li className="list-group-item text-danger fst-italic ">
            No Bins Found
          </li>
        )}

        {binList.map((bin, index) => (
          <li className="list-group-item" key={bin}>
            <div className="d-flex justify-content-between">
              <input
                defaultValue={binList[index]}
                type="text"
                className="form-control me-3"
                onBlur={(e) => handleEditBin(e.target.value, index)}
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
          </li>
        ))}
        <li className="list-group-item">
          <ButtonGroup
            label="+ Add New Bin"
            style="outline-secondary"
            margin={false}
            onClick={handleAddBin}
          />
        </li>
      </ul>
    </>
  );
}

export default ListGroup;
