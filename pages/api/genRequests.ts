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

  const response = await fetch('/api/sync/full', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`, // Set the Authorization header
      'Content-Type': 'application/json',
    },
  });

  // Handle the error if the response is not ok
  if (!response.ok) {
    let errorMessage = 'Network response was not ok';
    
    // Attempt to parse the response as JSON for error details
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage; // Use the server's message if available
    } else {
      // If the response is not JSON, return the text response
      errorMessage = await response.text();
    }

    throw new Error(errorMessage);
  }

  const data = await response.json(); // Assuming the response is in JSON format
  return data.photoHashes; // Adjust according to your API response structure
};