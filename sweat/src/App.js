import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetail";
import Recipe from "./pages/Recipe";
import Workout from "./pages/Workout";
import store from "./store/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    // <Box width="400px" sx={{ width: { xl: "1488px" } }} m="auto">
    <Provider store={store}>
      <Box width="400px" sx={{ width: { xl: "1488px" } }} m="auto">
        <Navbar />
      </Box>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
      <Footer />
    </Provider>
    // </Box>
  );
};

export default App;
