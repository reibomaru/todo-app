import { Grid } from "@mui/material";
import { Suspense } from "react";
import HeaderLayout from "~/components/organisms/HeaderLayout";
import TaskSearchPanel from "~/components/organisms/TaskSearchPanel";
import { useUser } from "~/hooks/UserContext/helper";

const Tasks = () => {
  const user = useUser();

  return (
    <HeaderLayout>
      <Grid container direction="column" sx={{ padding: 5 }}>
        <Grid item>
          <h1>{user.company.name}</h1>
        </Grid>
        <Suspense fallback={<p>🌀Loading...</p>}>
          <TaskSearchPanel />
        </Suspense>
      </Grid>
    </HeaderLayout>
  );
};

export default Tasks;
