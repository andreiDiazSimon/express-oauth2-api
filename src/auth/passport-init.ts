import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import passport from "passport";
import oAuth, { Profile, VerifyCallback } from "passport-google-oauth20";
import jwt from "jsonwebtoken";

import { db } from "../db/init.js";

const googleStrategy = oAuth.Strategy;

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const { id: googleId, displayName, emails } = profile;
      const email = emails?.[0]?.value;
      //  TODO:
      //  1. query the db for existing user otherwise
      //  generate a token and insert the user in db
      //  then call the done callback
      //  2. add auth routes
    },
  ),
);
