"use client";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchLogs as fetchLogsFromNetwork } from "../../../lib/network/network";

export default function ActivityPage() {
  const [logs, setLogs] = useState([]); // State for logs data
  const [currentPage, setCurrentPage] = useState(2); // State for pagination
  const [hasMore, setHasMore] = useState(true); // Tracks if more data is available

  // Fetch initial data on component mount
  useEffect(() => {
    fetchInitial();
  }, []);

  const fetchInitial = async () => {
    console.log(currentPage, " | ", logs); // Log before fetching initial data
    try {
      const fetchedData = await fetchLogsFromNetwork(1);
      if (fetchedData.length !== 0) { // Fixed the typo here (from 'lenght' to 'length')
        const logsData = Array.isArray(fetchedData) ? fetchedData : fetchedData.logs || [];
        const sortedLogs = logsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setLogs(logsData);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const fetchLogsData = async () => {
    console.log("2) Fetching logs... Current page:", currentPage); // Log when fetching logs
    try {
      const fetchedData = await fetchLogsFromNetwork(currentPage);
      const logsData = Array.isArray(fetchedData) ? fetchedData : fetchedData.logs || [];

      if (logsData.length === 0) {
        setHasMore(false);
      } else {
        const sortedLogs = logsData.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sorting logs
        await setLogs((prevLogs) => [...prevLogs, ...sortedLogs]);
        await setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  // Function to return the appropriate color for log level
  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "critical":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "info":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  // Log the updated logs whenever it changes
  useEffect(() => {
    const sortedLogs = logs.sort((a, b) => new Date(b.date) - new Date(a.date));
    setLogs(sortedLogs)
    console.log("Logs updated: ", logs); // Log after logs change
  }, [logs]); // This hook runs whenever 'logs' changes

  return (
    <div>
      <h1>Activity Page</h1>
      <InfiniteScroll
        dataLength={logs.length}
        next={fetchLogsData}
        hasMore={hasMore}
        loader={<h4>Loading more logs...</h4>}
        endMessage={<p>No more logs to display.</p>}
      >
        <ul className="space-y-2">
          {logs.map((log) => (
            <li key={log.id} className="flex items-center space-x-2 ml-4">
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
      </InfiniteScroll>
    </div>
  );
}
