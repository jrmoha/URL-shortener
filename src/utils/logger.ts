import pino from "pino";
import fs from "fs";
import { Request, Response } from "express";
import dayjs from "dayjs";
import config from "config";

const level = config.get<string>("log_level");

const logger = pino({
  transport: {
    target: "pino-pretty",
  },
  level,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

const log_dir = __dirname + "/../../logs";
if (!fs.existsSync(log_dir)) {
  fs.mkdirSync(log_dir);
}

const log_path = `${log_dir}/access_${dayjs().format("YYYY-MM-DD")}.log`;
const logFileStream = fs.createWriteStream(log_path, { flags: "a" });

export const logRequest = (req: Request, res: Response) => {
  const { method, url, headers, params, query } = req;
  const { statusCode } = res;
  logger.info({ method, url, statusCode });

  const logEntry = `${new Date().toISOString()} [${method}] ${url} - ${statusCode}\n`;
  logFileStream.write(logEntry);

  const logDetails = {
    timestamp: new Date().toISOString(),
    method,
    url,
    headers,
    query,
    params,
    statusCode,
  };
  logFileStream.write(JSON.stringify(logDetails, null, 2) + "\n");
};
export const logError = (error: Error) => {
  logger.error(error.message);

  const logEntry = `${new Date().toISOString()} ${error.message}\n`;
  logFileStream.write(logEntry, "utf8", () => {});
};
export const logInfo = (message: string) => {
  logger.info(message);

  const logEntry = `${new Date().toISOString()} ${message}\n`;
  logFileStream.write(logEntry, "utf8", () => {});
};
export default logger;
