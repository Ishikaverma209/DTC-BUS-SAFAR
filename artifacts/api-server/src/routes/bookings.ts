import { Router } from "express";
import { db, bookingsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";
import { CreateBookingBody } from "@workspace/api-zod";

const router = Router();

function requireAuth(req: any, res: any): number | null {
  const userId = req.session?.userId;
  if (!userId) {
    res.status(401).json({ error: "You must be logged in to perform this action" });
    return null;
  }
  return userId;
}

function generateBookingRef(): string {
  return "DTC" + crypto.randomBytes(4).toString("hex").toUpperCase();
}

router.get("/bookings", async (req, res) => {
  const userId = requireAuth(req, res);
  if (!userId) return;

  try {
    const bookings = await db.select().from(bookingsTable).where(eq(bookingsTable.userId, userId));
    res.json(bookings.map((b) => ({
      ...b,
      createdAt: b.createdAt.toISOString(),
    })));
  } catch (err) {
    req.log.error({ err }, "List bookings error");
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

router.post("/bookings", async (req, res) => {
  const userId = requireAuth(req, res);
  if (!userId) return;

  const parsed = CreateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid booking data" });
    return;
  }

  const { busNumber, fromStop, toStop, travelDate, passengerName, passengerAge, seatCount } = parsed.data;

  try {
    const [booking] = await db.insert(bookingsTable).values({
      userId,
      busNumber,
      fromStop,
      toStop,
      travelDate,
      passengerName,
      passengerAge,
      seatCount,
      status: "confirmed",
      bookingRef: generateBookingRef(),
    }).returning();

    res.status(201).json({
      ...booking,
      createdAt: booking.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Create booking error");
    res.status(500).json({ error: "Failed to create booking" });
  }
});

router.get("/bookings/:id", async (req, res) => {
  const userId = requireAuth(req, res);
  if (!userId) return;

  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid booking ID" });
    return;
  }

  try {
    const [booking] = await db.select().from(bookingsTable)
      .where(and(eq(bookingsTable.id, id), eq(bookingsTable.userId, userId)))
      .limit(1);

    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    res.json({ ...booking, createdAt: booking.createdAt.toISOString() });
  } catch (err) {
    req.log.error({ err }, "Get booking error");
    res.status(500).json({ error: "Failed to get booking" });
  }
});

router.delete("/bookings/:id", async (req, res) => {
  const userId = requireAuth(req, res);
  if (!userId) return;

  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid booking ID" });
    return;
  }

  try {
    const [booking] = await db.select().from(bookingsTable)
      .where(and(eq(bookingsTable.id, id), eq(bookingsTable.userId, userId)))
      .limit(1);

    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    await db.update(bookingsTable)
      .set({ status: "cancelled" })
      .where(eq(bookingsTable.id, id));

    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    req.log.error({ err }, "Cancel booking error");
    res.status(500).json({ error: "Failed to cancel booking" });
  }
});

export default router;
