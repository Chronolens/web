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
    if (hashes.length < currentPage * pageSize) {
      setHasMore(false);
    } else {
      setCurrentPage(currentPage + 1);
      const localPreviews = [];
      for (let i = 0; i < currentPage * pageSize; i++) {
        const current = hashes[i];
        // const previewUrl = await fetchPreviewById(current.id);
        const pic = {
          id: current.id,
          created_at: current.created_at,
          hash: current.hash,
          url: previewUrl,
        };
        localPreviews.push(pic);
      }
      setPictures([...pictures, ...localPreviews]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedHashes = await fetchFullSyncData();

      const localPreviews = [];
      // fetch initial preview array
      for (let i = 0; i < pageSize; i++) {
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
        console.log(previewUrl);
        localPreviews.push(pic);
      }
      setHashes(fetchedHashes);
      setPictures(localPreviews);
    };
    fetchData();
  }, []);

  if (pictures == []) {
    return <div> yeye</div>;
  } else {
    return (
      <InfiniteScroll
        dataLength={pictures.length} // amount of elems to call each time //pictures.length
        next={fetchMorePics}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>You reached the end</b>
          </p>
        }
      >
        {pictures.map((picture, index) => (
          <div style={{ cursor: "pointer" }} key={index}>
            <img
              src={picture.url}
              alt={`Photo ID: ${picture.id}`}
              style={{ width: "30%", borderRadius: "8px" }}
            />
          </div>
        ))}
      </InfiniteScroll>
    );
  }
};

export default PhotoDisplayer;
