import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { queryKey } from "./queryKey";
import { TaskRequestBody } from "./gen";
import { useUser } from "~/hooks/UserContext/helper";
import sha256 from "crypto-js/sha256";

type SignInMutationFnArg = {
  email: string;
  password: string;
};
export const useSignInMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: SignInMutationFnArg) => {
      return api.signIn({
        email: email,
        password: sha256(password).toString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.user,
      });
    },
  });
};

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return api.signOut();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.user,
      });
    },
  });
};

export const useTaskCreateMutation = () => {
  const queryClient = useQueryClient();
  const user = useUser();
  return useMutation({
    mutationKey: ["createTask"],
    mutationFn: (form: TaskRequestBody) => {
      return api.createTask(user.company.id, form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.allSearchTask,
      });
    },
  });
};

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
