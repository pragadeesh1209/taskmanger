import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import './index.css';


export default function App() {
  const [page, setPage] = useState("signup"); 

  return (
    <div>
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "login" && <Login setPage={setPage} />}
      {page === "dashboard" && <Dashboard setPage={setPage} />}
    </div>
  );
}
