import { createBrowserRouter } from "react-router-dom";
import Top from "~/components/pages/Top";
import SignIn from "~/components/pages/SignIn";
import Task from "~/components/pages/Task";
import Tasks from "~/components/pages/Tasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Top />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/:companyId/tasks",
    element: <Tasks />,
  },
  {
    path: "/:companyId/tasks/:taskId",
    element: <Task />,
  },
]);

export default router;
