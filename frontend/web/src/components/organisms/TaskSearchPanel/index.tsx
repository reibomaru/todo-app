import {
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent, useCallback, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Task } from "~/apis/backend/gen";
import TaskTable from "~/components/organisms/TaskTable";
import { useUpdateQueryParam } from "~/hooks/navigate";
import MembersSelect from "~/components/organisms/MembersSelect";
import TaskStatusSelect from "~/components/organisms/TaskStatusSelect";
import { useSearchTask } from "./useSearchTask";

const TaskSearchPanel = () => {
  const location = useLocation();
  const updateQueryParam = useUpdateQueryParam();
  const { companyId } = useParams();
  const currParams = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const assignee = params.get("assignee") || "";
    const status = params.get("status") || "";
    const sort = params.get("sort") || "";
    const castedPage = Number(params.get("page"));
    const page = isNaN(castedPage) ? 1 : castedPage;
    return { assignee, status, sort, page };
  }, [location.search]);

  const { data } = useSearchTask(
    companyId || "",
    currParams.assignee,
    currParams.status,
    currParams.sort,
    currParams.page,
  );

  const handleHeaderClick = useCallback(
    (key: keyof Task) => {
      switch (key) {
        case "created_at":
        case "due": {
          updateQueryParam("sort", key);
          break;
        }
        default:
      }
    },
    [updateQueryParam],
  );

  const handleChangeFilterOption = (event: SelectChangeEvent<string>) => {
    const {
      target: { name, value },
    } = event;
    updateQueryParam(name, value);
  };

  const handleChangePage = (_: ChangeEvent<unknown>, value: number) => {
    updateQueryParam("page", value.toString());
  };

  return (
    <Grid item>
      <Grid item container spacing={2}>
        <Grid item>
          <InputLabel>担当者</InputLabel>
          <MembersSelect
            value={currParams.assignee}
            name="assignee"
            onChange={handleChangeFilterOption}
            displayEmpty
            sx={{ minWidth: 150 }}
            companyId={companyId || ""}
            selectType="members"
          >
            <MenuItem value="">指定しない</MenuItem>
          </MembersSelect>
        </Grid>
        <Grid item>
          <InputLabel>ステータス</InputLabel>
          <TaskStatusSelect
            value={currParams.status}
            name="status"
            onChange={handleChangeFilterOption}
            displayEmpty
            sx={{ minWidth: 150 }}
            companyId={companyId || ""}
            selectType="taskStatus"
          >
            <MenuItem value="">指定しない</MenuItem>
          </TaskStatusSelect>
        </Grid>
      </Grid>
      <Grid item>
        <TaskTable
          currentSortKey={currParams.sort || "created_at"}
          tasks={data.result}
          onClickHeader={handleHeaderClick}
        />
      </Grid>
      <Grid item container justifyContent="center">
        <Pagination
          sx={{ padding: 5 }}
          count={data.total_page_count}
          page={currParams.page}
          onChange={handleChangePage}
        />
      </Grid>
    </Grid>
  );
};

export default TaskSearchPanel;
