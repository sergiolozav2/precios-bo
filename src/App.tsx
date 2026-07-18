import { Outlet } from "react-router-dom";
import "./App.css";
import { AppLayout } from "./components/AppLayout";

function App() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export default App;
