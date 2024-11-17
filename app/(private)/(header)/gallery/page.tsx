"use client";
import { fetchPreviewsPaged } from "@/lib/network/network";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function GalleryPage() {
  const [previews, setPictures] = useState([]);
  const containerRef = useRef(null);
  const initialLoad = useRef(true);

  const pageSize = 30;
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMorePics = async () => {
    try {
      const previews = await fetchPreviewsPaged(currentPage, pageSize);
      if (previews.length < pageSize) {
        setHasMore(false);
      }
      console.log("currentPage", currentPage);
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

function PreviewDisplay({ preview }) {
  const [error, setError] = useState(false);
  const router = useRouter();
  return (
    <img
      className="object-cover h-[200px] min-w-[130px] max-w-96"
      src={!error ? preview.url : "/static/images/image-placeholder.jpg"}
      alt=""
      onClick={() => router.push(`/gallery/${preview.id}`)}
      onError={() => setError(true)}
    />
  );
}
