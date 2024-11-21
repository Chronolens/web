"use client";

import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PreviewDisplay } from "./PreviewDisplay";

export function PreviewGallery({ fetchFunction }) {
  const [previews, setPictures] = useState([]);
  const containerRef = useRef(null);
  const initialLoad = useRef(true);

  const pageSize = 30;
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMorePics = async () => {
    try {
      const previews = await fetchFunction(currentPage, pageSize);
      if (previews.length < pageSize) {
        setHasMore(false);
      }
      setCurrentPage((prev) => prev + 1);
      setPictures((prev) => [...prev, ...previews]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchMorePics();
    };
    if (initialLoad.current) {
      fetchInitialData();
      initialLoad.current = false;
    }
  }, []);
  return (
    <div id="scrollableDiv" ref={containerRef} className="h-full overflow-auto">
      <InfiniteScroll
        dataLength={previews.length}
        next={fetchMorePics}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        <div className="flex flex-wrap gap-1">
          {previews.map((preview, index) => (
            <PreviewDisplay key={index} preview={preview} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
