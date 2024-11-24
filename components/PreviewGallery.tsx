"use client";

import { useEffect, useRef, useState } from "react";
import { PreviewDisplay } from "./PreviewDisplay";

export function PreviewGallery({ fetchFunction }) {
  const [loading, setLoading] = useState(false);
  const [previews, setPictures] = useState([]);

  const pageSize = 15;
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const loaderRef = useRef(null);

  const fetchMorePics = async () => {
    try {
      setLoading(true);
      const previews = await fetchFunction(currentPage, pageSize);
      if (previews.length < pageSize) {
        setHasMore(false);
      }
      setCurrentPage((prev) => prev + 1);
      setPictures((prev) => [...prev, ...previews]);
    } catch (error) {
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

  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-wrap gap-1">
        {previews.map((preview, index) => (
          <PreviewDisplay key={index} preview={preview} />
        ))}
      </div>
      {hasMore && (
        <p ref={loaderRef} className="text-center">
          Loading
        </p>
      )}
    </div>
  );
}
