import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Verificacao from "../pages/Verificacao";
import Home from "../pages/Home";

import ProtectedRoute from "./ProtectedRoute";
import AuthGate from "../pages/AuthGate";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthGate />} />

        <Route path="/login" element={<Login />} />

<Route path="/verificacao" element={<Verificacao />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["aluno", "lider", "funcionario"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}