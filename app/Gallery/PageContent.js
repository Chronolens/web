import React, { useEffect, useState } from 'react';
import { fetchFullSyncData } from '../../pages/api/previewRequests'; // Import only fetchFullSyncData

const PageContent = ({ isSidebarOpen }) => {
  const [contentData, setContentData] = useState(null); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    // Fetch data from the /sync/full endpoint upon component mount
    const fetchData = async () => {
      try {
        // Call the fetchFullSyncData function to get the photo hashes
        const photoHashes = await fetchFullSyncData();

        // Save the fetched photo hashes to state
        setContentData(photoHashes);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData(); // Call the fetch function
  }, []);

  // Render loading state, error state, or the content
  return (
    <main
      className={`flex-1 p-8 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'pl-36' : 'pl-12'
      }`}
    >
      <h2 className="text-2xl font-semibold">Main Content Area</h2>
      
      {/* Show a loading message */}
      {loading && <p>Loading...</p>}

      {/* Show an error message if there is any */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Display the content once loaded */}
      {!loading && !error && contentData && (
        <div className="mt-4">
          {contentData.map((hash) => (
            <div key={hash} className="mb-4 p-4 bg-gray-100 rounded shadow">
              <h3 className="font-bold">Photo Hash: {hash}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Default message if there is no data */}
      {!loading && !error && !contentData && <p>No content available</p>}
    </main>
  );
};

export default PageContent;
