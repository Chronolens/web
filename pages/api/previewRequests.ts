// pages/api/previewRequests.ts

import API_URL from "../../lib/config";

// Function to fetch the full sync data and extract the photo hashes
export const fetchFullSyncData = async () => {
  try {
    // First request to /sync/full
    const fullSyncResponse = await fetch(`${API_URL}sync/full`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!fullSyncResponse.ok) {
      throw new Error('Failed to fetch /sync/full');
    }

    const syncData = await fullSyncResponse.json(); // Get the JSON response

    // Extract keys (photo hashes) from the syncData
    const photoHashes = Object.keys(syncData);

    // Print syncData and photoHashes to the terminal
    console.log('Full sync data:', syncData);
    console.log('Extracted photo hashes:', photoHashes);

    return photoHashes; // Return the array of photo hashes
  } catch (err) {
    console.error('Error fetching sync data:', err);
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
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!previewResponse.ok) {
          throw new Error(`Failed to fetch preview for hash: ${hash}`);
        }

        const preview = await previewResponse.json();
        return { hash, preview };
      })
    );

    return previewData; // Return the fetched preview data
  } catch (err) {
    console.error('Error fetching preview data:', err);
    throw err;
  }
};
