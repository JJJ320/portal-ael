import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Verificacao from "../pages/Verificacao";
import Home from "../pages/Home";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* rota padrão */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* login público */}
        <Route path="/login" element={<Login />} />

        {/* verificação (precisa estar logado) */}
        <Route
          path="/verificacao"
          element={
            <ProtectedRoute>
              <Verificacao />
            </ProtectedRoute>
          }
        />

        {/* home (precisa login + cargo válido) */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["aluno", "lider", "funcionario"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* fallback (qualquer rota inválida volta pro login) */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}