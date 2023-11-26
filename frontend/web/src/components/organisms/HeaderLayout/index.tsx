import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useUser } from "~/hooks/UserContext/helper";

type Props = {
  children: ReactNode;
};

const HeaderLayout = ({ children }: Props) => {
  const user = useUser();
  const navigate = useNavigate();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo APP
          </Typography>
          {user ? (
            <Button
              onClick={() =>
                navigate(`/${user.company.id}/tasks?assignee=${user.name}`)
              }
              color="inherit"
            >
              {user.name}
            </Button>
          ) : (
            <Button onClick={() => navigate("/signin")} color="inherit">
              サインイン
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default HeaderLayout;
