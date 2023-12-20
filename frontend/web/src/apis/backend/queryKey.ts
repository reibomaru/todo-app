export const queryKey = {
  task: (taskId: string, companyId: string) =>
    ["task", taskId, companyId] as const,
  taskStatus: (companyId: string) => ["taskStatus", companyId] as const,
  members: (companyId: string) => ["members", companyId] as const,
  searchTask: (
    companyId: string,
    assignee: string,
    status: string,
    sort: string,
    page: number,
  ) => ["searchTask", companyId, assignee, status, sort, page] as const,
};
