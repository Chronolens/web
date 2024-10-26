import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchPreviewById, fetchFullSyncData } from "../lib/network/network";
import Image from "next/image";

const PhotoDisplayer = () => {
  const [hashes, setHashes] = useState([]);
  const [pictures, setPictures] = useState([]);

  const pageSize = 30;
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchMorePics = async () => {
    const localPreviews = [];
    let itemNumber = (currentPage + 1) * pageSize;
    if (itemNumber > hashes.length) {
      setHasMore(false);
      itemNumber = hashes.length;
    }
    let previewUrl =
      "https://photutorial.com/wp-content/uploads/2023/04/Featured-image-AI-image-generators-by-Midjourney.png";
    for (let i = currentPage * pageSize; i < itemNumber; i++) {
      const current = hashes[i];
      try {
        previewUrl = await fetchPreviewById(current.id);
      } catch (error) {
        console.log(error);
      }
      const pic = {
        id: current.id,
        created_at: current.created_at,
        hash: current.hash,
        url: previewUrl,
      };
      localPreviews.push(pic);
    }
    setPictures([...pictures, ...localPreviews]);
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedHashes = await fetchFullSyncData();
      const localPreviews = [];
      let itemNumber = (currentPage + 1) * pageSize;
      if (itemNumber > fetchedHashes.length) {
        setHasMore(false);
        itemNumber = fetchedHashes.length;
      }
      for (let i = currentPage * pageSize; i < itemNumber; i++) {
        const current = fetchedHashes[i];
        let previewUrl =
          "https://photutorial.com/wp-content/uploads/2023/04/Featured-image-AI-image-generators-by-Midjourney.png";
        try {
          previewUrl = await fetchPreviewById(current.id);
        } catch (error) {
          console.log(error);
        }
        const pic = {
          id: current.id,
          created_at: current.created_at,
          hash: current.hash,
          url: previewUrl,
        };
        localPreviews.push(pic);
      }
      setPictures([...pictures, ...localPreviews]);
      setCurrentPage(currentPage + 1);
      setHashes(fetchedHashes);
    };

    fetchData();
  }, []);

  return (
    <div id="scrollableDiv" className="overflow-auto h-screen w-screen">
      <InfiniteScroll
        dataLength={pictures.length} // amount of elems to call each time //pictures.length
        scrollableTarget="scrollableDiv"
        next={fetchMorePics}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>You reached the end</b>
          </p>
        }
      >
        <div className="flex flex-wrap gap-1">
          {pictures.map((picture, index) => (
            <img
              key={index}
              src={picture.url}
              alt={`Photo ID: ${picture.id}`}
              style={{ height: "200px", borderRadius: "8px" }}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PhotoDisplayer;
