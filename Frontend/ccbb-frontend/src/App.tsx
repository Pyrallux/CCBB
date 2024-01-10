import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Setup from "./pages/Setup";
import SelectWarehouse from "./pages/SelectWarehouse";
import AddWarehouse from "./pages/AddWarehouse";
import Home from "./pages/Home";
import SelectCycle from "./pages/SelectCycle";
import CycleCount from "./pages/CycleCount";

export const AppContext = createContext<{
  whse: string;
  setWhse: (newValue: string) => void;
  cycle: string;
  setCycle: (newValue: string) => void;
}>({
  whse: "",
  setWhse: () => undefined,
  cycle: "",
  setCycle: () => undefined,
});

function App() {
  const [whse, setWhse] = useState("");
  const [cycle, setCycle] = useState("");

  return (
    <div className="App">
      <AppContext.Provider value={{ whse, setWhse, cycle, setCycle }}>
        <Router>
          <Routes>
            <Route path="/Setup" element={<Setup />} />
            <Route path="/SelectWarehouse" element={<SelectWarehouse />} />
            <Route path="/AddWarehouse" element={<AddWarehouse />} />
            <Route path="/SelectCycle" element={<SelectCycle />} />
            <Route path="/CycleCount" element={<CycleCount />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
