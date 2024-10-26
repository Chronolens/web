import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchPreviewsByHash, fetchPreviewById, fetchFullSyncData } from "../lib/network/network";
import PhotoComponent from "./PhotoComponent"; // Your custom photo component

const PhotoDisplayer = () => {
  const [hashes, setHashes] = useState([]);
  const [pictures, setPictures] = useState([]);

  const [currentCount, setCurrentCount] = useState(0);
  const [count, setCount] = useState(10);
  const [total, setTotal] = useState(null);

  const fetchPictures = async () => {

      const picData = hashes[currentCount];
      console.log("-> picData: ", picData.id);
      const url = await fetchPreviewById(picData.id);
      const pic = { id: picData.id, created_at: picData.created_at, hash: picData.hash, url: url };

      setPictures((prevPictures) => [...prevPictures, pic]);
      setCurrentCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedHashes = await fetchFullSyncData();
      setHashes(fetchedHashes);
      setTotal(fetchedHashes.length); // amount of total pictures

      // console.log("-> fetched hashes length: ", fetchedHashes.length); 
      // console.log("-> fetched hashes : ", fetchedHashes); 
    };

    fetchData();
  }, []);

  // Use an effect to trigger fetching pictures only after `hashes` is updated
  useEffect(() => {
    if (hashes.length > 0) {
      fetchPictures();
    }
  }, [hashes]);

  return (
    <InfiniteScroll
      dataLength={pictures.length} // amount of elems to call each time //pictures.length
      next={fetchPictures}
      hasMore={currentCount < total}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>You're reached the end</b>
        </p>
      }
    >
      {pictures.map((picture) => (
        <div style={{ cursor: "pointer" }}>
          <img src={picture.url} alt={`Photo ID: ${picture.id}`} style={{ width: "30%", borderRadius: "8px" }} />
        </div>
      ))}
    </InfiniteScroll>
  );
};


export default PhotoDisplayer;
