import HeaderLayout from "~/components/organisms/HeaderLayout";

const Top = () => {
  return (
    <>
      <HeaderLayout>
        <h1>トップページ</h1>
        <ul>
          <li>
            <a href="https://www.notion.so/enechain-d28edbd32f7946b3ac04f7d71f12b111">
              ドキュメント
            </a>
          </li>
          <li>
            <a href="https://github.com/reibomaru/todo-app">リポジトリ</a>
          </li>
        </ul>
      </HeaderLayout>
    </>
  );
};

export default Top;
