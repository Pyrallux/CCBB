import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonGroup from "../components/ButtonGroup";

function Setup() {
  const navigate = useNavigate();

  // Setup form structure
  const schema = yup.object().shape({
    whseName: yup.string().required("*Warehouse Nickname is Required"),
    whseDB: yup.string().required("*Database Path is Required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: object) => {
    // ** MISSING ** send submitted warehouse data to database
    console.log(data);
    navigate("/SelectWarehouse");
  };

  const handleClick = (label: string) => {
    console.log(`Button: ${label} clicked`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Enter Initial Warehouse Setup Info Below:</h2>
      <label className="form-label">Warehouse Nickname</label>
      <text className="ms-3 text-danger fst-italic">
        {errors.whseName?.message}
      </text>
      <input type="text" className="form-control" {...register("whseName")} />
      <label className="form-label">Warehouse Database Path</label>
      <text className="ms-3 text-danger fst-italic">
        {errors.whseDB?.message}
      </text>
      <input type="text" className="form-control" {...register("whseDB")} />
      <ButtonGroup label="Done" type="submit" onClick={handleClick} />
    </form>
  );
}

export default Setup;
