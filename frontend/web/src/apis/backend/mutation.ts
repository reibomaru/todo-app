import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { queryKey } from "./queryKey";
import { TaskRequestBody } from "./gen";
import { useUser } from "~/hooks/UserContext/helper";

type TaskUpdateMutation = {
  taskId: string;
};
type TaskUpdateMutationArg = {
  taskKey: keyof TaskRequestBody;
  value: TaskRequestBody[keyof TaskRequestBody];
};
export const useTaskUpdateMutation = ({ taskId }: TaskUpdateMutation) => {
  const queryClient = useQueryClient();
  const user = useUser();
  const mutation = useMutation({
    mutationKey: ["updateTask", user.company.id, taskId],
    mutationFn: ({ taskKey, value }: TaskUpdateMutationArg) => {
      return api.updateTask(user.company.id, taskId, {
        [taskKey]: value,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.task(user.company.id, taskId),
      });
    },
  });
  return mutation;
};

type TaskDeleteMutation = {
  taskId: string;
};
export const useTaskDeleteMutation = ({ taskId }: TaskDeleteMutation) => {
  const queryClient = useQueryClient();
  const user = useUser();
  return useMutation({
    mutationKey: ["deleteTask", user.company.id, taskId],
    mutationFn: () => {
      return api.deleteTask(user.company.id, taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.task(user.company.id, taskId),
      });
    },
  });
};
