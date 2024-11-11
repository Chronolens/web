"use client"

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchLogs } from "@/lib/network/network";

const InfiniteScrollExample1 = () => {
  const [items, setItems] = useState([]); // Ensure this is an array initially
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);
  const [pageSize, setPageSize] = useState(15);

  // Function to return the appropriate color for log level
  const getLevelColor = (level: string) => {
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

  const formatDate = (timestamp: string | Date) => {
    return new Date(timestamp).toLocaleString();
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    fetchLogs(index, pageSize).then((res) => {
      console.log("Fetched more logs:", res); // Log the full response to check the structure
      if (Array.isArray(res)) {
        setItems((prevItems) => [...prevItems, ...res]);
        res.length < pageSize ? setHasMore(false) : setHasMore(true);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        console.error("Response data is not an array", res);
      }
    })
    .catch((err) => console.log(err));
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading more logs...</h4>}
      endMessage={<p>No more logs to display.</p>}
      scrollThreshold={0.95}
    >
      <ul className="space-y-2">
        {items && items.map((log) => (
          <li key={log.id} className="flex items-center space-x-2 ml-4 mb-2">
            <span className={`${getLevelColor(log.level)} font-bold`}>
              [{log.level}]
            </span>
            <span className="text-gray-700">{log.message}</span>
            <span className="text-gray-500">- {formatDate(log.date)}</span>
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default InfiniteScrollExample1;
