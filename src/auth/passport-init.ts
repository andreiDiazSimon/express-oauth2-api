import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import passport from "passport";
import oAuth, {
  Profile,
  Strategy,
  VerifyCallback,
} from "passport-google-oauth20";
import jwt from "jsonwebtoken";

import { db } from "../db/init.js";
import { userTable } from "../../drizzle/schema.js";
import { eq } from "drizzle-orm";

const googleStrategy: typeof Strategy = oAuth.Strategy;

passport.serializeUser(
  (user: Express.User, done: (err: any, user: Express.User) => any): any =>
    done(null, user),
);
passport.deserializeUser(
  async (
    id: unknown,
    done: (err: any, user: Express.User) => any,
  ): Promise<any> => {
    const user:
      | {
          id: number;
          displayName: string | null;
          googleId: string | null;
          email: string | null;
          jwt: string | null;
        }[]
      | null = await db
      .select()
      .from(userTable)
      .where(eq(userTable.googleId, id as string));
    done(null, user);
  },
);

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback,
    ): Promise<void> => {
      const {
        id: googleId,
        displayName,
        emails,
      }: {
        id: string;
        displayName: string;
        emails?: Array<{ value: string; verified: boolean }>;
      } = profile;
      const email: string | undefined = emails?.[0]?.value;

      const user:
        | {
            id: number;
            displayName: string | null;
            googleId: string | null;
            email: string | null;
            jwt: string | null;
          }[]
        | null = await db
        .select()
        .from(userTable)
        .where(eq(userTable.googleId, googleId));

      if (!user) {
        const token: string = jwt.sign({ googleId }, process.env.JWT_SECRET!);
        await db
          .insert(userTable)
          .values({ googleId, displayName, email, jwt: token });

        return done(null, { googleId, displayName, email, jwt: token });
      }

      done(null, user);
    },
  ),
);

export default passport;
//MISS KO NA SYA
