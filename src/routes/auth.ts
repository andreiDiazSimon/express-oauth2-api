import passport from "../auth/passport-init.js";

import express, { Request, Response } from "express";
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req: Request, res: Response) => {
    const token = (req.user as { jwt: string }).jwt;
    res.cookie("jwt", token, { httpOnly: true, secure: false });
    res.redirect("/profile");
  },
);

export const authRoute = router;
