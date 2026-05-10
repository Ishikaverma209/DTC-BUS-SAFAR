import { Router } from "express";
import { db, bookingsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/dashboard/summary", async (req, res) => {
  const userId = req.session?.userId;
  if (!userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const allBookings = await db.select().from(bookingsTable)
      .where(eq(bookingsTable.userId, userId))
      .orderBy(desc(bookingsTable.createdAt));

    const total = allBookings.length;
    const cancelled = allBookings.filter((b) => b.status === "cancelled").length;
    const upcoming = allBookings.filter((b) => b.status === "confirmed").length;
    const recent = allBookings.slice(0, 5).map((b) => ({
      ...b,
      createdAt: b.createdAt.toISOString(),
    }));

    const routeCounts: Record<string, number> = {};
    for (const b of allBookings) {
      const key = `${b.busNumber}: ${b.fromStop} → ${b.toStop}`;
      routeCounts[key] = (routeCounts[key] ?? 0) + 1;
    }

    const popularRoutes = Object.entries(routeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([route]) => route);

    if (popularRoutes.length === 0) {
      popularRoutes.push("401: ISBT Kashmere Gate → Najafgarh", "764: Nangloi Terminal → Shivaji Stadium");
    }

    res.json({
      totalBookings: total,
      upcomingBookings: upcoming,
      cancelledBookings: cancelled,
      recentBookings: recent,
      popularRoutes,
    });
  } catch (err) {
    req.log.error({ err }, "Dashboard summary error");
    res.status(500).json({ error: "Failed to load dashboard" });
  }
});

export default router;
