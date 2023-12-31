import { createBrowserRouter } from "react-router-dom";
import Top from "~/components/pages/Top";
import SignIn from "~/components/pages/SignIn";
import Task from "~/components/pages/Task";
import Tasks from "~/components/pages/Tasks";
import UserProvider from "./hooks/UserContext";
import NewTaskPage from "./components/pages/NewTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Top />,
  },
  {
    path: ":companyId/tasks",
    element: (
      <UserProvider>
        <Tasks />
      </UserProvider>
    ),
  },
  {
    path: ":companyId/tasks/:taskId",
    element: (
      <UserProvider>
        <Task />
      </UserProvider>
    ),
  },
  {
    path: ":companyId/tasks/new",
    element: (
      <UserProvider>
        <NewTaskPage />
      </UserProvider>
    ),
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

export default router;
