import React from "react";
import { createRoot } from "react-dom/client";
import HigherLower from "./pages/Higher_lower";
import MoveSet from "./pages/MoveSet";

const root = createRoot(document.getElementById("root"));

root.render(<MoveSet />);
