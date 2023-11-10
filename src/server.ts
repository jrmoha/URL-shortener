import "dotenv/config";
import express, { Application } from "express";
import config from "config";
import connect from "./utils/connect";
import { logInfo } from "./utils/logger";

const app: Application = express();

const PORT = config.get("port");

const database_uri = config.get<string>("mongo_uri");

app.listen(PORT, () => {
  logInfo(`Server is listening on port ${PORT}`);

  connect(database_uri);
});
