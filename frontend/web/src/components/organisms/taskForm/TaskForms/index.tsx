import { Chip, Grid } from "@mui/material";
import TaskItem from "~/components/organisms/TaskItem";
import TaskTitleForm from "~/components/organisms/taskForm/TaskTitleForm";
import TaskContentForm from "~/components/organisms/taskForm/TaskContentForm";
import TaskItemForm from "~/components/organisms/taskForm/TaskItemForm";
import { Task } from "~/apis/backend/gen";
import dayjs from "dayjs";

type Props = {
  task: Task;
  fetchTask: () => void | Promise<void>;
};

const TaskForms = ({ task, fetchTask }: Props) => {
  return (
    <Grid container direction="column">
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
            displayValue={dayjs(task.updated_at).format("YYYY/MM/DD HH:mm")}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TaskForms;
