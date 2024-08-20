import passport from "./auth/passport-init.js";

import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { authRoute } from "./routes/auth.js";

import morgan from "morgan";

//  TODO: express sessions!!

import express, { Response } from "express";
export const app = express()
  .use(morgan("dev"))
  .use(cookieParser())
  .use(passport.initialize())
  .use("/auth", authRoute)
  .get("/", (_, res: Response): Response => res.json({ message: "home" }))
  .get(
    "/profile",
    (_, res: Response): Response => res.json({ message: "profile" }),
  )
  .listen(3000, () => {
    console.log("http://localhost:3000");
  });
