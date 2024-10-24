import React, { useEffect, useState } from "react";
import { fetchFullSyncData } from "../lib/network/network";
// app/gallery/PageContent.js

const PageContent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFullSyncData();
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Safely access the previewLinks array
  const previewLinks = data?.previewLinks || [];

  return (
    <div className="p-6 h-screen">
      <h1 className="text-2xl font-bold mb-6">Fetched Data</h1>
      <div className="h-full overflow-y-scroll">
        {" "}
        {/* Scrollable container */}
        {/* Adjust grid columns for different screen sizes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {previewLinks.length > 0 ? (
            previewLinks.map((url, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={url}
                  alt={`Preview ${index}`}
                  className="w-auto max-h-32 object-cover" // Keep good resolution and smaller size
                />
              </div>
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageContent;