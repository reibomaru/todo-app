import {
  Button,
  FormHelperText,
  Grid,
  InputBase,
  MenuItem,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { ChangeEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "~/apis/backend/api";
import { TaskPublicationRangeEnum, TaskRequestBody } from "~/apis/backend/gen";
import { useUser } from "~/hooks/UserContext/helper";
import MembersSelect from "../../MembersSelect";
import TaskStatusSelect from "../../TaskStatusSelect";
import PublicationRangeSelect from "~/components/organisms/PublicationRangeSelect";

const isValidForm = (form: TaskRequestBody) => {
  if (
    form.assigneeId &&
    form.companyId &&
    form.title &&
    form.due &&
    form.publication_range &&
    form.statusId
  ) {
    return true;
  }
  return false;
};

const NewTaskForm = () => {
  const user = useUser();
  const [form, setForm] = useState<TaskRequestBody>({
    due: dayjs().format("YYYY-MM-DD"),
    companyId: user.company.id,
    assigneeId: user.id,
    statusId: "",
    description: "",
    publication_range: TaskPublicationRangeEnum.Company,
  });
  const navigate = useNavigate();

  const createTask = useCallback(async () => {
    if (!isValidForm(form)) {
      alert("空の入力値があります。");
      return;
    }
    try {
      await api.createTask(user.company.id, form);
      navigate(`/${user.company.id}/tasks`);
    } catch (error) {
      alert("タスクの作成に失敗");
    }
  }, [form, navigate, user.company.id]);
  return (
    <Grid container direction="column">
      <Grid item>
        <Grid item container alignItems="center">
          <Grid item flexGrow={1}>
            <InputBase
              sx={{
                typography: "h4",
                width: "100%",
              }}
              value={form.title}
              onChange={(event) => {
                setForm((prev) => ({
                  ...prev,
                  title: event.target.value,
                }));
              }}
              placeholder="New Task Title"
            />
          </Grid>
          <Grid item>
            <Button onClick={createTask} variant="contained">
              作成
            </Button>
          </Grid>
        </Grid>
        <hr />
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={8}>
          <TextareaAutosize
            minRows={10}
            style={{
              width: "100%",
            }}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setForm((prev) => ({
                ...prev,
                description: event.target.value,
              }));
            }}
            value={form.description}
          />
        </Grid>
        <Grid item xs={4} container direction="column" spacing={2}>
          <Grid item container direction="column" spacing={0.5}>
            <Grid item container alignItems="center">
              <Typography variant="h6" component="h3" sx={{ marginRight: 1 }}>
                期限
              </Typography>
            </Grid>
            <Grid item>
              <DatePicker
                value={dayjs(form.due)}
                onChange={(date) => {
                  setForm((prev) => ({
                    ...prev,
                    due: date?.format("YYYY-MM-DD"),
                  }));
                }}
                format="YYYY/MM/DD"
              />
            </Grid>
          </Grid>
          <Grid item container direction="column" spacing={0.5}>
            <Grid item container alignItems="center">
              <Typography variant="h6" component="h3" sx={{ marginRight: 1 }}>
                担当者
              </Typography>
            </Grid>
            <Grid item>
              <MembersSelect
                value={form.assigneeId}
                name="assigneeId"
                onChange={(event) => {
                  setForm((prev) => ({
                    ...prev,
                    assigneeId: event.target.value,
                  }));
                }}
                displayEmpty
                companyId={user.company.id}
                selectType="memberIds"
              />
            </Grid>
          </Grid>
          <Grid item container direction="column" spacing={0.5}>
            <Grid item container alignItems="center">
              <Typography variant="h6" component="h3" sx={{ marginRight: 1 }}>
                ステータス
              </Typography>
            </Grid>
            <Grid item>
              <TaskStatusSelect
                value={form.statusId}
                name="statusId"
                onChange={(event) => {
                  setForm((prev) => ({
                    ...prev,
                    statusId: event.target.value,
                  }));
                }}
                displayEmpty
                selectType="taskStatusIds"
                companyId={user.company.id}
                error={form.statusId === ""}
              >
                <MenuItem value="">未指定</MenuItem>
              </TaskStatusSelect>
              <FormHelperText>
                {form.statusId === "" && "ステータスを指定してください"}
              </FormHelperText>
            </Grid>
          </Grid>
          <Grid item container direction="column" spacing={0.5}>
            <Grid item container alignItems="center">
              <Typography variant="h6" component="h3" sx={{ marginRight: 1 }}>
                公開範囲
              </Typography>
            </Grid>
            <Grid item>
              <PublicationRangeSelect
                value={form.publication_range}
                name="publication_range"
                onChange={(event) => {
                  setForm((prev) => ({
                    ...prev,
                    publication_range: event.target
                      .value as TaskPublicationRangeEnum,
                  }));
                }}
                displayEmpty
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewTaskForm;
