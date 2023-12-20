import { Button, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { ChangeEvent, ReactNode, useCallback, useMemo, useState } from "react";
import { TaskRequestBody } from "~/apis/backend/gen";
import { useUser } from "~/hooks/UserContext/helper";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MembersSelect from "../../MembersSelect";
import PublicationRangeSelect from "~/components/organisms/PublicationRangeSelect";
import TaskStatusSelect from "../../TaskStatusSelect";
import { useTaskUpdateMutation } from "~/apis/backend/mutation";

type Props = {
  taskId: string;
  label: string;
  displayValue: ReactNode;
  value: string;
  itemKey: keyof TaskRequestBody;
  onlyView: boolean;
};

const TaskItemForm = ({
  taskId,
  label,
  displayValue,
  value,
  itemKey,
  onlyView,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useUser();

  const taskUpdateMutation = useTaskUpdateMutation({
    taskId,
  });

  const udpateTaskItem = useCallback(
    (itemKey: keyof TaskRequestBody) => {
      return async (
        event:
          | SelectChangeEvent<string>
          | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      ) => {
        taskUpdateMutation.mutate({
          taskKey: itemKey,
          value: event.target.value,
        });
        setIsEditing(false)
      };
    },
    [taskUpdateMutation],
  );

  const udpateTaskDateItem = useCallback(
    (itemKey: keyof TaskRequestBody) => {
      return async (value: Dayjs | null) => {
        if (!value) {
          return;
        }
        taskUpdateMutation.mutate({
          taskKey: itemKey,
          value: value?.format("YYYY-MM-DD"),
        });
        setIsEditing(false)
      };
    },
    [taskUpdateMutation],
  );

  const formContent = useMemo(() => {
    switch (itemKey) {
      case "assigneeId":
        return (
          <MembersSelect
            value={value}
            defaultValue={value}
            name="assignee"
            onChange={udpateTaskItem(itemKey)}
            displayEmpty
            companyId={user.company.id}
            selectType="memberIds"
          />
        );
      case "publication_range":
        return (
          <PublicationRangeSelect
            value={value}
            defaultValue={value}
            name={itemKey}
            onChange={udpateTaskItem(itemKey)}
            displayEmpty
          />
        );
      case "statusId":
        return (
          <TaskStatusSelect
            value={value}
            defaultValue={value}
            name={itemKey}
            onChange={udpateTaskItem(itemKey)}
            displayEmpty
            companyId={user.company.id}
            selectType="taskStatusIds"
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
  }, [itemKey, udpateTaskDateItem, udpateTaskItem, user.company.id, value]);
  return (
    <Grid item container direction="column" spacing={0.5}>
      <Grid item container alignItems="center">
        <Typography variant="h6" component="h3" sx={{ marginRight: 1 }}>
          {label}
        </Typography>
        {isEditing || onlyView ? (
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
