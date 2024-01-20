import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Setup from "./pages/Setup";
import SelectWarehouse from "./pages/SelectWarehouse";
import AddWarehouse from "./pages/AddWarehouse";
import EditWarehouse from "./pages/EditWarehouse";
import Home from "./pages/Home";
import SelectCycle from "./pages/SelectCycle";
import AddCycle from "./pages/AddCycle";
import Transactions from "./pages/Transactions";
import CycleCount from "./pages/CycleCount";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AppContext = createContext<{
  whse: number;
  setWhse: (newValue: number) => void;
  cycle: number;
  setCycle: (newValue: number) => void;
  manual: boolean;
  setManual: (newValue: boolean) => void;
}>({
  whse: 0,
  setWhse: () => undefined,
  cycle: 0,
  setCycle: () => undefined,
  manual: false,
  setManual: () => undefined,
});

function App() {
  const client = new QueryClient();

  const [whse, setWhse] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [manual, setManual] = useState(false);

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <AppContext.Provider
          value={{
            whse,
            setWhse,
            cycle,
            setCycle,
            manual,
            setManual,
          }}
        >
          <Router>
            <Routes>
              <Route path="/Setup" element={<Setup />} />
              <Route path="/SelectWarehouse" element={<SelectWarehouse />} />
              <Route path="/AddWarehouse" element={<AddWarehouse />} />
              <Route path="/EditWarehouse" element={<EditWarehouse />} />
              <Route path="/SelectCycle" element={<SelectCycle />} />
              <Route path="/AddCycle" element={<AddCycle />} />
              <Route path="/Transactions" element={<Transactions />} />
              <Route path="/CycleCount" element={<CycleCount />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Router>
        </AppContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
