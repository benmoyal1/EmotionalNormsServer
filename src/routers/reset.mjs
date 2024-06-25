import express from "express";
import { kv } from "@vercel/kv";

const router = express.Router();

// Reset the counters to zero or initial state
router.post("/resetKV", async (req, res) => {
  try {
    await kv.set("maleCounter", 0);
    await kv.set("femaleCounter", 0);
    res.json({ message: "Counters have been reset successfully." });
  } catch (error) {
    console.error("Error resetting counters:", error);
    res.status(500).json({ error: "Failed to reset counters." });
  }
});

export default router;
