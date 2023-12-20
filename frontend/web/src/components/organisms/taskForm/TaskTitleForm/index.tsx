import { Button, Grid, InputBase, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import api from "~/apis/backend/api";
import { taskQueryKey } from "~/apis/backend/queryKey";
import { useUser } from "~/hooks/UserContext/helper";

type Prop = {
  title: string;
  taskId: string;
  onlyView: boolean;
};

const TaskTitleForm = ({ title, taskId, onlyView }: Prop) => {
  const [input, setInput] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const user = useUser();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["updateTask", user.company.id, taskId],
    mutationFn: () => {
      return api.updateTask(user.company.id, taskId, {
        title: input,
      });
    },
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: taskQueryKey.detail(user.company.id, taskId),
      });
    },
  });

  const updateTitle = useCallback(() => {
    if (input === "") {
      alert("タイトルを１文字以上入力してください");
      return;
    }
    mutation.mutate();
  }, [input, mutation]);
  return (
    <Grid item container alignItems="center" spacing={2}>
      {isEditing ? (
        <>
          <Grid item>
            <InputBase
              style={{ border: "none" }}
              defaultValue={title}
              onChange={(event) => {
                setInput(event.target.value);
              }}
              sx={{ typography: "h4" }}
            />
          </Grid>
          <Grid item>
            <Button onClick={updateTitle} variant="outlined">
              保存
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              キャンセル
            </Button>
          </Grid>
        </>
      ) : (
        <>
          <Grid item>
            <Typography variant="h4" component="h1">
              {title}
            </Typography>
          </Grid>
          {onlyView || (
            <Grid item>
              <Button
                onClick={() => {
                  setIsEditing(true);
                }}
                variant="outlined"
              >
                編集
              </Button>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default TaskTitleForm;
