import { Routes, Route } from "react-router-dom"; 

// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Feedback from "./components/Feedback";
import Studentlist from "./components/Studentlist";
import Update from "./components/Update";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      {/* <Nav /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/studentlist" element={<Studentlist />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/feedback" element={<ProtectedRoutes> <Feedback />
        </ProtectedRoutes>} />
      </Routes>
    </>
  );
}

export default App;