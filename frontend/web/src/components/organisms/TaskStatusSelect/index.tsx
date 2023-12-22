import { TaskStatusSelectTypeEnum } from "~/models/selectType";
import { useTaskStatus } from "./useTaskStatus";
import { MenuItem, Select, SelectProps } from "@mui/material";
import { ReactNode } from "react";

type Props = SelectProps<string> & {
  selectType: TaskStatusSelectTypeEnum;
  companyId: string;
  children?: ReactNode;
};

const TaskStatusSelect = ({
  selectType,
  companyId,
  children,
  ...selectProps
}: Props) => {
  const options = useTaskStatus(selectType, companyId);
  return (
    <Select {...selectProps}>
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
      {children}
    </Select>
  );
};

export default TaskStatusSelect;
