import {
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "~/apis/backend/api";
import { SearchResult, Task, TaskStatus, User } from "~/apis/backend/gen";
import HeaderLayout from "~/components/organisms/HeaderLayout";
import TaskTable from "~/components/organisms/TaskTable";
import { useUser } from "~/hooks/UserContext/helper";
import { useUpdateQueryParam } from "~/hooks/navigate";

const Tasks = () => {
  const location = useLocation();
  const updateQueryParam = useUpdateQueryParam();
  const currParams = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const assignee = params.get("assignee") || "";
    const status = params.get("status") || "";
    const sort = params.get("sort") || "";
    const castedPage = Number(params.get("page"));
    const page = isNaN(castedPage) ? castedPage : 1;
    return { assignee, status, sort, page };
  }, [location.search]);
  const user = useUser();
  const [searchResult, setSearchResult] = useState<SearchResult>({
    total_page_count: 0,
    result: [],
  });
  const [filterOptions, setFilterOptions] = useState<{
    members: User[];
    taskStatusList: TaskStatus[];
  }>({
    members: [],
    taskStatusList: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.searchTask(
          user.company.id,
          currParams.assignee,
          currParams.status,
          currParams.sort,
          currParams.page
        );
        setSearchResult(data);
      } catch (error) {
        console.error(error);
        alert("データの取得に失敗しました");
      }
    })();
  }, [
    currParams.assignee,
    currParams.page,
    currParams.sort,
    currParams.status,
    user.company.id,
  ]);

  useEffect(() => {
    (async () => {
      try {
        const { data: members } = await api.getMembers(user.company.id);
        const { data: taskStatusList } = await api.getTaskStatus(
          user.company.id
        );
        setFilterOptions({ members, taskStatusList });
      } catch (error) {
        console.error(error);
        alert("フィルターの選択肢の取得に失敗");
      }
    })();
  }, [user.company.id]);

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
    [updateQueryParam]
  );

  const handleChangeFilterOption = (event: SelectChangeEvent) => {
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
            <Select
              value={currParams.assignee}
              name="assignee"
              onChange={handleChangeFilterOption}
              displayEmpty
              sx={{ minWidth: 150 }}
            >
              {filterOptions.members.map((member) => (
                <MenuItem key={member.id} value={member.name}>
                  {member.name}
                </MenuItem>
              ))}
              <MenuItem value="">指定しない</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <InputLabel>ステータス</InputLabel>
            <Select
              value={currParams.status}
              name="status"
              onChange={handleChangeFilterOption}
              displayEmpty
              sx={{ minWidth: 150 }}
            >
              {filterOptions.taskStatusList.map((status) => (
                <MenuItem key={status.id} value={status.name}>
                  {status.name}
                </MenuItem>
              ))}
              <MenuItem value="">指定しない</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid item>
          <TaskTable
            currentSortKey={currParams.sort || "created_at"}
            tasks={searchResult.result}
            onClickHeader={handleHeaderClick}
          />
        </Grid>
      </Grid>
      <Grid item container justifyContent="center">
        <Pagination
          count={searchResult.total_page_count}
          page={currParams.page}
          onChange={handleChangePage}
        />
      </Grid>
    </HeaderLayout>
  );
};

export default Tasks;
