import { Grid } from "@mui/material";
import HeaderLayout from "~/components/organisms/HeaderLayout";
import NewTaskForm from "~/components/organisms/taskForm/NewTaskForm";

const NewTaskPage = () => {
  return (
    <HeaderLayout>
      <Grid container direction="column" sx={{ padding: 5 }}>
        <NewTaskForm />
      </Grid>
    </HeaderLayout>
  );
};

export default NewTaskPage;
