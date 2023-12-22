import { Grid } from "@mui/material";
import { Suspense } from "react";
import HeaderLayout from "~/components/organisms/HeaderLayout";
import TaskForms from "~/components/organisms/taskForm/TaskForms";
import { useUser } from "~/hooks/UserContext/helper";

const TaskPage = () => {
  const user = useUser();

  return (
    <HeaderLayout>
      <Grid container direction="column" sx={{ padding: 5 }}>
        <Suspense fallback={<p>🌀Loading...</p>}>
          <TaskForms onlyView={user.role !== "editor"} />
        </Suspense>
      </Grid>
    </HeaderLayout>
  );
};

export default TaskPage;
