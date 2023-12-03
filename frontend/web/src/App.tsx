import { RouterProvider } from "react-router-dom";
import router from "~/router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import OptionalUserProvider from "~/hooks/OptionalUserContext";

const App = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <OptionalUserProvider>
          <RouterProvider router={router} />
        </OptionalUserProvider>
      </LocalizationProvider>
    </div>
  );
};

export default App;
