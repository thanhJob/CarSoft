import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import User from "./interface";

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email!"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide valid email!"],
    },
    photo: String,
    role: {
      type: String,
      enum: ["user", "guide", "lead-guide", "admin", "client"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
      minLength: 8,
      select: false,
    },
    // passwordConfirm: {
    //     type: String,
    //     required: [true, 'Please confirm your password!'],
    // },
    passwordChangedAt: Date,
    active: {
      type: Boolean,
      default: true,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// hash password save
userSchema.pre<User>("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.pre<User>(/^find/, function (next) {
  this.find({
    active: { $ne: false },
  });
  next();
});

userSchema.methods.conrrectPassword = async function (
  passwordCurrent: string
): Promise<boolean> {
  return await bcrypt.compare(passwordCurrent, this.password);
};

const User = mongoose.model<User & mongoose.Document>("User", userSchema);
export default User;
