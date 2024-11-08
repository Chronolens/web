"use client";
import { useEffect, useState } from "react";
import { fetchLogs as fetchLogsFromNetwork } from "../../../lib/network/network";

// Define the shape of the log objects
interface Log {
  id: string;
  message: string;
  level: string;
  date: string;
}

export default function ActivityPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  // Renaming the local function to avoid naming conflict
  const loadLogs = async () => {
    try {
      const fetched = await fetchLogsFromNetwork(1, 50); // Call the renamed imported function
      const parsedLogs = JSON.parse(fetched);

      // Sort logs by date in descending order (most recent first)
      parsedLogs.sort((a: Log, b: Log) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setLogs(parsedLogs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  // Function to return the appropriate color for user_id based on log level
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'critical':
        return 'text-red-500'; // Red for critical severity
      case 'warning':
        return 'text-yellow-500'; // Yellow for warning severity
      case 'info':
        return 'text-green-500'; // Green for info severity
      default:
        return 'text-gray-500'; // Default gray for other severities
    }
  };

  return (
    <div className="min-h-screen h-full w-full flex flex-col">
      <h1 className="text-xl font-semibold p-4">Activity Logs</h1>
      {loading ? (
        <p className="p-4">Loading logs...</p>
      ) : logs.length > 0 ? (
        <div className="flex-1">
          <ul className="space-y-4">
            {logs.map((log) => (
              <li key={log.id} className="p-4 border-b border-gray-200 hover:bg-gray-100">
                <div className="font-medium text-gray-700">
                  <span className={getLevelColor(log.level)}>[ {log.level} ]</span> -{" "}
                  <span>{log.message}</span> on{" "}
                  <span className="text-gray-400">{log.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="p-4">No logs available</p>
      )}
    </div>
  );
}
