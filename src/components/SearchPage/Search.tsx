"use client";
import { useSearchParams } from "next/navigation";

import { useGetSearchNewsQuery } from "@/features/news/searchNews/searchNewsAPI";
import { INews } from "@/types/client/news.types";
import { stripHtml } from "@/utils/stripHtml";
import { dateFormater } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import PaginationPage from "../Shared/PaginationPage";

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("s");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetSearchNewsQuery({
    searchTerm: query,
    page: page,
  });

  if (isLoading) {
    return (
      <div className="grid w-full grid-cols-1 gap-10 mt-32 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-h-screen">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }

  const { data: allNews, pagination } = data;

  return (
    <div className="px-4 mt-32 container mx-auto">
      <div className="pb-10 border-b border-orange-400/50">
        <p className="text-xl font-medium news__title">
          Showing {pagination.total} result for:{" "}
        </p>
        <p className="mt-5 text-3xl font-semibold md:text-4xl news__title">
          {query}
        </p>
      </div>

      {allNews.length > 0 ? (
        <div>
          <div className="mt-24 grid grid-cols-1 max-[850px]:gap-y-20 gap-10">
            {allNews.map((news: INews) => (
              <div key={news._id} className="pb-12 border-b">
                <div className="flex max-[850px]:flex-col flex-row max-[850px]:order-2 gap-7">
                  {/* news date */}
                  <div className="max-[850px]:w-full max-[850px]:order-3 w-[10%]">
                    <span>{dateFormater(news.createdAt)}</span>
                  </div>

                  {/* news tite & description */}
                  <div className="max-[850px]:w-full max-[850px]:order-2 w-[65%] space-y-3">
                    <Link
                      href={`/${news.newsType}/${news.category}/${news.slug}`}
                    >
                      <h2 className="mb-5 text-2xl news__title hover:underline">
                        {news.title}
                      </h2>
                    </Link>
                    <p className="line-clamp-3">
                      {stripHtml(news.description)}
                    </p>
                    <p className="text-lg">
                      By <span className="font-bold">{news.author.name}</span>
                    </p>
                  </div>

                  <figure className="max-[850px]:w-full max-[850px]:order-1 w-[20%]">
                    <Link
                      href={`/${news.newsType}/${news.category}/${news.slug}`}
                    >
                      <Image
                        src={news.thumbnail as string}
                        alt={news.title}
                        width={300}
                        height={400}
                        className="object-cover w-full h-auto"
                      />
                    </Link>
                  </figure>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <PaginationPage
              page={page}
              setPage={setPage}
              totalPages={pagination?.totalPages}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-2xl text-center text-gray-600">
            No results match your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;
