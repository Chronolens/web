"use client";

import { useRouter } from "next/navigation";
import { ImageOrError } from "./ImageOrError";

export function ClusterItem({ cluster }) {
  const router = useRouter();
  return (
    <div key={cluster.cluster_id} className="cursor-pointer" onClick={() => router.push(`/folders/cluster/${cluster.cluster_id}`)}>
      <div className="relative h-48 w-72">
        <ImageOrError image_url={cluster.photo_link}/>
      </div>
      <div className="flex w-full justify-center"> {cluster.name} </div>
    </div>
  );
}
