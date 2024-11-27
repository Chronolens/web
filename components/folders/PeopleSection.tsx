import { fetchPeople } from "@/lib/network/network";
import { ClusterItem } from "./ClusterItem";
import { FaceItem } from "./FaceItem";

export async function PeopleSection() {
  try {
    const people = await fetchPeople();

    return (
      <>
        <h2 className="text-2xl"> People </h2>
        <div className="flex flex-row mt-4 overflow-auto h-[245px] w-full space-x-8">
          {people.faces.map((face) => (
            <FaceItem key={face.face_id + face.name} face={face} />
          ))}
          {people.clusters.map((cluster) => (
            <ClusterItem key={cluster.cluster_id} cluster={cluster} />
          ))}
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
    return <div> There was an error while fetching people...</div>;
  }
}
