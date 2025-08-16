import { JwtPayload } from "jsonwebtoken";


// Define a type for the context object containing params
export interface TDeleteUserContext {
  params: {
    id?: string; // The dynamic route parameter
    slug?: string
  };
}

export interface ITokenPayload extends JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export interface ParamsServer {
  page?: number;
  category?: string | { $in: string[] };
  newsType?: string;
  priority?: string;
  "author.email"?: string;
  status?: string
}



export interface IVerifySuccess {
  valid: true;
  decoded: ITokenPayload;
}

export interface IVerifyFailure {
  valid: false;
  error: Error; // এররটিকে Error টাইপ হিসেবে রাখা ভালো
}
