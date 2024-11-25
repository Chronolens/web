import { fetchMediaById } from "@/lib/network/network";
import Image from "next/image";
import cameraIcon from "@/public/static/icons/Aperture.svg";
import imageIcon from "@/public/static/icons/ImageSquare.svg";
import cloudIcon from "@/public/static/icons/Cloud.svg";
import locationIcon from "@/public/static/icons/MapPin.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { FullScaleImage } from "@/components/FullScaleImage";
import { formatDate, humanFileSize } from "@/lib/utils";

export default async function MediaDisplay({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const media = await fetchMediaById(id);

  console.log(media);
  const file_size = media.file_size ? humanFileSize(media.file_size) : null;
  const date = formatDate(media.created_at);
  return (
    <div className="h-full py-11 px-6 ">
      <div className="flex flex-row items-center justify-center h-full">
        <div className={`relative h-full w-full`}>
          <FullScaleImage media_url={media.media_url} />
        </div>
        <div className="flex-none w-80 bg-gradient-metadata h-full">
          <h1 className="text-foreground text-xl mx-3 mt-4">{date}</h1>
          <div className="flex flex-col mx-4 mt-20 space-y-10 ">
            <MetadataItem
              icon={imageIcon}
              label={media.file_name}
              value={
                media.image_width && media.image_length
                  ? media.image_width + " x " + media.image_length
                  : null
              }
            />
            <MetadataItem
              icon={cameraIcon}
              label={
                media.make && media.model
                  ? media.make + " " + media.model
                  : null
              }
              value={
                "f/" +
                media.fnumber +
                " - " +
                media.exposure_time +
                " - ISO " +
                media.photographic_sensitivity
              }
            />
            <MetadataItem icon={cloudIcon} label={`On cloud (${file_size})`} />
            <MetadataItem
              icon={locationIcon}
              label={media.latitude && media.longitude ? "Location" : null}
              value={media.latitude + ", " + media.longitude}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetadataItem({
  icon,
  label,
  value,
}: {
  icon: StaticImport;
  label: string | null;
  value?: string | null;
}) {
  if (!label) return null;
  return (
    <div className="flex flex-row">
      <Image src={icon} alt="" height={30} width={30} />
      <div className="flex flex-col w-full ml-2 justify-center overflow-hidden break-words">
        <span className="text-sm">{label}</span>
        {value && <span className="text-xs text-gray-400">{value}</span>}
      </div>
    </div>
  );
}
