"use client";
import EditForm from "@/components/dashboard/updateNews/EditForm";
import LoadingSkeleton from "@/components/loading/LoadingSkeleton";
import { useGetSingleNewsQuery } from "@/features/news/getSingleNews/singleNewsAPI";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const EditNews = () => {
  const { slug } = useParams();
  const {
    data: singleNews,
    isLoading,
    refetch,
  } = useGetSingleNewsQuery(slug as string, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  useEffect(() => {
    if (slug) {
      refetch();
    }
  }, [slug, refetch]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-10 my-10 px-6">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }

  if (!singleNews) {
    return <div>Error: Could not find the article.</div>;
  }

  return (
    <div className="p-5">
      <div className="border-b pb-5">
        <h2 className="text-4xl news__title font-bold">Update News</h2>
      </div>

      <div className="mt-16">
        <EditForm singleNews={singleNews} actionType="update" />
      </div>
    </div>
  );
};

export default EditNews;
