import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import PrivateRoute from "./middlewares/PrivateRoute";
import PublicRoute from "./middlewares/PublicRoute";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/user/edit/:userId" element={<EditUser />} />
      </Route>
    </Routes>
  );
}

export default App;
