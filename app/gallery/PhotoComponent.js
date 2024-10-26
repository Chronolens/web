import { useRouter } from "next/router";

const PhotoComponent = ({ photo, id, createdAt }) => {
  const router = useRouter();

  const handlePhotoClick = () => {
    router.push(`/gallery/photo=${id}`);
  };

  return (
    <div onClick={handlePhotoClick} style={{ cursor: "pointer" }}>
      <img src={photo} alt={`Photo ID: ${id}`} style={{ width: "100%", borderRadius: "8px" }} />
    </div>
  );
};

export default PhotoComponent;
