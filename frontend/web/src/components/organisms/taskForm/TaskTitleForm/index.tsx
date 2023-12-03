import { Button, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import api from "~/apis/backend/api";
import { useUser } from "~/hooks/UserContext/helper";

type Prop = {
  title: string;
  taskId: string;
  onUpdateForm: () => Promise<void> | void;
};

const TaskTitleForm = ({ title, taskId, onUpdateForm }: Prop) => {
  const [input, setInput] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [typographyClassName, setTypographyClassName] = useState("");
  const user = useUser();
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (ref.current) {
      setTypographyClassName(ref.current.className);
    }
  }, [ref]);

  const updateTitle = useCallback(async () => {
    await api.updateTask(user.company.id, taskId, {
      title: input,
    });
    setIsEditing(false);
    await onUpdateForm();
  }, [input, onUpdateForm, taskId, user.company.id]);
  return (
    <Grid item container alignItems="center" spacing={2}>
      {isEditing ? (
        <>
          <Grid item>
            <input
              style={{ border: "none" }}
              className={typographyClassName}
              defaultValue={title}
              onChange={(event) => {
                setInput(event.target.value);
              }}
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
            <Typography ref={ref} variant="h4" component="h1">
              {title}
            </Typography>
          </Grid>
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
        </>
      )}
    </Grid>
  );
};

export default TaskTitleForm;
