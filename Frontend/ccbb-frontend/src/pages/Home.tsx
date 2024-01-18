import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getWarehouses } from "../api/warehousesApi";

function Home() {
  // Check if the service has been configured yet
  // ** MISSING ** Check database for IS_CONFIGURED
  const {
    isLoading,
    isError,
    error,
    data: warehouses,
  } = useQuery({
    queryKey: ["getWarehouseListStartup"],
    queryFn: () => getWarehouses(),
  });

  if (isLoading) {
    return <h1>Fetching Data From Database...</h1>;
  } else if (isError) {
    return <p>{error.message}</p>;
  } else {
    let IS_CONFIGURED: boolean = warehouses?.length > 1 ? true : false;

    if (IS_CONFIGURED) {
      return <Navigate to="/SelectWarehouse" replace />;
    } else {
      return <Navigate to="/Setup" replace />;
    }
  }
}
export default Home;
