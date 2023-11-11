import {
  Severity,
  getModelForClass,
  modelOptions,
  index,
  prop,
} from "@typegoose/typegoose";
import config from "config";
import { User } from "./user.model";

@index({ shortUrl: 1 })
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { allowMixed: Severity.ALLOW },
})
export class URL {
  @prop({
    required: true,
    maxlength: config.get<number>("SHORT_URL_MAX_LENGTH"),
  })
  shortUrl: string;

  @prop({
    required: true,
  })
  longUrl: string;

  @prop({ ref: () => User, required: true })
  user: string;
}

const UrlModel = getModelForClass(URL);

export default UrlModel;
