import { Navigate } from "react-router-dom";

function Home() {
  // Check if the service has been configured yet
  // ** MISSING ** Check database for IS_CONFIGURED
  let IS_CONFIGURED: boolean = false;

  // Return setup menu if service is not configured
  if (IS_CONFIGURED) {
    return <Navigate to="/SelectWarehouse" replace />;
  } else {
    return <Navigate to="/Setup" replace />;
  }
}
export default Home;
