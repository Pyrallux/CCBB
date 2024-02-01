import { AppContext } from "../../App";
import PartListGroup from "../PartListGroup";
import { useContext } from "react";

function CountForm() {
  const { manual } = useContext(AppContext);
  return (
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
  );
}

export default CountForm;
