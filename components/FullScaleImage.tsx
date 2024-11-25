export async function FullScaleImage({
  media_url = "",
}: {
  media_url: string;
}) {
  return (
    <img src={media_url} className="w-full h-full object-contain" alt="" />
  );
}
