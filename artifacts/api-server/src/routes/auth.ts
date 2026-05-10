import { Router } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { RegisterUserBody, LoginUserBody } from "@workspace/api-zod";

const router = Router();

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "dtc_salt_2024").digest("hex");
}

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

router.post("/auth/register", async (req, res) => {
  const parsed = RegisterUserBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input data" });
    return;
  }

  const { name, email, password } = parsed.data;

  try {
    const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (existing.length > 0) {
      res.status(409).json({ error: "A user with this email already exists" });
      return;
    }

    const passwordHash = hashPassword(password);
    const [user] = await db.insert(usersTable).values({ name, email, passwordHash }).returning();

    req.session.userId = user.id;
    req.session.token = generateToken();

    res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt.toISOString() },
      message: "Registration successful",
      alreadyLoggedIn: false,
    });
  } catch (err) {
    req.log.error({ err }, "Registration error");
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/auth/login", async (req, res) => {
  const parsed = LoginUserBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const { email, password } = parsed.data;

  if (req.session.userId) {
    try {
      const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.session.userId)).limit(1);
      if (user) {
        res.json({
          user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt.toISOString() },
          message: "Login Successful",
          alreadyLoggedIn: true,
        });
        return;
      }
    } catch {
      // fall through to normal login
    }
  }

  try {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (!user || user.passwordHash !== hashPassword(password)) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    req.session.userId = user.id;
    req.session.token = generateToken();

    res.json({
      user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt.toISOString() },
      message: "Login Successful",
      alreadyLoggedIn: false,
    });
  } catch (err) {
    req.log.error({ err }, "Login error");
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/auth/logout", (req, res) => {
  req.session.userId = undefined;
  req.session.token = undefined;
  res.json({ message: "Logout Successful" });
});

router.get("/auth/me", async (req, res) => {
  if (!req.session.userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.session.userId)).limit(1);
    if (!user) {
      req.session.userId = undefined;
      res.status(401).json({ error: "User not found" });
      return;
    }

    res.json({ id: user.id, name: user.name, email: user.email, createdAt: user.createdAt.toISOString() });
  } catch (err) {
    req.log.error({ err }, "Get current user error");
    res.status(500).json({ error: "Failed to get user" });
  }
});

export default router;
