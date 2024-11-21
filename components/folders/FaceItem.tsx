"use client";

import { useRouter } from "next/navigation";
import { ImageOrError } from "./ImageOrError";

export function FaceItem({ face }) {
  const router = useRouter();
  return (
    <div
      key={face.face_id}
      className="cursor-pointer"
      onClick={() => router.push(`/folders/face/${face.face_id}`)}
    >
      <div className="relative h-48 w-72">
        <ImageOrError image_url={face.photo_link} />
      </div>
      <span className="flex w-full mt-3 text-foreground text-xl"> {face.name} </span>
    </div>
  );
}
