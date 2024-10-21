// pages/api/auth/auth.ts

import { NextApiRequest, NextApiResponse } from "next";
import { SignInRequest } from "../../../types/AuthModels";
import API_URL from "../../../lib/config";

export default async function signInHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password }: SignInRequest = req.body;

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return res.status(200).json(data);
      } else {
        return res.status(response.status).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error contacting the external server:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
