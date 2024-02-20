import WarehouseSetupForm from "../../components/Forms/WarehouseSetupForm";

function AddWarehouse() {
  return (
    <>
      <h2>Enter New Warehouse Setup Info Below:</h2>
      <WarehouseSetupForm type="Add" />
    </>
  );
}

export default AddWarehouse;
