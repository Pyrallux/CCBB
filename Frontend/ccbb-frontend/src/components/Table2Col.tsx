import { useState } from "react";

interface Dictionary {
  [id: string]: string;
}

interface Props {
  data: Dictionary;
  heading1: string;
  heading2: string;
  onSelectItem: (label: string) => void;
}

function Table2Col({ data, heading1, heading2, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const keys: string[] = Object.keys(data);

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
        {keys.map((key, index) => (
          <tr
            className={selectedIndex === index ? "table-active" : "table"}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(key);
            }}
          >
            <th scope="row">{index + 1}</th>
            <td>{key}</td>
            <td>{data[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table2Col;
