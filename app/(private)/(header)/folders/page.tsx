import { fetchFaces } from "@/lib/network/network";
import Image from "next/image";

export default async function FoldersPage() {
  const faces = await fetchFaces();
  console.log("Faces fetched:", faces); // Check the faces array content
  return (
    <div className="flex h-full w-full">
      <div className="flex flex-col">
        <h2 className="text-2xl"> People </h2>
        <div className="flex flex-row mt-4 overflow-auto h-[250px] w-screen space-x-2">
          {faces.faces.map((face) => (
            <div key={face.id}>
              <div className="relative h-48 w-72">
                <img
                  src={face.photo_link}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex w-full justify-center"> {face.name} </div>
            </div>
          ))}
          {faces.clusters.map((cluster) => (
            <div key={cluster.id}>
              <div className="relative h-48 w-72">
                <img
                  src={cluster.photo_link}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex w-full justify-center"> {cluster.name} </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
