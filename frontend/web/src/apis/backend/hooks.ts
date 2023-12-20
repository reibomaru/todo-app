import { useQuery } from "@tanstack/react-query";
import api from "./api";
import { queryKey } from "./queryKey";

export const useSearchTasksQuery = (
  companyId: string,
  assignee: string,
  status: string,
  sort: string,
  page: number,
) =>
  useQuery({
    queryKey: queryKey.searchTask(companyId, assignee, status, sort, page),
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
    queryKey: queryKey.task(companyId, taskId),
    queryFn: async ({ queryKey }) => {
      const [, companyId, taskId] = queryKey;
      const { data } = await api.getTask(companyId, taskId);
      return data;
    },
  });

export const useTaskStatusQuery = (companyId: string) =>
  useQuery({
    queryKey: queryKey.taskStatus(companyId),
    queryFn: async ({ queryKey }) => {
      const [, companyId] = queryKey;
      const { data } = await api.getTaskStatus(companyId);
      return data;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

export const useMembersQuery = (companyId: string) =>
  useQuery({
    queryKey: queryKey.members(companyId),
    queryFn: async ({ queryKey }) => {
      const [, companyId] = queryKey;
      const { data } = await api.getMembers(companyId);
      return data;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
