import React from "react";
import External from "./components/External";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import Trusted from "./components/Trusted";
// import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Hero />
      <Stats />
      <External />
      <Trusted />
      <Footer />
    </div>
  );
}

export default App;
