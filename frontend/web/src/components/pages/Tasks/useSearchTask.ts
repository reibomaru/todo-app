import { useSearchTasksQuery } from "~/apis/backend/hooks";

export const useSearchTask = (
  companyId: string,
  assignee: string,
  status: string,
  sort: string,
  page: number,
) => {
  return useSearchTasksQuery(companyId, assignee, status, sort, page);
};
