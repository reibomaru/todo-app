export const MemberSelectTypeEnum = {
  Member: "members",
  MemberId: "memberIds",
} as const;

export const TaskStatusSelectTypeEnum = {
  TaskStatus: "taskStatus",
  TaskStatusId: "taskStatusIds",
} as const;

export const SelectTypeEnum = {
  ...MemberSelectTypeEnum,
  ...TaskStatusSelectTypeEnum,
  PublicationRange: "publicationRange",
} as const;

export type MemberSelectTypeEnum =
  (typeof MemberSelectTypeEnum)[keyof typeof MemberSelectTypeEnum];
export type TaskStatusSelectTypeEnum =
  (typeof TaskStatusSelectTypeEnum)[keyof typeof TaskStatusSelectTypeEnum];
export type SelectTypeEnum =
  (typeof SelectTypeEnum)[keyof typeof SelectTypeEnum];
