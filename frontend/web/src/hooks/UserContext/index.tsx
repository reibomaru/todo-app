import { ReactNode } from "react";
import { userContext } from "./helper";
import { Link } from "react-router-dom";
import HeaderLayout from "~/components/organisms/HeaderLayout";
import { Grid } from "@mui/material";
import { useUserQuery } from "~/apis/backend/query";

type Props = {
  children: ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const { data: user } = useUserQuery();
  return (
    <>
      {user ? (
        <userContext.Provider value={user}>{children}</userContext.Provider>
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
