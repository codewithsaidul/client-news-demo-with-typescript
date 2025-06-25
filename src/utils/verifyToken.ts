// utils/verifyToken.ts

import { ITokenPayload, IVerifyFailure, IVerifySuccess } from "@/types/server";
import jwt from "jsonwebtoken";


export const verifyToken = (token: string): IVerifySuccess | IVerifyFailure => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }

  try {
    const decoded = jwt.verify(token, secret) as ITokenPayload;
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error as Error };
  }
};
