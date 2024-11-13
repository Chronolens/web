"use client";

import React, { useState, useEffect, useRef } from "react";
import { fetchLogs } from "@/lib/network/network";
import Cookies from "js-cookie";

const InfiniteScrollExample1 = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [routeHistory, setRouteHistory] = useState([]);
  const [displayType, setDisplayType] = useState("serverLogs");

  const pageSize = 3;
  const indexRef = useRef(1);
  const loaderRef = useRef(null);

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "error":
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

  const fetchMoreData = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    fetchLogs(indexRef.current, pageSize)
      .then((res) => {
        if (Array.isArray(res)) {
          const dates = res.map((item) => item.date);
          const maxDate = Math.max(...dates);
          const minDate = Math.min(...dates);

          let filteredRouteHistory = [];
          if (indexRef.current === 1) {
            filteredRouteHistory = routeHistory.filter(
              (entry) => entry.date <= maxDate && entry.date >= minDate
            );
          } else {
            if (res.length < pageSize) {
              filteredRouteHistory = routeHistory.filter(
                (entry) => entry.date >= minDate
              );
            } else {
              filteredRouteHistory = routeHistory.filter(
                (entry) => entry.date >= minDate && entry.date <= maxDate
              );
            }
          }

          const itemsToDisplay = [...filteredRouteHistory, ...res].sort(
            (a, b) => b.date - a.date
          );

          setItems((prevItems) => {
            const uniqueItems = [...new Set([...prevItems, ...itemsToDisplay])];
            return uniqueItems;
          });

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
      { threshold: 0.8 }
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
    <div className="h-screen flex flex-col">
      <div className="flex space-x-4 p-4">
        <button
          onClick={() => setDisplayType("sessionLogs")}
          className={`px-4 py-2 font-bold ${
            displayType === "sessionLogs" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
          }`}
        >
          Session Logs
        </button>
        <button
          onClick={() => setDisplayType("serverLogs")}
          className={`px-4 py-2 font-bold ${
            displayType === "serverLogs" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
          }`}
        >
          Server Logs
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-4">
        {displayType === "sessionLogs" && (
          <div className="space-y-2">
            <div className="max-h-full overflow-y-auto">
              <ul className="space-y-2">
                {routeHistory.length > 0 ? (
                  routeHistory.map((entry, index) => (
                    <li key={index} className="flex items-center space-x-2 ml-4 mb-2">
                      <span className={`${getLevelColor(entry.level)} font-bold`}>
                        [{entry.level}]
                      </span>
                      <span className="text-gray-700">{entry.message}</span>
                      <span className="text-gray-500">- {formatDate(entry.date)}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No route history available.</p>
                )}
              </ul>
            </div>
          </div>
        )}

        {displayType === "serverLogs" && (
          <div className="space-y-2">
            <div className="max-h-full overflow-y-auto">
              <ul className="space-y-2">
                {items.slice().map((log) => (
                  <li key={log.id} className="flex items-center space-x-2 ml-4 mb-2">
                    <span className={`${getLevelColor(log.level)} font-bold`}>
                      [{log.level}]
                    </span>
                    <span className="text-gray-700">{log.message}</span>
                    <span className="text-gray-500">- {formatDate(log.date)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {displayType === "serverLogs" && hasMore && (
          <div ref={loaderRef} className="text-center text-gray-500 py-4">
            Loading more logs...
          </div>
        )}
        {!hasMore && displayType === "serverLogs" && (
          <p className="text-center text-gray-500 py-4">
            No more logs to display.
          </p>
        )}
      </div>
    </div>
  );
};

export default InfiniteScrollExample1;
