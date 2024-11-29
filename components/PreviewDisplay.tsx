import { useState } from "react";
import { useRouter } from "next/navigation";

export function PreviewDisplay({
  preview,
}: {
  preview: { preview_url: string; id: string };
}) {
  const [error, setError] = useState(false);
  const router = useRouter();
  return (
    <img
      className="object-cover h-[200px] min-w-[130px] max-w-96 cursor-pointer"
      src={
        !error ? preview.preview_url : "/static/images/image-placeholder.jpg"
      }
      alt=""
      onClick={() => router.push(`/gallery/${preview.id}`)}
      onError={() => setError(true)}
    />
  );
}
