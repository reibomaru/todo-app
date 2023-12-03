import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useOptionalUser } from "~/hooks/OptionalUserContext/helper";
import api from "~/apis/backend/api";

type Props = {
  children: ReactNode;
};

const HeaderLayout = ({ children }: Props) => {
  const { optionalUser: user, fetchUser } = useOptionalUser();
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await api.signOut();
      await fetchUser();
      navigate("/signin");
    } catch (error) {
      console.error(error);
      alert("サインアウトに失敗しました");
      return;
    }
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
