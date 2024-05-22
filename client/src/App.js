import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { SidebarProvider } from "./ContextApi/SidebarContext";
import AdminRoute from "./RouterFile/AdminRoute";
import ClientRouter from "./RouterFile/ClientRouter";

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
        <Route path="/*" element={<ClientRouter />} />
          <Route path="/admin/*" element={<AdminRoute />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
