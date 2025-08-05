import { FeaturedNews } from "@/types/client/news.types";
import { dateFormater } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

const FeatureSideNews = ({ featuredNews }: FeaturedNews) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-5 w-full">
        {featuredNews.length > 0 &&
          featuredNews.map((news) => (
            <div
              key={news._id}
              className="w-full flex items-center gap-3 border-b pb-10"
            >
              <figure className="relative w-full aspect-square max-w-32 max-h-24">
                <Image
                  src={news.thumbnail as string}
                  alt={news.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                  className="object-center rounded"
                />
              </figure>
              <div className="mt-2">
                <Link
                  href={`/${news.newsType}/${news.category}/${news.slug}`}
                  className="text-sm min-[450px]:text-xl news__title text-news-headline font-semibold line-clamp-2"
                >
                  {news.title}
                </Link>
                <p className="text-lg mt-0.5 text-news-text">
                  <span className="font-bold text-sm min-sm:text-base">
                    {news.author.name}
                  </span>

                  <span className="mx-2">|</span>

                  <span className="text-sm min-sm:text-base">
                    {dateFormater(news.createdAt)}
                  </span>
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeatureSideNews;
