import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useUserQuery } from "~/apis/backend/query";
import { useSignOutMutation } from "~/apis/backend/mutation";

type Props = {
  children: ReactNode;
};

const HeaderLayout = ({ children }: Props) => {
  const { data: user } = useUserQuery();
  const signOutMutation = useSignOutMutation();
  const navigate = useNavigate();

  const signOut = () => {
    signOutMutation.mutate();
    navigate("/signin");
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            onClick={() => {
              navigate("/");
            }}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            Todo APP
          </Typography>
          {user ? (
            <>
              {user.role === "editor" && (
                <Button
                  onClick={() => navigate(`/${user.company.id}/tasks/new`)}
                  color="inherit"
                >
                  新規作成
                </Button>
              )}

              <Button
                onClick={() =>
                  navigate(`/${user.company.id}/tasks?assignee=${user.name}`)
                }
                color="inherit"
              >
                {user.name}
              </Button>
              <Button onClick={signOut} color="inherit">
                サインアウト
              </Button>
            </>
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
