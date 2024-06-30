import "dotenv/config";
import express, { Application } from "express";
import config from "config";
import connect from "./utils/connect";
import { logInfo } from "./utils/logger";
import routes from "./routes";
import errorHandler from "./middleware/errorHandler.middleware";
import { RedisService } from "./cache";

const app: Application = express();

app.use(express.json());
app.use(routes);

const PORT = config.get("port");

const database_uri = config.get<string>("mongo_uri");

app.use(errorHandler);
app.listen(PORT, () => {
  logInfo(`Server is listening on port ${PORT}`);

  connect(database_uri);
  RedisService.getInstance().connect();
});
