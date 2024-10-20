import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { NEXT_PUBLIC_DB_DRIZZLE_URL } from "../const";

const sql = neon(NEXT_PUBLIC_DB_DRIZZLE_URL);
export const db = drizzle(sql, { schema });
