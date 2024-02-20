import { useState } from "react";

interface Props {
  row1Data: string[];
  row2Data: string[];
  row3Data: string[];
  row4Data: string[];
  heading1: string;
  heading2: string;
  heading3: string;
  heading4: string;
  onSelectItem: (index: number) => void;
}

function Table2Col({
  row1Data,
  row2Data,
  row3Data,
  row4Data,
  heading1,
  heading2,
  heading3,
  heading4,
  onSelectItem,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">{heading1}</th>
          <th scope="col">{heading2}</th>
          <th scope="col">{heading3}</th>
          <th scope="col">{heading4}</th>
        </tr>
      </thead>
      <tbody>
        {row1Data.map((row1Item, index) => (
          <tr
            className={
              selectedIndex === index
                ? "table-active"
                : "table-active table-light bg-white"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(index);
            }}
          >
            <th scope="row">{index + 1}</th>
            <td>{row1Item}</td>
            <td>{row2Data[index]}</td>
            <td>{row3Data[index]}</td>
            <td>{row4Data[index]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table2Col;
