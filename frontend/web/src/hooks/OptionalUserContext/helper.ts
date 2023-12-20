import { createContext, useContext } from "react";
import { User } from "~/apis/backend/gen";

type OptionalUserContext = {
  fetchUser: () => Promise<void>;
  optionalUser: User | null;
};
export const optionalUserContext = createContext<OptionalUserContext>(
  {} as OptionalUserContext,
);
export const useOptionalUser = () => {
  return useContext(optionalUserContext);
};
