import { ReactNode, useCallback, useEffect, useState } from "react";
import api from "~/apis/backend/api";
import { optionalUserContext } from "./helper";
import { User } from "~/apis/backend/gen";

type Props = {
  children: ReactNode;
};

const OptionalUserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await api.getMyAccount();
      setUser({
        id: data.id,
        email: data.email,
        name: data.name,
        company: data.company,
        role: data.role,
      });
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, [fetchUser]);

  return (
    <optionalUserContext.Provider value={{ optionalUser: user, fetchUser }}>
      {children}
    </optionalUserContext.Provider>
  );
};

export default OptionalUserProvider;
