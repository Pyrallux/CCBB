import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Table2Col from "../components/Table2Col";
import ButtonGroup from "../components/ButtonGroup";

interface cycleStructure {
  [id: string]: string;
}

interface Data {
  cycle: string;
}

function SelectCycle() {
  const { whse, cycle, setCycle } = useContext(AppContext);
  const navigate = useNavigate();

  // ** MISSING ** Pull cycle list from database using whse context
  const cycleList: cycleStructure = { Cycle1: "2/1/24", Cycle2: "2/6/24" };

  // Setup Yup Form Schema
  const schema = yup.object().shape({
    cycle: yup.string().required("*Cycle Selection is Required"),
  });

  // Setup React-Hook-Form Structure
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Data) => {
    console.log(data);
    // ** MISSING ** send selected cycle count to database
    setCycle(data.cycle);
    navigate("/CycleCount");
  };

  const handleSelectItem = (element: string) => {
    console.log(`Selected Element: ${element}`);
    setValue("cycle", element);
  };

  const handleClick = (label: string) => {
    console.log(`Button: ${label} clicked`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="md-4">Select Cycle Count Below:</h2>
      <text className="ms-3 text-danger fst-italic">
        {errors.cycle?.message}
      </text>
      <Table2Col
        data={cycleList}
        heading1="Cycle Count ID"
        heading2="Cycle Date"
        onSelectItem={handleSelectItem}
      />
      <input type="hidden" defaultValue={cycle} {...register("cycle")} />
      <ButtonGroup label="Next" type="submit" onClick={handleClick} />
    </form>
  );
}

export default SelectCycle;
