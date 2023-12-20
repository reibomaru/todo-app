import { Grid } from "@mui/material";
import HeaderLayout from "~/components/organisms/HeaderLayout";
import TaskForms from "~/components/organisms/taskForm/TaskForms";
import { useUser } from "~/hooks/UserContext/helper";

const TaskPage = () => {
  const user = useUser();

  return (
    <HeaderLayout>
      <Grid container direction="column" sx={{ padding: 5 }}>
        <TaskForms onlyView={user.role !== "editor"} />
      </Grid>
    </HeaderLayout>
  );
};

export default TaskPage;
