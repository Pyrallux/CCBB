import { useState } from "react";

interface Props {
  names: string[];
  dates: string[];
  heading1: string;
  heading2: string;
  onSelectItem: (label: string) => void;
}

function Table2Col({ names, dates, heading1, heading2, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">{heading1}</th>
          <th scope="col">{heading2}</th>
        </tr>
      </thead>
      <tbody>
        {names.map((name, index) => (
          <tr
            className={selectedIndex === index ? "table-active" : "table"}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(name);
            }}
          >
            <th scope="row">{index + 1}</th>
            <td>{name}</td>
            <td>{dates[index]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table2Col;
