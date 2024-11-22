"use client";
import { PreviewGallery } from "@/components/PreviewGallery";
import { fetchSearchPreviewsPaged } from "@/lib/network/network";

export default function SearchPage({ params }: { params: { query: string } }) {
  const query = params.query;
  if (query === "") return null;
  const fetchFunction = (page: number, pageSize:number) => {
    fetchSearchPreviewsPaged(query, page, pageSize);
  };
  return <PreviewGallery fetchFunction={fetchFunction} />;
}
