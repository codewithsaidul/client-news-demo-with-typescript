export interface IUserServer {
  name: string;
  email: string;
  role: "editor" | "superadmin";
  password: string;
  createdAt: Date;
  updatedAt: Date;
}