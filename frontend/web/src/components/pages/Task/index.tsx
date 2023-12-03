import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "~/apis/backend/api";
import { Task } from "~/apis/backend/gen";
import HeaderLayout from "~/components/organisms/HeaderLayout";
import TaskForms from "~/components/organisms/taskForm/TaskForms";

const TaskPage = () => {
  const [task, setTask] = useState<Task | null>(null);
  const { companyId, taskId } = useParams();

  const fetchTask = useCallback(async () => {
    if (!companyId || !taskId) {
      alert("URLが不正です");
      return;
    }
    const { data } = await api.getTask(companyId, taskId);
    setTask(data);
  }, [companyId, taskId]);

  useEffect(() => {
    (async () => {
      await fetchTask();
    })();
  }, [companyId, fetchTask, taskId]);

  return (
    <HeaderLayout>
      <Grid container direction="column" sx={{ padding: 5 }}>
        {task && <TaskForms task={task} fetchTask={fetchTask} />}
      </Grid>
    </HeaderLayout>
  );
};

export default TaskPage;
