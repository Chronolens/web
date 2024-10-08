// pages/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Sign-up logic, e.g., storing user in a database
    // For simplicity, we return success for now
    return res.status(201).json({ message: "Sign up successful", user: { email } });
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
