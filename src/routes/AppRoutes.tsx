import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Game from "../pages/Game";
import Config from "../pages/Config";
import Results from "../pages/Results";
import Scores from "../pages/Scores";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/config" element={<Config />} />
      <Route path="/results" element={<Results />} />
      <Route path="/scores" element={<Scores />} />
    </Routes>
  </BrowserRouter>
);
