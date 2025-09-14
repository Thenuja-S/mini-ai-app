import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Requirement from "./pages/Requirement";
import GeneratedUI from "./pages/GeneratedUI";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/requirement" />} />
        <Route path="requirement" element={<Requirement />} />
        <Route path="generated" element={<GeneratedUI />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
