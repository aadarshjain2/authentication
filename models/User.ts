import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: String,
resetPasswordExpire: Date ,
  },
  { timestamps: true }
);

// Prevent model overwrite during hot reload
const User = models.User || model("User", UserSchema);

export default User;