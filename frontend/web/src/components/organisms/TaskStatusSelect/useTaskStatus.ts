import { useTaskStatusQuery } from "~/apis/backend/query";
import { TaskStatusSelectTypeEnum } from "~/models/selectType";

export const useTaskStatus = (
  selectType: TaskStatusSelectTypeEnum,
  companyId: string,
) => {
  const { data: taskStatusList } = useTaskStatusQuery(companyId);

  if (selectType === "taskStatusIds") {
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
