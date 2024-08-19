import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  googleId: text("googleId").unique().notNull(),
  displayName: text("displayName").notNull(),
  email: text("email").notNull(),
  jwt: text("jwt").notNull(),
});
