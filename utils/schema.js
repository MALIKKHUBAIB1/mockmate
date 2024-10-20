import { serial, varchar, text, pgTable } from "drizzle-orm/pg-core"; // Ensure you import pgTable from pg-core

export const MockInterView = pgTable("mockinterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jsonPosition: varchar("jsonPosition").notNull(), // fixed name
  jobDesc: varchar("jobDesc").notNull(), // fixed name
  jobExperience: varchar("jobExperience").notNull(), // fixed name
  createdAt: varchar("createdAt").notNull(),
  updatedAt: varchar("updatedAt").notNull(),
  mockId: varchar("mockId").notNull(),
});
