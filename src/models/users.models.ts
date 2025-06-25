import bcrypt from "bcryptjs";
import { model, models, Schema } from "mongoose";

export interface IUserServer {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserServer>(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    role: {
      type: String,
      required: [true, "User role is required"],
      enum: ["editor", "superadmin"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next()
});

const User = models.User || model("User", UserSchema);


export default User;
