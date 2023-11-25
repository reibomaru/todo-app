import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import router from "~/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline>
      <div style={{ minHeight: "100vh" }}>
        <RouterProvider router={router} />
      </div>
    </CssBaseline>
  </React.StrictMode>,
);
