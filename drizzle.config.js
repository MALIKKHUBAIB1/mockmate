import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://mockmate_owner:QaPkFUu4NcJ8@ep-aged-math-a44lwglv.us-east-1.aws.neon.tech/mockmate?sslmode=require",
  },
});
