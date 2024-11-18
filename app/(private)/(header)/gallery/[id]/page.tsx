import { fetchMediaById } from "@/lib/network/network";
import Image from "next/image";
import cameraIcon from "@/public/static/icons/Aperture.svg";
import imageIcon from "@/public/static/icons/ImageSquare.svg";
import cloudIcon from "@/public/static/icons/Cloud.svg";
import locationIcon from "@/public/static/icons/MapPin.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Suspense } from "react";
import { FullScaleImage } from "@/components/FullScaleImage";

export default async function MediaDisplay({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const media = await fetchMediaById(id);

  return (
    <div className="h-full py-11 px-6 ">
      <div className="flex flex-row items-center justify-center h-full">
        <div className="relative h-full w-full">
          <FullScaleImage media_url={media} />
        </div>
        <div className="flex-none w-80 bg-gradient-metadata h-full">
          <h1 className="text-foreground text-xl mx-3 mt-4">
            {new Date().toLocaleString()}
          </h1>
          <div className="flex flex-col mx-4 mt-20 space-y-10 ">
            <MetadataItem
              icon={cameraIcon}
              label="Canon EOS 5D Mark IV"
              value="f/1.9 - 1/100 - 7.5mm - ISO 400"
            />
            <MetadataItem
              icon={imageIcon}
              label="IMG3124_14_07_2024_24215221_242.jpg"
              value="16.0MP - 6000 x 4000"
            />
            <MetadataItem icon={cloudIcon} label="Cloud Coverage" value="0%" />
            <MetadataItem
              icon={locationIcon}
              label="Location"
              value="32.711581, -16.852452"
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
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-row">
      <Image src={icon} alt="" height={30} width={30} />
      <div className="flex flex-col ml-2 justify-center">
        <span className="text-sm">{label}</span>
        <span className="text-xs text-gray-400">{value}</span>
      </div>
    </div>
  );
}
