import {
  index,
  pre,
  prop,
  modelOptions,
  Severity,
  DocumentType,
  getModelForClass,
} from "@typegoose/typegoose";
import argon2d from "argon2";

@index({ email: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@pre<User>("save", async function () {
  if (!this.isModified("password")) return;
  const hashed_password_ = await argon2d.hash(this.password);
  this.password = hashed_password_;
  return;
})
export class User {
  @prop({ required: true, unique: true, lowercase: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  async validate_password(
    this: DocumentType<User>,
    candidatePassword: string,
  ): Promise<boolean> {
    try {
      return argon2d.verify(this.password, candidatePassword);
    } catch (e) {
      return false;
    }
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
