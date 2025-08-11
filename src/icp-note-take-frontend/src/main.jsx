/**
 * Application entry point.
 * Mounts the root React component (`App`) to the DOM element with ID `root`.
 */

import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
