import mongoose, { Schema, Document } from "mongoose";

interface userSchemaObject extends Document {
  userName: string;
  phoneNumber: string;
  email: string;
  hobbies: string;
}

const userSchema: Schema<userSchemaObject> = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hobbies: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<userSchemaObject>("User", userSchema);
export default User;
