// pages/api/auth/user.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // This is just a simple check; you should implement session or token logic
  if (req.method === "GET") {
    // Simulating user check
    const user = { email: "test@example.com" };
    res.status(200).json({ user });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
