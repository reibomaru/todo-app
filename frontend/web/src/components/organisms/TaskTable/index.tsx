import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Task } from "~/apis/backend/gen";
import { headers } from "./helper";
import { memo } from "react";
import { useUser } from "~/hooks/UserContext/helper";
import dayjs from "dayjs";

const taskEntryToView = (task: Task, key: keyof Task) => {
  switch (key) {
    case "title":
    case "due":
    case "publication_range":
      return <p>{task[key]}</p>;
    case "created_at":
      return <p>{dayjs(task.updated_at).format("YYYY/MM/DD HH:mm")}</p>;
    case "status":
      return <p>{task[key].name}</p>;
    case "author":
      return <p>{task[key].name}</p>;
    case "assignee":
      return <Chip key={task[key].id} label={task[key].name} />;
    default:
      return <p>-</p>;
  }
};

type Props = {
  tasks: Task[];
  currentSortKey: string;
  onClickHeader: (key: keyof Task) => void;
};

const TaskTable = memo(({ tasks, currentSortKey, onClickHeader }: Props) => {
  const navigate = useNavigate();
  const user = useUser();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(({ key, value }) => {
              return (
                <TableCell
                  onClick={() => onClickHeader(key)}
                  key={key}
                  sx={{ cursor: "pointer" }}
                >
                  {value}
                  {currentSortKey === key && "▼"}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              onClick={() => {
                navigate(`/${user.company.id}/tasks/${task.id}`);
              }}
            >
              {headers.map(({ key }) => {
                return (
                  <TableCell key={key}>{taskEntryToView(task, key)}</TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default TaskTable;
