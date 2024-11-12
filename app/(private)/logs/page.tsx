"use client";

import React, { useState, useEffect, useRef } from "react";
import { fetchLogs } from "@/lib/network/network";
import Cookies from "js-cookie";

const InfiniteScrollExample1 = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); // Track loading state
  const [routeHistory, setRouteHistory] = useState([]);

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
    if (loading || !hasMore) return; // Skip fetch if already loading or no more data

    setLoading(true); // Set loading to true while fetching
    fetchLogs(indexRef.current, pageSize)
      .then((res) => {
        if (Array.isArray(res)) {
          // Step 1: Get maxDate and minDate from the fetched response
          const dates = res.map((item) => item.date);
          const maxDate = Math.max(...dates);
          const minDate = Math.min(...dates);

          // Step 2: Filter routeHistory items by date range (minDate to maxDate)
          let filteredRouteHistory = [];
          if (indexRef.current === 1) {
            // first page may have more recent requests made
            filteredRouteHistory = routeHistory.filter(
              (entry) => entry.date <= maxDate && entry.date >= minDate,
            );
          } else {
            if (res.length < pageSize) {
              // last page may have older requests made
              filteredRouteHistory = routeHistory.filter(
                (entry) => entry.date >= minDate,
              );
            } else {
              filteredRouteHistory = routeHistory.filter(
                (entry) => entry.date >= minDate && entry.date <= maxDate,
              );
            }
          }

          // Step 3: Create itemsToDisplay by merging filteredRouteHistory and res
          const itemsToDisplay = [...filteredRouteHistory, ...res].sort(
            (a, b) => b.date - a.date,
          ); // Sort by date in descending order

          // Step 4: Update the items state with itemsToDisplay
          setItems((prevItems) => {
            const uniqueItems = [...new Set([...prevItems, ...itemsToDisplay])];
            return uniqueItems;
          });

          // If the returned response length is less than the pageSize, set hasMore to false
          if (res.length < pageSize) {
            setHasMore(false);
          }
          indexRef.current += 1; // Increment indexRef for the next fetch

          console.log(routeHistory);
        } else {
          console.error("Response data is not an array", res);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false)); // Set loading to false after fetching
  };

  useEffect(() => {
    // Retrieve and sort routeHistory from cookies on mount
    const actions = Cookies.get("routeHistory")
      ? JSON.parse(Cookies.get("routeHistory")).sort((a, b) => b.date - a.date)
      : [];
    setRouteHistory(actions);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchMoreData();
        }
      },
      { threshold: 1.0 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loading]);

  return (
    <div className="overflow-auto">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Route History</h2>
        <ul className="space-y-2">
          {routeHistory.length > 0 ? (
            routeHistory.map((entry, index) => (
              <li key={index} className="flex items-center space-x-2 ml-4 mb-2">
                <span className={`${getLevelColor(entry.level)} font-bold`}>
                  [{entry.level}]
                </span>
                <span className="text-gray-700">{entry.message}</span>
                <span className="text-gray-500">
                  - {formatDate(entry.date)}
                </span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No route history available.</p>
          )}
        </ul>
      </div>

      <h2 className="text-xl font-bold">Log Data</h2>
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

      {hasMore ? (
        <div ref={loaderRef} className="text-center text-gray-500 py-4">
          Loading more logs...
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4">
          No more logs to display.
        </p>
      )}
    </div>
  );
};

export default InfiniteScrollExample1;
