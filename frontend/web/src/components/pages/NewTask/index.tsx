import { Chip, Grid } from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "~/apis/backend/api";
import { Task } from "~/apis/backend/gen";
import HeaderLayout from "~/components/organisms/HeaderLayout";
import TaskContentForm from "~/components/organisms/taskForm/TaskContentForm";
import TaskItem from "~/components/organisms/TaskItem";
import TaskItemForm from "~/components/organisms/taskForm/TaskItemForm";
import TaskTitleForm from "~/components/organisms/taskForm/TaskTitleForm";

const NewTaskPage = () => {
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
        {task && (
          <>
            <Grid item>
              <TaskTitleForm
                title={task.title}
                taskId={task.id}
                onUpdateForm={fetchTask}
              />
              <hr />
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={8}>
                <TaskContentForm
                  description={task.description}
                  taskId={task.id}
                  onUpdateForm={fetchTask}
                />
              </Grid>
              <Grid item xs={4} container direction="column" spacing={2}>
                <TaskItemForm
                  taskId={task.id}
                  itemKey="due"
                  label="期限"
                  value={task.due}
                  displayValue={task.due}
                  onUpdateForm={fetchTask}
                />
                <TaskItemForm
                  taskId={task.id}
                  itemKey="assigneeId"
                  label="担当者"
                  displayValue={task.assignee.name}
                  value={task.assignee.id}
                  onUpdateForm={fetchTask}
                />
                <TaskItemForm
                  taskId={task.id}
                  itemKey="statusId"
                  label="ステータス"
                  displayValue={<Chip label={task.status.name} />}
                  value={task.status.id}
                  onUpdateForm={fetchTask}
                />
                <TaskItemForm
                  taskId={task.id}
                  itemKey="publication_range"
                  label="公開範囲"
                  displayValue={task.publication_range}
                  value={task.publication_range}
                  onUpdateForm={fetchTask}
                />
                <TaskItem label="作成者" displayValue={task.author.name} />
                <TaskItem
                  label="最終更新日"
                  displayValue={dayjs(task.updated_at).format(
                    "YYYY/MM/DD HH:mm"
                  )}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </HeaderLayout>
  );
};

export default NewTaskPage;
