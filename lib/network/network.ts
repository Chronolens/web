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
  
  if (session){
    addRoutingTempLogEntry(url, "info");
  }
    
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
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
      addRoutingTempLogEntry(`${serverAddress}/sync/full returned error`, "error");
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
    addRoutingTempLogEntry(`Attempt at full sync data failed`, "error");
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
          addRoutingTempLogEntry(`${serverAddress}/preview/${id} returned error`, "error");
          throw new Error(`Failed to fetch preview for id: ${id}`);
        }

        const preview = await previewResponse.json();
        //console.log(preview);
        return { id, preview };
      }),
    );

    return previewData; // Return the fetched preview data
  } catch (err) {
    console.error("Error fetching preview data:", err);
    addRoutingTempLogEntry(`Attempt at fetching previews by hash failed`, "error");
    throw err;
  }
};

export const fetchPreviewsPaged = async (page: number, pageSize: number) => {
  const serverAddress = getServerAdrress();
  try {
    // Fetch previews for each photo hash
    const previewResponse = await fetchWithCookies(
      `${serverAddress}/previews?page=${page}&page_size=${pageSize}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        next: { revalidate: 0 },
      },
    );

    if (!previewResponse.ok) {
      addRoutingTempLogEntry(`${serverAddress}/previews?page=${page}&page_size=${pageSize}`, "error");
      throw new Error(`Failed to fetch preview for page: ${page}`);
    }

    const previewData = await previewResponse.json();
    return previewData; // Return the fetched preview data
  } catch (err) {
    console.error("Error fetching preview data:", err);
    addRoutingTempLogEntry(`Attempt at fetching paged previews failed`, "error");
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
      addRoutingTempLogEntry(`${serverAddress}/preview/${photoId} returned error`, "error");
      throw new Error(`Failed to fetch preview for ID: ${photoId}`);
    }

    const previewUrl = await previewResponse.text(); // Fetches the URL directly as text
    return previewUrl; // Return the URL
  } catch (err) {
    addRoutingTempLogEntry(`Attempt at fetching preview by ID failed`, "error");
    console.error("Error fetching preview data:", err);
    throw err;
  }
};

export async function uploadFileAPI(fileFormData: FormData) {
  const serverAddress = getServerAdrress();
  const file = fileFormData.get("file") as File;

  const arrayBuffer = await file.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-1", arrayBuffer);
  const b64Hash = btoa(String.fromCharCode(...new Uint8Array(hash)));

  const uploadFormData = new FormData();
  uploadFormData.set(b64Hash, file);
  try {
    const response = await fetchWithCookies(`${serverAddress}/image/upload`, {
      method: "POST",
      headers: {
        Timestamp: file.lastModified.toString(),
      },
      body: uploadFormData,
    });
    return { ok: response.ok, status: response.status };
  } catch (error) {
    addRoutingTempLogEntry(`Attempt at uploading an image failed`, "error");
    console.error("Error uploading file:", error);
    throw error;
  }
}

// Function to fetch 50 logs
export const fetchLogs = async (page: number, pageSize:number) => {
  const serverAddress = getServerAdrress();

  try {
    const response = await fetchWithCookies(
      `${serverAddress}/logs?page=${page}&page_size=${pageSize}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      },
    );

    if (!response.ok) {
      addRoutingTempLogEntry(`${serverAddress}/logs?page=${page}&page_size=${pageSize} returned error`, "error");
      throw new Error(`Failed to fetch logs; page: ${page}`);
    }

    // Parse and return JSON directly
    const logs = await response.json();
    return logs;
  } catch (err) {
    addRoutingTempLogEntry(`Attempt at fetching logs failed`, "error");
    console.error("Error fetching logs:", err);
    throw err;
  }
};


export async function addRoutingTempLogEntry(url: string, level_:string) {
  const routeHistoryCookie = cookies().get("routeHistory");
  let routeHistory = routeHistoryCookie ? JSON.parse(routeHistoryCookie.value) : [];

  const newEntry = {
    level: level_,
    message: `Request made to ${url}`,
    date: new Date().toISOString(),
  };

  // Add the new entry to the route history array
  routeHistory.push(newEntry);

  // Save updated route history back to cookies
  cookies().set("routeHistory", JSON.stringify(routeHistory), {
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production", // Enabling secure cookies for production environment
  });
}

export async function getSessionLogs() {
  const routeHistoryCookie = cookies().get("routeHistory");
  if (!routeHistoryCookie) {
    return []; // No route history cookie found
  }
  return JSON.parse(routeHistoryCookie.value); // Return the route history array directly
}