import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebase.js";

function isAuthEnabled() {
  return String(process.env.REQUIRE_AUTH || "false").toLowerCase() === "true";
}

export async function verifyFirebaseIdToken(req: Request, res: Response, next: NextFunction) {
  try {
    const h = req.headers.authorization || "";
    const token = h.startsWith("Bearer ") ? h.slice(7) : "";
    if (!token) return res.status(401).json({ error: "Missing Bearer token" });
    const decoded = await auth.verifyIdToken(token);
    (req as any).user = decoded;
    next();
  } catch (_e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export async function requireAuthIfEnabled(req: Request, res: Response, next: NextFunction) {
  if (!isAuthEnabled()) return next();
  return verifyFirebaseIdToken(req, res, next);
}
