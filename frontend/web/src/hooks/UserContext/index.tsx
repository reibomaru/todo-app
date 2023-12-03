import { ReactNode } from "react";
import { userContext } from "./helper";
import { Link } from "react-router-dom";
import { useOptionalUser } from "~/hooks/OptionalUserContext/helper";
import HeaderLayout from "~/components/organisms/HeaderLayout";
import { Grid } from "@mui/material";

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
        <HeaderLayout>
          <Grid sx={{ padding: 5 }}>
            <Link to="/signin">サインイン</Link>してください
          </Grid>
        </HeaderLayout>
      )}
    </>
  );
};

export default UserProvider;
