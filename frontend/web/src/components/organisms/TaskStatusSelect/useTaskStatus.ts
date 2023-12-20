import { useTaskStatusQuery } from "~/apis/backend/hooks";
import { TaskStatusSelectTypeEnum } from "~/models/selectType";

export const useTaskStatus = (
  selectType: TaskStatusSelectTypeEnum,
  companyId: string,
) => {
  const { status, data: taskStatusList } = useTaskStatusQuery(companyId);

  if (status !== "success") {
    return [];
  } else if (selectType === "taskStatusIds") {
    return taskStatusList.map((status) => ({
      label: status.name,
      value: status.id,
    }));
  } else {
    return taskStatusList.map((status) => ({
      label: status.name,
      value: status.name,
    }));
  }
};
