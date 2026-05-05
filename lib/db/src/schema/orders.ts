import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { user } from "./auth";

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  xianyuLink: text("xianyuLink").notNull(),
  userNotes: text("userNotes"),
  expectedPrice: real("expectedPrice"), // 用户期望价
  finalPrice: real("finalPrice"),       // 管理员最终报价 (韩币/美金)
  currency: text("currency").notNull().default("KRW"),
  status: text("status").notNull().default("PENDING_QUOTE"), // PENDING_QUOTE, AWAITING_PAYMENT, PAID, etc.
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});
