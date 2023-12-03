import { MenuItem, Select, SelectProps } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import api, { publicationRangeDisplay } from "~/apis/backend/api";
import { TaskPublicationRangeEnum } from "~/apis/backend/gen";
import { useUser } from "~/hooks/UserContext/helper";

type Option = {
  value: string;
  label: string;
};

type SelectType =
  | "members"
  | "memberIds"
  | "status"
  | "statusIds"
  | "publication_range";
type Props = SelectProps<string> & {
  selectType: SelectType;
  children?: ReactNode;
};

const fetchOptions = async (
  companyId: string,
  type: SelectType
): Promise<Option[]> => {
  switch (type) {
    case "members":
    case "memberIds": {
      const { data } = await api.getMembers(companyId);
      return type === "members"
        ? data.map((member) => ({
            label: member.name,
            value: member.name,
          }))
        : data.map((member) => ({
            label: member.name,
            value: member.id,
          }));
    }
    case "status":
    case "statusIds": {
      const { data } = await api.getTaskStatus(companyId);
      return type === "status"
        ? data.map((status) => ({
            label: status.name,
            value: status.name,
          }))
        : data.map((status) => ({
            label: status.name,
            value: status.id,
          }));
    }
    default:
      return [
        {
          value: TaskPublicationRangeEnum.Author,
          label: publicationRangeDisplay[TaskPublicationRangeEnum.Author],
        },
        {
          value: TaskPublicationRangeEnum.Company,
          label: publicationRangeDisplay[TaskPublicationRangeEnum.Company],
        },
      ];
  }
};

const TaskItemSelect = ({ selectType, children, ...selectProps }: Props) => {
  const [options, setOptions] = useState<Option[]>([]);
  const user = useUser();

  useEffect(() => {
    (async () => {
      const options = await fetchOptions(user.company.id, selectType);
      setOptions(options);
    })();
  }, [selectType, user.company.id]);

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

export default TaskItemSelect;
