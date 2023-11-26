import { useNavigate, useLocation } from "react-router-dom";

/**
 * クエリパラメータの変更をページに適用する関数を返す
 */
export const useUpdateQueryParam = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (param: string, value: string) => {
    const params = new URLSearchParams(location.search);
    if (param) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
    navigate(`${location.pathname}?${params.toString()}`);
  };
};
