// ../../pages/api/genRequests.js
import API_URL from "../../lib/config";

const getCookie = (name: string): string | null => {
  const cookieMatch = document.cookie.match(new RegExp(`(^|; )${name}=([^;]*)`));
  return cookieMatch ? decodeURIComponent(cookieMatch[2]) : null;
};

export const fetchFullSyncData = async () => {
  // Helper function to get cookie by name

  const authToken = getCookie('authToken'); // Retrieve the authToken from cookies

  if (!authToken) {
    throw new Error('Auth token not found');
  }

  const response_sync = await fetch('/api/sync/full', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`, // Set the Authorization header
      'Content-Type': 'application/json',
    },
  });

  // Handle the error if the response is not ok
  if (!response_sync.ok) {
    let errorMessage = 'Network response was not ok';
    
    // Attempt to parse the response as JSON for error details
    const contentType = response_sync.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const errorData = await response_sync.json();
      errorMessage = errorData.message || errorMessage; // Use the server's message if available
    } else {
      // If the response is not JSON, return the text response
      errorMessage = await response_sync.text();
    }

    throw new Error(errorMessage);
  }

  const data = await response_sync.json(); // Assuming the response is in JSON format
  const previewLinks: string[] = [];
  
  for (const item of data) {
    const id = item.id; // Get the id value from each object

    // Make a request to the preview API with the id
    const previewResponse = await fetch(`/preview/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`, // Set the Authorization header
        'Content-Type': 'application/json',
      },
    });

    // Check if the previewResponse is ok
    if (!previewResponse.ok) {
      const errorPreviewMessage = await previewResponse.text();
      throw new Error(`Error fetching preview for id ${id}: ${errorPreviewMessage}`);
    }

    // Get the response string and append it to the previewLinks array
    const previewData = await previewResponse.text(); // Assuming the response is text
    previewLinks.push(previewData);
  }

  // Return the list of preview links
  return previewLinks;
};
