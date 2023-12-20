import { useTaskQuery } from "~/apis/backend/query";

export const useTask = (companyId?: string, taskId?: string) => {
  return useTaskQuery(companyId || "", taskId || "");
};
