"use client";

import { useState } from "react";

export function ImageOrError({ image_url = "" }: { image_url: string }) {
  const [error, setError] = useState(false);
  return (
    <img
      className="w-full h-full object-cover"
      src={!error ? image_url : "/static/images/image-placeholder.jpg"}
      alt=""
      onError={() => setError(true)}
    />
  );
}
