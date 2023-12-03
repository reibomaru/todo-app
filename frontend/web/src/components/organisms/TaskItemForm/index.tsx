import { Button, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { ChangeEvent, ReactNode, useCallback, useMemo, useState } from "react";
import { TaskRequestBody } from "~/apis/backend/gen";
import TaskItemSelect from "../TaskItemSelect";
import api from "~/apis/backend/api";
import { useUser } from "~/hooks/UserContext/helper";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type Props = {
  taskId: string;
  label: string;
  displayValue: ReactNode;
  value: string;
  itemKey: keyof TaskRequestBody;
  onUpdateForm?: () => void | Promise<void>;
};

const TaskItemForm = ({
  taskId,
  label,
  displayValue,
  value,
  itemKey,
  onUpdateForm = () => {},
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useUser();

  const udpateTaskItem = useCallback(
    (itemKey: keyof TaskRequestBody) => {
      return async (
        event:
          | SelectChangeEvent<string>
          | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      ) => {
        await api.updateTask(user.company.id, taskId, {
          [itemKey]: event.target.value,
        });
        setIsEditing(false);
        await onUpdateForm();
      };
    },
    [onUpdateForm, taskId, user.company.id]
  );

  const udpateTaskDateItem = useCallback(
    (itemKey: keyof TaskRequestBody) => {
      return async (value: Dayjs | null) => {
        if (!value) {
          return;
        }
        await api.updateTask(user.company.id, taskId, {
          [itemKey]: value?.format("YYYY-MM-DD"),
        });
        setIsEditing(false);
        await onUpdateForm();
      };
    },
    [onUpdateForm, taskId, user.company.id]
  );

  const formContent = useMemo(() => {
    switch (itemKey) {
      case "assigneeId":
        return (
          <TaskItemSelect
            value={value}
            defaultValue={value}
            name="assignee"
            onChange={udpateTaskItem(itemKey)}
            displayEmpty
            selectType="memberIds"
          />
        );
      case "publication_range":
        return (
          <TaskItemSelect
            value={value}
            defaultValue={value}
            name={itemKey}
            onChange={udpateTaskItem(itemKey)}
            displayEmpty
            selectType="publication_range"
          />
        );
      case "statusId":
        return (
          <TaskItemSelect
            value={value}
            defaultValue={value}
            name={itemKey}
            onChange={udpateTaskItem(itemKey)}
            displayEmpty
            selectType="statusIds"
          />
        );
      case "due":
        return (
          <DatePicker
            defaultValue={dayjs(value)}
            value={dayjs(value)}
            onChange={udpateTaskDateItem("due")}
            format="YYYY/MM/DD"
          />
        );
    }
  }, [itemKey, udpateTaskDateItem, udpateTaskItem, value]);
  return (
    <Grid item container direction="column" spacing={0.5}>
      <Grid item container alignItems="center">
        <Typography variant="h6" component="h3" sx={{ marginRight: 1 }}>
          {label}
        </Typography>
        {isEditing ? (
          <></>
        ) : (
          <Button
            variant="outlined"
            size="small"
            onClick={() => setIsEditing(true)}
          >
            編集
          </Button>
        )}
      </Grid>
      <Grid item>
        {isEditing ? (
          <Grid item container alignItems="center">
            {formContent}
            <Button
              onClick={() => setIsEditing(false)}
              sx={{ marginLeft: 1 }}
              variant="text"
            >
              キャンセル
            </Button>
          </Grid>
        ) : (
          <Typography variant="body1" component="div">
            {displayValue}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default TaskItemForm;
