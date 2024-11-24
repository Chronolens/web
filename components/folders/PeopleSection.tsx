import { fetchFaces } from "@/lib/network/network";
import { ClusterItem } from "./ClusterItem";
import { FaceItem } from "./FaceItem";

export async function PeopleSection() {
  const faces = await fetchFaces();
  console.log(faces);
  return (
    <>
      <h2 className="text-2xl"> People </h2>
      <div className="flex flex-row mt-4 overflow-auto h-[245px] w-full space-x-8">
        {faces.faces.map((face) => (
          <FaceItem key={face.face_id + face.name} face={face} />
        ))}
        {faces.clusters.map((cluster) => (
          <ClusterItem key={cluster.cluster_id} cluster={cluster} />
        ))}
      </div>
    </>
  );
}
