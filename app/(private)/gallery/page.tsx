"use client";
import { fetchPreviewsPaged } from "@/lib/network/network";
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

// function PreviewDateSection({ pictures }: { pictures: any[] }) {
//   const groupByDate = pictures.reduce((acc, picture) => {
//     const currentDate = new Date(picture.timestamp).toDateString();
//     if (!acc[currentDate]) {
//       acc[currentDate] = [];
//     } else {
//       acc[currentDate].push(picture);
//     }
//     return acc;
//   });
//   return (
//     {pictures.map((groupByDate, index) => (
//       <h1 className="text-2xl font-bold">{.toDateString()}</h1>
//         <div className="flex flex-wrap gap-1">
//           {pictures.map((picture, index) => (
//             <PreviewDisplay key={index} picture={picture} />
//           ))}
//     </div>
//     ))}
//   );
// }
//

function PreviewDisplay({ preview }) {
  return <img src={preview} />;
}
