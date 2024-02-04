import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Setup from "./pages/Setup";
import SelectWarehouse from "./pages/SelectWarehouse";
import AddWarehouse from "./pages/AddWarehouse";
import EditWarehouse from "./pages/EditWarehouse";
import Home from "./pages/Home";
import SelectCycle from "./pages/SelectCycle";
import AddCycle from "./pages/AddCycle";
import EditCycle from "./pages/EditCycle";
import Transactions from "./pages/Transactions";
import CycleCount from "./pages/CycleCount";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Part {
  part_number: string;
  qty: number;
}

export const AppContext = createContext<{
  whse: number;
  setWhse: (newValue: number) => void;
  cycle: number;
  setCycle: (newValue: number) => void;
  bin: number;
  setBin: (newValue: number) => void;
  binList: string[];
  setBinList: (newValue: string[]) => void;
  binAdded: boolean;
  setBinAdded: (newValue: boolean) => void;
  manual: boolean;
  setManual: (newValue: boolean) => void;
  presentPartList: Part[];
  setPresentPartList: (newValue: Part[]) => void;
  systemPartList: Part[];
  setSystemPartList: (newValue: Part[]) => void;
}>({
  whse: -1,
  setWhse: () => undefined,
  cycle: -1,
  setCycle: () => undefined,
  bin: -1,
  setBin: () => undefined,
  binList: [""],
  setBinList: () => undefined,
  binAdded: false,
  setBinAdded: () => undefined,
  manual: false,
  setManual: () => undefined,
  presentPartList: [{ part_number: "", qty: 0 }],
  setPresentPartList: () => undefined,
  systemPartList: [{ part_number: "", qty: 0 }],
  setSystemPartList: () => undefined,
});

function App() {
  const client = new QueryClient();

  const [whse, setWhse] = useState(-1);
  const [cycle, setCycle] = useState(-1);
  const [bin, setBin] = useState(-1);
  const [binList, setBinList] = useState([""]);
  const [binAdded, setBinAdded] = useState(false);
  const [manual, setManual] = useState(false);
  const [presentPartList, setPresentPartList] = useState([
    { part_number: "", qty: 0 },
  ]);
  const [systemPartList, setSystemPartList] = useState([
    { part_number: "", qty: 0 },
  ]);

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <AppContext.Provider
          value={{
            whse,
            setWhse,
            cycle,
            setCycle,
            bin,
            setBin,
            binList,
            setBinList,
            binAdded,
            setBinAdded,
            manual,
            setManual,
            presentPartList,
            setPresentPartList,
            systemPartList,
            setSystemPartList,
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
              <Route path="/EditCycle" element={<EditCycle />} />
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
