import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import express, { Response } from "express";
import passport from "./auth/passport-init.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { authRoute } from "./routes/auth.js";
import { isAuthenticated } from "./routes/middleware.js";

export const app = express()
  .use(morgan("dev"))
  .use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
    }),
  )
  .use(cookieParser())
  .use(passport.initialize())
  .use(passport.session())
  .use("/auth", authRoute)
  .get("/", (_, res: Response): Response => res.json({ message: "home" }))
  .get(
    "/profile",
    isAuthenticated,
    (_, res: Response): Response => res.json({ message: "profile" }),
  )
  .listen(3000, () => {
    console.log("http://localhost:3000");
  });
