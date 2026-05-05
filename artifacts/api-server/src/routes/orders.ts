import { Router } from "express";
import { db } from "@workspace/db";
import { orders } from "@workspace/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "../lib/auth.js";

const router = Router();

// 获取所有订单 (Admin 用)
router.get("/admin/all", async (req: any, res: any) => {
  const session = await auth.api.getSession({ headers: req.headers });
  // TODO: Add actual admin role check. For now we assume the session exists.
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
  return res.json(allOrders);
});

// 管理员发送报价
router.post("/admin/quote", async (req: any, res: any) => {
  const { orderId, finalPrice } = req.body;
  if (!orderId || !finalPrice) return res.status(400).json({ error: "Missing data" });

  await db.update(orders)
    .set({ 
        finalPrice, 
        status: "AWAITING_PAYMENT",
        updatedAt: new Date()
    })
    .where(eq(orders.id, orderId));
    
  return res.json({ success: true });
});

// 用户端获取自己的订单
router.get("/", async (req: any, res: any) => {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const userOrders = await db.select().from(orders).where(eq(orders.userId, session.user.id));
  return res.json(userOrders);
});

// 用户提交代买请求
router.post("/", async (req: any, res: any) => {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { xianyuLink, userNotes, expectedPrice } = req.body;
  if (!xianyuLink) return res.status(400).json({ error: "Xianyu link is required" });

  const newOrder = await db.insert(orders).values({
    id: `ord_${Math.random().toString(36).substr(2, 9)}`,
    userId: session.user.id,
    xianyuLink,
    userNotes,
    expectedPrice: expectedPrice ? parseFloat(expectedPrice) : null,
    status: "PENDING_QUOTE",
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();

  return res.json(newOrder[0]);
});

export default router;
