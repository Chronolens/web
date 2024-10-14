import { NextApiRequest, NextApiResponse } from 'next';
//import { SignInRequest } from "../../../types/AuthModels";
import API_URL from "../../lib/config";

export default async function searchHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { query } = req.body; //search params

    if (!query) {
      return res.status(400).json({ error: "Query is missing" });
    }

    // Perform search logic here, such as querying a database or external API
    const results = await performSearch(query); // Replace with actual search logic

    return res.status(200).json({ results });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Example search function
async function performSearch(query: string) {
  // Example search logic (replace with your actual implementation)
  return [{ id: 1, title: `Result for ${query}` }, { id: 2, title: `Another result for ${query}` }];
}
