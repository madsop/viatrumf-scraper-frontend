import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Nettbutikker from "./Nettbutikker.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Nettbutikker />
  </StrictMode>,
);
