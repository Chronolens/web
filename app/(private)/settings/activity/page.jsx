"use client";

import React, { useState, useEffect, useRef } from "react";
import { fetchLogs } from "@/lib/network/network";
import Cookies from "js-cookie";

export default function ActivityPage() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [routeHistory, setRouteHistory] = useState([]);
  const [displayType, setDisplayType] = useState("serverLogs");

  const pageSize = 30;
  const indexRef = useRef(1);
  const loaderRef = useRef(null);

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "error":
        return "text-red-light";
      case "warning":
        return "text-yellow-light";
      case "info":
        return "text-green-light";
      default:
        return "text-gray-info";
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const fetchMoreData = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    fetchLogs(indexRef.current, pageSize)
      .then((res) => {
        if (Array.isArray(res)) {
          setItems((prevItems) => (prevItems ? [...prevItems, ...res] : res));

          if (res.length < pageSize) {
            setHasMore(false);
          }
          indexRef.current += 1;
        } else {
          console.error("Response data is not an array", res);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const actions = Cookies.get("routeHistory")
      ? JSON.parse(Cookies.get("routeHistory")).reverse()
      : [];
    setRouteHistory(actions);
  }, []);

  useEffect(() => {
    if (displayType !== "serverLogs") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchMoreData();
        }
      },
      { threshold: 1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
      observer.disconnect();
    };
  }, [displayType, hasMore, loading]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-row space-x-4 p-4">
        <button
          onClick={() => setDisplayType("serverLogs")}
          className={`px-4 py-2 font-bold ${displayType === "serverLogs"
            ? "text-blue-light border-b-2 border-blue-light"
            : "text-gray-info"
            }`}
        >
          Server Logs
        </button>
        <button
          onClick={() => setDisplayType("sessionLogs")}
          className={`px-4 py-2 font-bold ${displayType === "sessionLogs"
            ? "text-blue-light border-b-2 border-blue-light"
            : "text-gray-info"
            }`}
        >
          Session Logs
        </button>
      </div>

      <div className="h-full overflow-auto p-3">
        {displayType === "sessionLogs" && (
          <ul className="space-y-2">
            {routeHistory.length > 0 ? (
              routeHistory.map((entry, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 ml-4 mb-2"
                >
                  <span className={`flex-none w-12 ${getLevelColor(entry.level)} font-bold`}>
                    [{entry.level}]
                  </span>
                  <span className="flex-none text-gray-info w-44">
                    {formatDate(entry.date)}
                  </span>
                  <span className="w-full text-foreground break-words text-wrap overflow-hidden">{entry.message}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-info">No route history available.</p>
            )}
          </ul>
        )}

        {displayType === "serverLogs" && (
          <ul className="space-y-2">
            {items.slice().map((log) => (
              <li
                key={log.id}
                className="flex items-center space-x-2 ml-4 mb-2"
              >
                <span className={`flex-none w-12 ${getLevelColor(log.level)} font-bold`}>
                  [{log.level}]
                </span>
                <span className="flex-none text-gray-info w-44">
                  {formatDate(log.date)}
                </span>
                <span className="w-full text-foreground break-words text-wrap overflow-hidden">{log.message}</span>
              </li>
            ))}
          </ul>
        )}

        {displayType === "serverLogs" && hasMore && (
          <div ref={loaderRef} className="text-center text-gray-info py-4">
            Loading more logs...
          </div>
        )}
        {!hasMore && displayType === "serverLogs" && (
          <p className="text-center text-gray-info py-4">
            No more logs to display.
          </p>
        )}
      </div>
    </div>
  );
}
