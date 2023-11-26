import { createContext, useContext } from "react";
import { User } from "~/apis/backend/gen";

export const userContext = createContext<User>({} as User);
export const useUser = () => {
  const user = useContext(userContext);
  return user;
};
