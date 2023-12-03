import { Grid } from "@mui/material";
import HeaderLayout from "~/components/organisms/HeaderLayout";
import NewTaskForm from "~/components/organisms/taskForm/NewTaskForm";
import { useUser } from "~/hooks/UserContext/helper";

const NewTaskPage = () => {
  const user = useUser();
  return (
    <HeaderLayout>
      <Grid container direction="column" sx={{ padding: 5 }}>
        {user.role === "editor" ? (
          <NewTaskForm />
        ) : (
          <p>タスクの作成権限がありません。</p>
        )}
      </Grid>
    </HeaderLayout>
  );
};

export default NewTaskPage;
