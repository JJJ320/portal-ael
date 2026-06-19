import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Verificacao from "../pages/Verificacao";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/verificacao"
          element={
            <ProtectedRoute>
              <Verificacao />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}