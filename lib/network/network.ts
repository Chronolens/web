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

export async function refreshAccessToken(token) {
  const serverAddress = getServerAdrress();
  return fetch(`${serverAddress}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_token: token.accessToken,
      refresh_token: token.refreshToken,
    }),
  });
}

export const fetchFullSyncData = async () => {
  const serverAddress = getServerAdrress();
  try {
    const fullSyncResponse = await fetchWithCookies(
      `${serverAddress}/sync/full`,
      {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      },
    );

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
        headers: { "Content-Type": "application/json" },
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

export async function uploadFileAPI(fileFormData: FormData) {
  const serverAddress = getServerAdrress();
  const file = fileFormData.get("file") as File;

  console.log("file: ", file.name);
  console.log("type: ", file.type);
  const arrayBuffer = await file.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-1", arrayBuffer);
  const b64Hash = btoa(String.fromCharCode(...new Uint8Array(hash)));
  console.log("hash: ", b64Hash);

  try {
    const response = await fetchWithCookies(`${serverAddress}/image/upload`, {
      method: "POST",
      headers: {
        "Content-Digest": `sha-1=:${b64Hash}:`,
      },
      body: fileFormData,
    });
    return { ok: response.ok, status: response.status };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
