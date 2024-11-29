import { fetchPreviewsPaged } from "@/lib/network/network";
import { PreviewGallery } from "@/components/PreviewGallery";

export default function GalleryPage() {
  return <PreviewGallery fetchFunction={fetchPreviewsPaged} />;
}
