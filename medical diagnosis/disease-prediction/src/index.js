import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
// import Heart from "./components/Heart";
// import Kidney from "./components/Kidney";
// import Diabetes from "./components/Diabetes";
// import BrainTumor from "./components/BrainTumor";
// import Pneumonia from "./components/Pneumonia";
// import AgentChat from "./components/AgentChat";
import HeartPage from "./pages/HeartPage";
import KidneyPage from "./pages/KidneyPage";
import DiabetesPage from "./pages/DiabetesPage";
import BrainPage from "./pages/BrainPage";
import PneumoniaPage from "./pages/PneumoniaPage";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/heart" element={<HeartPage />} />
        <Route path="/kidney" element={<KidneyPage />} />
        <Route path="/diabetes" element={<DiabetesPage />} />
        <Route path="/brain-tumor" element={<BrainPage />} />
        <Route path="/pneumonia" element={<PneumoniaPage />} />
        {/* <Route path="/agent-chat" element={<AgentChat />} /> */}
      </Routes>
    </Router>
  </React.StrictMode>
);
