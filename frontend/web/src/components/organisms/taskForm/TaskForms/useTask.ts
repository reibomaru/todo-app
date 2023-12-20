import { useTaskQuery } from "~/apis/backend/hooks";

export const useTask = (companyId?: string, taskId?: string) => {
  return useTaskQuery(companyId || "", taskId || "");
};
