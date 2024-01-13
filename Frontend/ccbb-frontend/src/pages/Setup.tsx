import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonGroup from "../components/ButtonGroup";

interface Data {
  whseName: string;
  whseDB?: string | undefined;
  manual?: boolean | undefined;
}

function Setup() {
  const { manual, setManual } = useContext(AppContext);
  const navigate = useNavigate();

  // Setup form structure
  const schema = yup.object().shape({
    whseName: yup.string().required("*Warehouse Nickname is Required"),
    manual: yup.boolean(),
    whseDB: yup.string().when("manual", ([manual], schema) => {
      return !manual
        ? yup.string().required("*Warehouse Path is Required")
        : schema;
    }),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: Data) => {
    // ** MISSING ** send submitted warehouse data to database
    console.log(data);
    navigate("/SelectWarehouse");
  };

  const handleClick = (label: string) => {
    console.log(`Button: ${label} clicked`);
  };

  const handleChange = () => {
    setManual(!manual);
    setValue("whseDB", undefined);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Enter Initial Warehouse Setup Info Below:</h2>
      <label className="form-label">Warehouse Nickname</label>
      <text className="ms-3 text-danger fst-italic">
        {errors.whseName?.message}
      </text>
      <input type="text" className="form-control" {...register("whseName")} />
      {manual == false && (
        <>
          <label className="form-label">Warehouse Database Path</label>
          <text className="ms-3 text-danger fst-italic">
            {errors.whseDB?.message}
          </text>
          <input type="text" className="form-control" {...register("whseDB")} />
        </>
      )}
      <div>
        <input
          type="checkbox"
          checked={manual}
          {...register("manual")}
          onChange={handleChange}
        />
        <text className="ms-2">Enable Manual Mode?</text>
      </div>
      <ButtonGroup label="Done" type="submit" onClick={handleClick} />
    </form>
  );
}

export default Setup;
