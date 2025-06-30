"use client";
import NoDataFound from "@/components/Shared/NoDataFound";
import LoadingSkeleton from "@/components/loading/LoadingSkeleton";
import { useGetAllNewsQuery } from "@/features/news/allNews/allNewsAPI";
import DataTable from "./DataTable";
import NewsCard from "./NewsCard";

const Overview = () => {
  const { data, isLoading } = useGetAllNewsQuery({ page: 1 });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-10 mt-10 ml-5">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }

  if (!data) return <NoDataFound />;

  const { data: news, pagination } = data;

  return (
    <div className="mt-5 px-10">
      <h1 className="text-4xl text-news-text font-medium font-title border-b pb-4">
        Dashboard
      </h1>

      <div className="mt-20">
        <NewsCard
          published={pagination.published}
          unpublished={pagination.unpublished}
          totalNews={pagination.total}
        />
        <DataTable allNews={news} />
      </div>
    </div>
  );
};

export default Overview;
