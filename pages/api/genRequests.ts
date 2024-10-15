import API_URL from "../../lib/config";

export const fetchFullSyncData = async () => {
  try {
    // Get the auth token from the cookies
    const getAuthTokenFromCookies = () => {
      const name = "authToken=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookies = decodedCookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
        }
      }
      return null;
    };

    const authToken = getAuthTokenFromCookies();

    if (!authToken) {
      throw new Error('No auth token found. Please log in.');
    }

    const fullSyncResponse = await fetch(`${API_URL}sync/full`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // Send the auth token
      },
    });

    if (!fullSyncResponse.ok) {
      throw new Error('Failed to fetch /sync/full');
    }

    const syncData = await fullSyncResponse.json(); // Get the JSON response

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
