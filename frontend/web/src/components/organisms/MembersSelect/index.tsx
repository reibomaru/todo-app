import { MemberSelectTypeEnum } from "~/models/selectType";
import { useMemberOptions } from "./useMembers";
import { MenuItem, Select, SelectProps } from "@mui/material";
import { ReactNode } from "react";

type Props = SelectProps<string> & {
  selectType: MemberSelectTypeEnum;
  companyId: string;
  children?: ReactNode;
};

const MembersSelect = ({
  selectType,
  companyId,
  children,
  ...selectProps
}: Props) => {
  const options = useMemberOptions(selectType, companyId);
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

export default MembersSelect;
