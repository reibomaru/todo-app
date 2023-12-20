import { MenuItem, Select, SelectProps } from "@mui/material";
import { ReactNode } from "react";
import { TaskPublicationRangeEnum } from "~/apis/backend/gen";
import { publicationRangeDisplay } from "~/apis/backend/api";

type Props = SelectProps<string> & {
  children?: ReactNode;
};

const publicationRangeOptions = [
  {
    value: TaskPublicationRangeEnum.Author,
    label: publicationRangeDisplay[TaskPublicationRangeEnum.Author],
  },
  {
    value: TaskPublicationRangeEnum.Company,
    label: publicationRangeDisplay[TaskPublicationRangeEnum.Company],
  },
];

const PublicationRangeSelect = ({ children, ...selectProps }: Props) => {
  return (
    <Select {...selectProps}>
      {publicationRangeOptions.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
      {children}
    </Select>
  );
};

export default PublicationRangeSelect;
