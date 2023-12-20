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
import HeaderLayout from "~/components/organisms/HeaderLayout";
import TaskItemSelect from "~/components/organisms/TaskItemSelect";
import TaskTable from "~/components/organisms/TaskTable";
import { useUser } from "~/hooks/UserContext/helper";
import { useUpdateQueryParam } from "~/hooks/navigate";
import { useSearchTask } from "./useSearchTask";

const Tasks = () => {
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
  const user = useUser();

  const { isSuccess, data } = useSearchTask(
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
    <HeaderLayout>
      <Grid container direction="column" sx={{ padding: 5 }}>
        <Grid item>
          <h1>{user.company.name}</h1>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item>
            <InputLabel>担当者</InputLabel>
            <TaskItemSelect
              value={currParams.assignee}
              name="assignee"
              onChange={handleChangeFilterOption}
              displayEmpty
              sx={{ minWidth: 150 }}
              selectType="members"
            >
              <MenuItem value="">指定しない</MenuItem>
            </TaskItemSelect>
          </Grid>
          <Grid item>
            <InputLabel>ステータス</InputLabel>
            <TaskItemSelect
              value={currParams.status}
              name="status"
              onChange={handleChangeFilterOption}
              displayEmpty
              sx={{ minWidth: 150 }}
              selectType="status"
            >
              <MenuItem value="">指定しない</MenuItem>
            </TaskItemSelect>
          </Grid>
        </Grid>
        <Grid item>
          {isSuccess && (
            <TaskTable
              currentSortKey={currParams.sort || "created_at"}
              tasks={data.result}
              onClickHeader={handleHeaderClick}
            />
          )}
        </Grid>
        <Grid item container justifyContent="center">
          {isSuccess && (
            <Pagination
              sx={{ padding: 5 }}
              count={data.total_page_count}
              page={currParams.page}
              onChange={handleChangePage}
            />
          )}
        </Grid>
      </Grid>
    </HeaderLayout>
  );
};

export default Tasks;
