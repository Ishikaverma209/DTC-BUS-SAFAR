import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const bookingsTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  busNumber: text("bus_number").notNull(),
  fromStop: text("from_stop").notNull(),
  toStop: text("to_stop").notNull(),
  travelDate: text("travel_date").notNull(),
  passengerName: text("passenger_name").notNull(),
  passengerAge: integer("passenger_age").notNull(),
  seatCount: integer("seat_count").notNull().default(1),
  status: text("status").notNull().default("confirmed"),
  bookingRef: text("booking_ref").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBookingSchema = createInsertSchema(bookingsTable).omit({ id: true, createdAt: true });
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookingsTable.$inferSelect;
