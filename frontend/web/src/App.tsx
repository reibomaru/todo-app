import { RouterProvider } from "react-router-dom";
import router from "~/router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <div style={{ minHeight: "100vh" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<p>🌀Loading...</p>}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Suspense>
        </QueryClientProvider>
      </LocalizationProvider>
    </div>
  );
};

export default App;
