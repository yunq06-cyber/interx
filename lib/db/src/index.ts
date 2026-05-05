import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema/index";
import path from "path";

// Get database path from environment or use default
let dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
    if (process.env.VERCEL) {
        // In Vercel, if no DATABASE_URL is provided, we use a local temp file.
        // Note: This will be reset on every cold start. For persistence, use a Turso URL.
        dbUrl = "file:/tmp/sqlite.db";
    } else {
        // Local development path
        const localPath = path.resolve(process.cwd(), "..", "..", "sqlite.db");
        dbUrl = `file:${localPath}`;
    }
}

const client = createClient({
    url: dbUrl,
});

export const db = drizzle(client, { schema });

export * from "./schema/index";
