import { NextApiRequest, NextApiResponse } from "next";
import { SignInRequest } from "../../../types/AuthModels";
import API_URL from "../../../lib/config";

export default async function signInHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Destructure the request body using the updated SignInRequest model
    const { username, password }: SignInRequest = req.body;

    try {
      // Forward the request to the external server using the API_URL from config
      const response = await fetch(`${API_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      console.log(response);

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
