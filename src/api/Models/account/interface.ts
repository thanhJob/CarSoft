import { Document } from "mongoose";

export default interface User extends Document {
  name: string;
  email: string;
  photo: string;
  role: string;
  password?: string | any;
  active: boolean;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  find: any;
}
