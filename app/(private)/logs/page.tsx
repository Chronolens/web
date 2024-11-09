"use client";
import { useEffect, useState } from "react";
import { fetchLogs as fetchLogsFromNetwork } from "../../../lib/network/network";

export default function ActivityPage() {
  const [logs, setLogs] = useState([]); // State for logs data
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [totalPages, setTotalPages] = useState(1); // State to track total pages

  useEffect(() => {
    const fetchLogsData = async () => {
      try {
        const fetchedData = await fetchLogsFromNetwork(currentPage);

        const logsData = Array.isArray(fetchedData) ? fetchedData : fetchedData.logs || [];
        const pagesCount = fetchedData.totalPages || 1; // Set a fallback for total pages

        setLogs(logsData);
        setTotalPages(pagesCount);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogsData();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Function to return the appropriate color for log level
  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "critical":
        return "text-red-500"; // Red for critical severity
      case "warning":
        return "text-yellow-500"; // Yellow for warning severity
      case "info":
        return "text-green-500"; // Green for info severity
      default:
        return "text-gray-500"; // Default gray for other severities
    }
  };

  // Format timestamp to readable date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div>
      {/* Pagination Controls */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Logs List */}
      <ul className="space-y-2">
        {logs.map((log) => (
          <li key={log.id} className="flex items-center space-x-2">
            <span className={`${getLevelColor(log.level)} font-bold`}>
              [{log.level}]
            </span>
            <span className="text-gray-700">{log.message}</span>
            <span className="text-gray-500">
              - {formatDate(log.date)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
