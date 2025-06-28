interface BaseUser {
  name: string;
  email: string;
  role: "editor" | "superadmin";
}

export interface IUser extends BaseUser {
  _id: string;
  createdAt: string;
}

export interface NewUserInput extends BaseUser {
  password: string;
}
