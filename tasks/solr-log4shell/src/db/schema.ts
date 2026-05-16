import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const containers = sqliteTable("containers", {
    id: text("id").primaryKey(),
    user_ip: text("user_ip"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});