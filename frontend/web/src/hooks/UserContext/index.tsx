import { ReactNode, useEffect, useState } from "react";
import api from "~/apis/backend/api";
import { userContext } from "./helper";
import { User } from "~/apis/backend/gen";

type Props = {
  children: ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.getMyAccount();
        setUser({
          id: data.id,
          email: data.email,
          name: data.name,
          company: data.company,
        });
      } catch (error) {
        console.error(error);
        alert("ユーザーの取得に失敗");
      }
    })();
  }, []);

  return (
    <>
      {user ? (
        <userContext.Provider value={user}>{children}</userContext.Provider>
      ) : (
        <div>ログインしてください</div>
      )}
    </>
  );
};

export default UserProvider;
