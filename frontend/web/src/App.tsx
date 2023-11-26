import { RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import router from "~/router";
import UserProvider from "~/hooks/UserContext";

const App = () => {
  return (
    <CssBaseline>
      <div style={{ minHeight: "100vh" }}>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </div>
    </CssBaseline>
  );
};

export default App;
