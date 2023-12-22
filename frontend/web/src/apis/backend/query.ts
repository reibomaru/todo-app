import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import api from "./api";
import { queryKey } from "./queryKey";

export const useUserQuery = () =>
  useQuery({
    queryKey: queryKey.user,
    queryFn: async () => {
      const { data } = await api.getMyAccount();
      return data;
    },
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });

export const useSearchTasksQuery = (
  companyId: string,
  assignee: string,
  status: string,
  sort: string,
  page: number,
) =>
  useSuspenseQuery({
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
  useSuspenseQuery({
    queryKey: queryKey.task(companyId, taskId),
    queryFn: async ({ queryKey }) => {
      const [, companyId, taskId] = queryKey;
      const { data } = await api.getTask(companyId, taskId);
      return data;
    },
  });

export const useTaskStatusQuery = (companyId: string) =>
  useSuspenseQuery({
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
  useSuspenseQuery({
    queryKey: queryKey.members(companyId),
    queryFn: async ({ queryKey }) => {
      const [, companyId] = queryKey;
      const { data } = await api.getMembers(companyId);
      return data;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
