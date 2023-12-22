export const queryKey = {
  user: ["user"],
  task: (taskId: string, companyId: string) =>
    ["task", taskId, companyId] as const,
  taskStatus: (companyId: string) => ["taskStatus", companyId] as const,
  members: (companyId: string) => ["members", companyId] as const,
  allSearchTask: ["searchTask"] as const,
  searchTask: (
    companyId: string,
    assignee: string,
    status: string,
    sort: string,
    page: number,
  ) =>
    [
      ...queryKey.allSearchTask,
      companyId,
      assignee,
      status,
      sort,
      page,
    ] as const,
};
