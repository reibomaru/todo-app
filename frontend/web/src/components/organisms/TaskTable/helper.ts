import { Task } from "~/apis/backend/gen";

export type Header = { key: keyof Task; value: string };

export const headers: Header[] = [
  {
    key: "title",
    value: "タイトル",
  },
  {
    key: "due",
    value: "期限",
  },
  {
    key: "status",
    value: "ステータス",
  },
  {
    key: "publication_range",
    value: "公開範囲",
  },
  {
    key: "assignees",
    value: "担当者",
  },
  {
    key: "author",
    value: "作成者",
  },
  {
    key: "created_at",
    value: "作成日",
  },
];
