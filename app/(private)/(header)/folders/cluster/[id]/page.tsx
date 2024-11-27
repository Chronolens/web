"use client";

import { PreviewGallery } from "@/components/PreviewGallery";
import { fetchClusterPreviewsPaged } from "@/lib/network/network";

export default function ClusterPage({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <PreviewGallery
      fetchFunction={(page: number, pagesize: number) =>
        fetchClusterPreviewsPaged(id, page, pagesize)
      }
    />
  );
}
