import { Button, Grid, Typography } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import api from "~/apis/backend/api";
import { useUser } from "~/hooks/UserContext/helper";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "~/apis/backend/queryKey";

type Props = {
  description: string;
  taskId: string;
  onlyView: boolean;
};

const TaskContentForm = ({ description, taskId, onlyView }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(description);
  const [typographyClassName, setTypographyClassName] = useState("");
  const ref = useRef<HTMLHeadingElement>(null);
  const user = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (ref.current) {
      setTypographyClassName(ref.current.className);
    }
  }, [ref]);

  const mutation = useMutation({
    mutationKey: ["updateTask", user.company.id, taskId],
    mutationFn: () => {
      return api.updateTask(user.company.id, taskId, {
        description: input,
      });
    },
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: queryKey.task(user.company.id, taskId),
      });
    },
  });

  const updateDescrption = useCallback(async () => {
    mutation.mutate();
  }, [mutation]);
  return (
    <Grid item container direction="column" spacing={2}>
      {onlyView || (
        <Grid item container direction="row">
          {isEditing ? (
            <>
              <Button variant="contained" onClick={updateDescrption}>
                保存
              </Button>
              <Button
                variant="text"
                onClick={() => {
                  setIsEditing(false);
                }}
                sx={{ marginLeft: 2 }}
              >
                キャンセル
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              編集
            </Button>
          )}
        </Grid>
      )}
      <Grid item>
        {isEditing ? (
          <TextareaAutosize
            className={typographyClassName}
            minRows={10}
            style={{
              width: "100%",
            }}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setInput(event.target.value);
            }}
            value={input}
          />
        ) : (
          <Typography
            ref={ref}
            variant="body1"
            component="p"
            sx={{ whiteSpace: "break-spaces" }}
          >
            {description}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default TaskContentForm;
