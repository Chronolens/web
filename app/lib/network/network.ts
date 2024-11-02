"use server";

import { auth } from "@/auth";
import DEFAULT_SERVER_ADDRESS from "../constants";
import { cookies } from "next/headers";

function getServerAdrress(): string {
  const serverAddress = cookies().get("serverAddress")?.value;
  return serverAddress ? serverAddress : DEFAULT_SERVER_ADDRESS;
}

export async function fetchWithCookies(url: string, options: RequestInit) {
  const session = await auth();
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
}

export async function login(credentials) {
  const serverAddress = getServerAdrress();
  return fetch(`${serverAddress}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
}

export const fetchFullSyncData = async () => {
  const serverAddress = getServerAdrress();
  try {
    const fullSyncResponse = await fetchWithCookies(`${serverAddress}/sync/full`, {
      method: "GET",
    });

    if (!fullSyncResponse.ok) {
      throw new Error("Failed to fetch /sync/full" + fullSyncResponse.status);
    }

    const syncData = await fullSyncResponse.json(); // Get the JSON response

    const photoHashes = Object.values(syncData);

    // Print syncData and photoHashes to the terminal
    //console.log("Full sync data:", syncData);
    //console.log("Extracted photo hashes:", photoHashes);

    return photoHashes; // Return the array of photo hashes
  } catch (err) {
    console.error("Error fetching sync data:", err);
    throw err;
  }
};

// Function to fetch previews for each photo hash
export const fetchPreviewsByHash = async (photoIds: string[]) => {
  const serverAddress = getServerAdrress();
  try {
    // Fetch previews for each photo hash
    const previewData = await Promise.all(
      photoIds.map(async (id) => {
        const previewResponse = await fetch(`${serverAddress}/preview/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!previewResponse.ok) {
          throw new Error(`Failed to fetch preview for id: ${id}`);
        }

        const preview = await previewResponse.json();
        console.log(preview);
        return { id, preview };
      }),
    );

    return previewData; // Return the fetched preview data
  } catch (err) {
    console.error("Error fetching preview data:", err);
    throw err;
  }
};

// Function to fetch preview URL for a single photo ID
export const fetchPreviewById = async (photoId: string) => {
  const serverAddress = getServerAdrress();
  try {
    // Fetch preview for the given photo ID
    const previewResponse = await fetchWithCookies(
      `${serverAddress}/preview/${photoId}`,
      {
        method: "GET",
      },
    );

    if (!previewResponse.ok) {
      throw new Error(`Failed to fetch preview for ID: ${photoId}`);
    }

    const previewUrl = await previewResponse.text(); // Fetches the URL directly as text
    return previewUrl; // Return the URL
  } catch (err) {
    console.error("Error fetching preview data:", err);
    throw err;
  }
};
