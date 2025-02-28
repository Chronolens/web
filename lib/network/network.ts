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

  // if (session){
  //   addRoutingTempLogEntry(url, "info");
  // }

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

export const fetchPreviewsPaged = async (page: number, pageSize: number) => {
  const serverAddress = getServerAdrress();
  try {
    // Fetch previews for each photo hash
    const previewResponse = await fetchWithCookies(
      `${serverAddress}/previews?page=${page}&page_size=${pageSize}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      },
    );

    if (!previewResponse.ok) {
      // addRoutingTempLogEntry(`${serverAddress}/previews?page=${page}&page_size=${pageSize}`, "error");
      throw new Error(
        `Failed to fetch preview for page ${page}: ${previewResponse.status} ${previewResponse.statusText}`,
      );
    }

    const previewData = await previewResponse.json();
    return previewData; // Return the fetched preview data
  } catch (err) {
    console.error("Error fetching preview data:", err);
    // addRoutingTempLogEntry(`Attempt at fetching paged previews failed`, "error");
    throw err;
  }
};

export const fetchFacePreviewsPaged = async (
  face_id: string,
  page: number,
  pageSize: number,
) => {
  const serverAddress = getServerAdrress();
  try {
    const previewResponse = await fetchWithCookies(
      `${serverAddress}/face/${face_id}?page=${page}&page_size=${pageSize}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      },
    );

    if (!previewResponse.ok) {
      // addRoutingTempLogEntry(`${serverAddress}/preview/${photoId} returned error`, "error");
      throw new Error(
        `Failed to fetch face ${face_id} previews for page ${page}: ${previewResponse.status} ${previewResponse.statusText}`,
      );
    }

    const previewData = await previewResponse.json();
    return previewData; // Return the fetched preview data
  } catch (err) {
    console.error("Error fetching preview data:", err);
    throw err;
  }
};

export const fetchSearchPreviewsPaged = async (
  query: string,
  page: number,
  pageSize: number,
) => {
  const serverAddress = getServerAdrress();
  console.log("fetchSearchPreviewsPaged", query, page, pageSize);
  try {
    const previewResponse = await fetchWithCookies(
      `${serverAddress}/search?query=${query}&page=${page}&page_size=${pageSize}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      },
    );

    if (!previewResponse.ok) {
      throw new Error(
        `Failed to fetch search previews for page ${page}: ${previewResponse.status} ${previewResponse.statusText}`,
      );
    }

    const previewData = await previewResponse.json();
    return previewData; // Return the fetched preview data
  } catch (err) {
    console.error("Error fetching search preview data:", err);
    throw err;
  }
};

export const fetchClusterPreviewsPaged = async (
  cluster_id: string,
  page: number,
  pageSize: number,
) => {
  const serverAddress = getServerAdrress();
  try {
    const previewResponse = await fetchWithCookies(
      `${serverAddress}/cluster/${cluster_id}?page=${page}&page_size=${pageSize}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      },
    );

    if (!previewResponse.ok) {
      throw new Error(
        `Failed to fetch cluster ${cluster_id} previews for page ${page}: ${previewResponse.status} ${previewResponse.statusText}`,
      );
    }
    const previewData = await previewResponse.json();
    return previewData; // Return the fetched preview data
  } catch (err) {
    console.error(`Error fetching cluster ${cluster_id} preview data:`, err);
    throw err;
  }
};

// Function to fetch preview URL for a single photo ID
export const fetchMediaById = async (mediaId: string) => {
  const serverAddress = getServerAdrress();
  try {
    // Fetch preview for the given photo ID
    const response = await fetchWithCookies(
      `${serverAddress}/media/${mediaId}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch preview for ID: ${mediaId}`);
    }

    const media = await response.json();
    return media;
  } catch (err) {
    // addRoutingTempLogEntry(`Attempt at fetching preview by ID failed`, "error");
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
    // addRoutingTempLogEntry(`Attempt at uploading an image failed`, "error");
    console.error("Error uploading file:", error);
    throw error;
  }
}

export const fetchLogs = async (page: number, pageSize: number) => {
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
      // addRoutingTempLogEntry(`${serverAddress}/logs?page=${page}&page_size=${pageSize} returned error`, "error");
      throw new Error(`Failed to fetch logs; page: ${page}`);
    }

    // Parse and return JSON directly
    const logs = await response.json();
    return logs;
  } catch (err) {
    // addRoutingTempLogEntry(`Attempt at fetching logs failed`, "error");
    console.error("Error fetching logs:", err);
    throw err;
  }
};

export async function fetchPeople() {
  const serverAddress = getServerAdrress();
  try {
    const response = await fetchWithCookies(`${serverAddress}/faces`, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch faces" + response.status);
    }

    const faces = await response.json();
    return faces;
  } catch (err) {
    console.error("Error fetching faces:", err);
    throw err;
  }
}

export async function addRoutingTempLogEntry(url: string, level_:string) {
  const routeHistoryCookie = cookies().get("routeHistory");
  const routeHistory = routeHistoryCookie
    ? JSON.parse(routeHistoryCookie.value)
    : [];

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
