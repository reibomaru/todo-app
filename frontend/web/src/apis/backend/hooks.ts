import { useQuery } from "@tanstack/react-query";
import api from "./api";

export const useSearchTasksQuery = (
  companyId: string,
  assignee: string,
  status: string,
  sort: string,
  page: number,
) =>
  useQuery({
    queryKey: ["searchTask", companyId, assignee, status, sort, page],
    queryFn: async () => {
      const { data } = await api.searchTask(
        companyId,
        assignee,
        status,
        sort,
        page,
      );
      return data;
    },
  });

export const useTaskQuery = (companyId: string, taskId: string) =>
  useQuery({
    queryKey: ["task", companyId, taskId],
    queryFn: async ({ queryKey }) => {
      const [, companyId, taskId] = queryKey;
      const { data } = await api.getTask(companyId, taskId);
      return data;
    },
  });
