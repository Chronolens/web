"use server";

import { auth, signIn } from "@/auth";
import API_URL from "../constants";

export async function fetchWithCookies(url: string, options: RequestInit) {
  const cookie = auth();
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie}`,
    },
  });
}
export async function fetchSignIn(credentials: FormData) {
  try {
    await signIn("credentials", credentials);
  } catch (error) {
    throw error;
  }
}

export const fetchFullSyncData = async () => {
  try {
    const fullSyncResponse = await fetchWithCookies(`${API_URL}sync/full`, {
      method: "GET",
    });

    // FIX: give the status code to know if it is related with the cookies
    if (!fullSyncResponse.ok) {
      throw new Error("Failed to fetch /sync/full");
    }

    const syncData = await fullSyncResponse.json(); // Get the JSON response

    const photoHashes = Object.keys(syncData);

    // Print syncData and photoHashes to the terminal
    console.log("Full sync data:", syncData);
    console.log("Extracted photo hashes:", photoHashes);

    return photoHashes; // Return the array of photo hashes
  } catch (err) {
    console.error("Error fetching sync data:", err);
    throw err;
  }
};

// Function to fetch previews for each photo hash
export const fetchPreviewsByHash = async (photoHashes: string[]) => {
  try {
    // Fetch previews for each photo hash
    const previewData = await Promise.all(
      photoHashes.map(async (hash) => {
        const previewResponse = await fetch(`${API_URL}/preview/${hash}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!previewResponse.ok) {
          throw new Error(`Failed to fetch preview for hash: ${hash}`);
        }

        const preview = await previewResponse.json();
        return { hash, preview };
      }),
    );

    return previewData; // Return the fetched preview data
  } catch (err) {
    console.error("Error fetching preview data:", err);
    throw err;
  }
};
