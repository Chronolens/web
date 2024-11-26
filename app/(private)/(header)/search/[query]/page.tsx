"use client";
import { PreviewGallery } from "@/components/PreviewGallery";
import { fetchSearchPreviewsPaged } from "@/lib/network/network";

export default function SearchPage({ params }: { params: { query: string } }) {
  const query = params.query;
  if (query === "") return null;
  return <PreviewGallery
      fetchFunction={(page: number, pagesize: number) =>
        fetchSearchPreviewsPaged(query, page, pagesize)
      }
  />;
}
