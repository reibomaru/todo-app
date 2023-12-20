export const taskQueryKey = {
  detail: (taskId: string, companyId: string) =>
    ["task", taskId, companyId] as const,
};
