import {
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "~/apis/backend/api";
import { SearchResult, Task } from "~/apis/backend/gen";
import HeaderLayout from "~/components/organisms/HeaderLayout";
import TaskItemSelect from "~/components/organisms/TaskItemSelect";
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
    const page = isNaN(castedPage) ? 1 : castedPage;
    return { assignee, status, sort, page };
  }, [location.search]);
  const user = useUser();
  const [searchResult, setSearchResult] = useState<SearchResult>({
    total_page_count: 0,
    result: [],
    page_size: 0,
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
          <TaskTable
            currentSortKey={currParams.sort || "created_at"}
            tasks={searchResult.result}
            onClickHeader={handleHeaderClick}
          />
        </Grid>
        <Grid item container justifyContent="center">
          <Pagination
            sx={{ padding: 5 }}
            count={searchResult.total_page_count}
            page={currParams.page}
            onChange={handleChangePage}
          />
        </Grid>
      </Grid>
    </HeaderLayout>
  );
};

export default Tasks;
