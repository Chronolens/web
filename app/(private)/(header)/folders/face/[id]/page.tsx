"use client";
import { PreviewGallery } from "@/components/PreviewGallery";
import { fetchFacePreviewsPaged } from "@/lib/network/network";

export default function FacePage({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <PreviewGallery
      fetchFunction={(page: number, pagesize: number) =>
        fetchFacePreviewsPaged(id, page, pagesize)
      }
    />
  );
}
