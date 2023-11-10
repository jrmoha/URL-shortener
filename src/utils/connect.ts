import { logError, logInfo } from './logger';
import mongoose from "mongoose";


const connect = function (database_uri: string) {
  mongoose
    .connect(database_uri)
    .then((_) => logInfo("Database connected"))
    .catch((e) => logError(e));
};


export default connect;
