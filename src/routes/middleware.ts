import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import { db } from "../db/init.js";
import { userTable } from "../../drizzle/schema.js";
import { eq } from "drizzle-orm";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string = req.cookies?.jwt;

  if (!token) return res.redirect("/");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = db
      .select()
      .from(userTable)
      .where(
        eq(userTable.googleId, (decoded as { googleId: string }).googleId),
      );
    return next();
  } catch (err: unknown) {
    res.clearCookie("jwt");
    return res.redirect("/");
  }
};
