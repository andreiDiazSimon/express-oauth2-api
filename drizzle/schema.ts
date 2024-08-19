import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  googleId: text("googleId").unique(),
  displayName: text("displayName"),
  email: text("email"),
  jwt: text("jwt"),
});
