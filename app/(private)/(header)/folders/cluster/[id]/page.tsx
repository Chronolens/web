"use client";

import { PreviewGallery } from "@/components/PreviewGallery";
import { fetchClusterPreviewsPaged } from "@/lib/network/network";
import { useParams } from "next/navigation";

export default function ClusterPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <PreviewGallery
      fetchFunction={(page: number, pagesize: number) =>
        fetchClusterPreviewsPaged(id, page, pagesize)
      }
    />
  );
}
