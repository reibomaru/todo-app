import { RouterProvider } from "react-router-dom";
import router from "~/router";
import UserProvider from "~/hooks/UserContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </LocalizationProvider>
    </div>
  );
};

export default App;
