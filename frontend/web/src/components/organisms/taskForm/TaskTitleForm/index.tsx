import { Button, Grid, InputBase, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useTaskUpdateMutation } from "~/apis/backend/mutation";

type Prop = {
  title: string;
  taskId: string;
  onlyView: boolean;
};

const TaskTitleForm = ({ title, taskId, onlyView }: Prop) => {
  const [input, setInput] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const taskUpdateMutation = useTaskUpdateMutation({
    taskId,
  });

  const updateTitle = useCallback(() => {
    if (input === "") {
      alert("タイトルを１文字以上入力してください");
      return;
    }
    taskUpdateMutation.mutate({ taskKey: "title", value: input });
    setIsEditing(false);
  }, [input, taskUpdateMutation]);
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
