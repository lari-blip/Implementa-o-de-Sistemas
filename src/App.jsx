import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pessoas from "./pages/Pessoas";
import Transacoes from "./pages/Transacoes";
import Totais from "./pages/Totais";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pessoas" element={<Pessoas />} />
        <Route path="/transacoes" element={<Transacoes />} />
        <Route path="/totais" element={<Totais />} />
      </Routes>
    </Router>
  );
}

export default App;

// Dependências necessárias:
// npm install react-router-dom
