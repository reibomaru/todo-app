import {
  DefaultApi,
  SignInRequestBody,
  TaskPublicationRangeEnum,
} from "~/apis/backend/gen/api";
import isEmail from "validator/lib/isEmail";

const api = new DefaultApi();

const isValidPassword = (password: string) => {
  // 最低8文字の長さの要件
  const minLengthRegex = /.{8,}/;
  // 少なくとも1つの大文字を含む要件
  const uppercaseRegex = /[A-Z]/;
  // 少なくとも1つの小文字を含む要件
  const lowercaseRegex = /[a-z]/;
  // 少なくとも1つの数字を含む要件
  const digitRegex = /[0-9]/;
  // 少なくとも1つの特殊文字を含む要件
  const specialCharRegex = /[^A-Za-z0-9]/;
  return (
    minLengthRegex.test(password) &&
    uppercaseRegex.test(password) &&
    lowercaseRegex.test(password) &&
    digitRegex.test(password) &&
    specialCharRegex.test(password)
  );
};

const validateSignInRequestBody = (form: SignInRequestBody) => {
  const result = {
    email: "",
    password: "",
  };
  if (form.email !== "" && !isEmail(form.email)) {
    result.email = "適切なEmailではありません";
  }
  if (form.password !== "" && !isValidPassword(form.password)) {
    result.password =
      "大文字小文字数字と特殊文字を含む８文字以上のパスワードが必要です";
  }
  return result;
};

const publicationRangeDisplay = {
  [TaskPublicationRangeEnum.Author]: "作成者のみ",
  [TaskPublicationRangeEnum.Company]: "企業内のみ",
} as const;

export default api;
export { validateSignInRequestBody, publicationRangeDisplay };
