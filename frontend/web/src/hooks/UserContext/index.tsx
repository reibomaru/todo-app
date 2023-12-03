import { ReactNode } from "react";
import { userContext } from "./helper";
import { Link } from "react-router-dom";
import { useOptionalUser } from "~/hooks/OptionalUserContext/helper";

type Props = {
  children: ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const { optionalUser: optUser } = useOptionalUser();
  return (
    <>
      {optUser ? (
        <userContext.Provider value={optUser}>{children}</userContext.Provider>
      ) : (
        <>
          <Link to="/signin">サインイン</Link>してください
        </>
      )}
    </>
  );
};

export default UserProvider;
