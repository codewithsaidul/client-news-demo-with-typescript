import { createUserSchema, updateUserSchema } from "@/schema/schema";
import { z } from "zod";

interface BaseUser {
  name: string;
  email: string;
  role: "editor" | "superadmin";
}

export interface IUser extends BaseUser {
  _id: string;
  createdAt: Date;
}

export interface NewUserInput extends BaseUser {
  password: string;
}


export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;