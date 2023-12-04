import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import HeaderLayout from "~/components/organisms/HeaderLayout";

const Top = () => {
  return (
    <>
      <HeaderLayout>
        <Grid container direction="column" sx={{ padding: 5 }}>
          <h1>トップページ</h1>
          <h2>サイト内リンク</h2>
          <ul>
            <li>
              <Link to="signin">サインイン</Link>
            </li>
          </ul>
          <h2>開発者向け</h2>
          <ul>
            <li>
              <Link to="https://www.notion.so/enechain-d28edbd32f7946b3ac04f7d71f12b111">
                ドキュメント
              </Link>
            </li>
            <li>
              <Link to="https://github.com/reibomaru/todo-app">リポジトリ</Link>
            </li>
          </ul>
        </Grid>
      </HeaderLayout>
    </>
  );
};

export default Top;
