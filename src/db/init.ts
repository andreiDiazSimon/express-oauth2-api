import dotenv from "dotenv";

import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import { Client, createClient } from "@libsql/client";

import * as schema from "../../drizzle/schema.js";

dotenv.config({ path: ".env" });

const turso: Client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
} as { url: string; authToken?: string });

export const db: LibSQLDatabase<typeof schema> = drizzle(turso);
//kantutan
//inamo simon AHAHAHAH
