

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "editor" | "superadmin";
  createdAt: string;
}

export interface NewUserInput {
  name: string;
  email: string;
  password: string;
  role: "editor" | "superadmin";
}
