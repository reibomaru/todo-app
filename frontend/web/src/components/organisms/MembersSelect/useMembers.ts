import { useMembersQuery } from "~/apis/backend/query";
import { MemberSelectTypeEnum } from "~/models/selectType";

export const useMemberOptions = (
  selectType: MemberSelectTypeEnum,
  companyId: string,
) => {
  const { status, data: members } = useMembersQuery(companyId);

  if (status !== "success") {
    return [];
  } else if (selectType === "memberIds") {
    return members.map((member) => ({
      label: member.name,
      value: member.id,
    }));
  } else {
    return members.map((member) => ({
      label: member.name,
      value: member.name,
    }));
  }
};
