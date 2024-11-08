"use client";
import { fetchFullSyncData, fetchPreviewById } from "@/lib/network/network";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function GalleryPage() {
  const [hashes, setHashes] = useState([]);
  const [pictures, setPictures] = useState([]);

  const pageSize = 40;
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchMorePics = async () => {
    const localPreviews = [];
    let itemNumber = (currentPage + 1) * pageSize;
    if (itemNumber > hashes.length) {
      setHasMore(false);
      itemNumber = hashes.length;
    }
    for (let i = currentPage * pageSize; i < itemNumber; i++) {
      const current = hashes[i];
      localPreviews.push(current);
    }
    setPictures([...pictures, ...localPreviews]);
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedHashes = await fetchFullSyncData();
      console.log(fetchedHashes[0]);
      fetchedHashes.sort((a, b) => b.created_at - a.created_at);

      const localPreviews = [];
      let itemNumber = (currentPage + 1) * pageSize;
      if (itemNumber > fetchedHashes.length) {
        setHasMore(false);
        itemNumber = fetchedHashes.length;
      }
      for (let i = currentPage * pageSize; i < itemNumber; i++) {
        const current = fetchedHashes[i];
        localPreviews.push(current);
      }
      setPictures([...pictures, ...localPreviews]);
      setCurrentPage(currentPage + 1);
      setHashes(fetchedHashes);
    };

    fetchData();
  }, []);

  return (
    <div id="scrollableDiv" className="h-full overflow-auto">
      <InfiniteScroll
        dataLength={pictures.length}
        scrollableTarget="scrollableDiv"
        next={fetchMorePics}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="flex flex-wrap gap-1">
          {pictures.map((picture, index) => (
            <PreviewDisplay key={index} picture={picture} />
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

function PreviewDisplay({ picture }) {
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const previewUrl = await fetchPreviewById(picture.id);
        setPreviewUrl(previewUrl);
      } catch (error) {
        setError(error);
      }
    };
    fetchPreview();
  }, []);
  return error ? (
    <img
      src={"/static/images/image-placeholder.jpg"}
      alt={`Photo ID: ${picture.id}`}
      className="h-52 max-w-80 object-cover"
    />
  ) : (
    <img src={previewUrl} alt="" className="h-52 max-w-80 object-cover" />
  );
}
