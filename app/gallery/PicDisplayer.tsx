import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchPreviewById, fetchFullSyncData } from "../lib/network/network";
import Image from "next/image";

const PhotoDisplayer = () => {
  const [hashes, setHashes] = useState([]);
  const [pictures, setPictures] = useState([]);

  const pageSize = 20;
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
      fetchedHashes.sort((a, b) => b.timestamp - a.timestamp);

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
    <div id="scrollableDiv" className="overflow-auto h-full w-screen">
      <InfiniteScroll
        dataLength={pictures.length} // amount of elems to call each time //pictures.length
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
};

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

function PreviewDisplay({ key, picture }) {
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
      key={key}
      src={"/images/image-placeholder.jpg"}
      alt={`Photo ID: ${picture.id}`}
      className="object-cover max-w-80 h-52"
    />
  ) : (
    <img
      key={key}
      src={previewUrl}
      alt={`Photo ID: ${picture.id}`}
      className="object-cover max-w-80 h-52"
    />
  );
}

export default PhotoDisplayer;
