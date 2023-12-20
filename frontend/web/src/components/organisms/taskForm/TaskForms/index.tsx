import { Button, Chip, Grid } from "@mui/material";
import TaskItem from "~/components/organisms/TaskItem";
import TaskTitleForm from "~/components/organisms/taskForm/TaskTitleForm";
import TaskContentForm from "~/components/organisms/taskForm/TaskContentForm";
import TaskItemForm from "~/components/organisms/taskForm/TaskItemForm";
import dayjs from "dayjs";
import { useUser } from "~/hooks/UserContext/helper";
import api, { publicationRangeDisplay } from "~/apis/backend/api";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTask } from "./useTask";
import { queryKey } from "~/apis/backend/queryKey";

type Props = {
  onlyView: boolean;
};

const TaskForms = ({ onlyView }: Props) => {
  const user = useUser();
  const navigate = useNavigate();
  const { companyId, taskId } = useParams();
  const queryClient = useQueryClient();

  const { status, data: task } = useTask(companyId, taskId);

  const mutation = useMutation({
    mutationKey: ["deleteTask", user.company.id, taskId],
    mutationFn: ({
      companyId,
      taskId,
    }: {
      companyId?: string;
      taskId?: string;
    }) => {
      if (!companyId || !taskId) {
        throw new Error("不適切なidです");
      }
      return api.deleteTask(companyId, taskId);
    },
    onSuccess: (_, { companyId = "", taskId = "" }) => {
      queryClient.invalidateQueries({
        queryKey: queryKey.task(companyId, taskId),
      });
    },
  });

  const deleteTask = useCallback(async () => {
    const ok = confirm("本当にタスクを削除しますか?");
    if (!ok) {
      return;
    }
    mutation.mutate({ companyId, taskId });
    navigate(`/${user.company.id}/tasks`);
  }, [companyId, mutation, navigate, taskId, user.company.id]);

  if (status === "pending") {
    return (
      <Grid container direction="column">
        🌀ローディング中
      </Grid>
    );
  } else if (status === "error") {
    return (
      <Grid container direction="column">
        ❌データの取得中にエラー
      </Grid>
    );
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <TaskTitleForm
          title={task.title}
          taskId={task.id}
          onlyView={onlyView}
        />
        <hr />
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={8}>
          <TaskContentForm
            description={task.description}
            taskId={task.id}
            onlyView={onlyView}
          />
        </Grid>
        <Grid item xs={4} container direction="column" spacing={2}>
          <TaskItemForm
            taskId={task.id}
            itemKey="due"
            label="期限"
            value={task.due}
            displayValue={task.due}
            onlyView={onlyView}
          />
          <TaskItemForm
            taskId={task.id}
            itemKey="assigneeId"
            label="担当者"
            displayValue={task.assignee.name}
            value={task.assignee.id}
            onlyView={onlyView}
          />
          <TaskItemForm
            taskId={task.id}
            itemKey="statusId"
            label="ステータス"
            displayValue={<Chip label={task.status.name} />}
            value={task.status.id}
            onlyView={onlyView}
          />
          <TaskItemForm
            taskId={task.id}
            itemKey="publication_range"
            label="公開範囲"
            displayValue={publicationRangeDisplay[task.publication_range]}
            value={task.publication_range}
            onlyView={onlyView && user.id !== task.author.id}
          />
          <TaskItem label="作成者" displayValue={task.author.name} />
          <TaskItem
            label="最終更新日"
            displayValue={dayjs(task.updated_at).format("YYYY/MM/DD HH:mm")}
          />
          {onlyView || (
            <Grid item>
              <Button onClick={deleteTask} variant="contained" color="error">
                削除
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TaskForms;
