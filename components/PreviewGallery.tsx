"use client";

import { useEffect, useRef, useState } from "react";
import { PreviewDisplay } from "./PreviewDisplay";

export function PreviewGallery({ fetchFunction }) {
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState(false);

  const pageSize = 15;
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const loaderRef = useRef(null);

  const fetchMorePics = async () => {
    try {
      setLoading(true);
      const newPreviews = await fetchFunction(currentPage, pageSize);
      if (newPreviews.length < pageSize) {
        setHasMore(false);
      }
      setCurrentPage((prev) => prev + 1);
      setPreviews([...previews, ...newPreviews]);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchMorePics();
        }
      },
      { threshold: 0.8 },
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

  if (error) {
    return <div className="text-center">Error while fetching previews</div>;
  }
  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-wrap gap-1">
        {previews.map((preview, index) => (
          <PreviewDisplay key={index} preview={preview} />
        ))}
        {hasMore && (
          <div
            ref={loaderRef}
            className="flex w-full items-center justify-center"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-info border-t-foreground"></div>
          </div>
        )}
      </div>
    </div>
  );
}
