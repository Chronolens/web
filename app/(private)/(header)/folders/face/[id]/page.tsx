"use client";
import { PreviewGallery } from "@/components/PreviewGallery";
import { fetchFacePreviewsPaged } from "@/lib/network/network";
import { useParams } from "next/navigation";

export default function FacePage() {
  const { id } = useParams<{ id: string }>();

  return (
    <PreviewGallery
      fetchFunction={(page: number, pagesize: number) =>
        fetchFacePreviewsPaged(id, page, pagesize)
      }
    />
  );
}
