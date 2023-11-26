import { DefaultApi } from "~/apis/backend/gen/api";
import { Configuration } from "./gen";

const config = new Configuration({
  basePath: "http://localhost:8080",
});

const api = new DefaultApi(config);

export default api;
