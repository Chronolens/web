import Image from "next/image";

export async function FullScaleImage({ media_url }: { media_url: string }) {
  return <Image src={media_url} className="object-contain" fill alt="" />;
}
