import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const containers = pgTable("containers", {
    id: text("id").primaryKey(),
    session: text("session").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});