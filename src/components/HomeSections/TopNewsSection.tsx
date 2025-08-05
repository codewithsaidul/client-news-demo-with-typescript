import { HomeNewsProps } from "@/types/client/news.types";
import { dateFormater } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

const TopNewsSection = ({ allNews }: HomeNewsProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-5 mt-16 sm:grid-cols-2">
      {allNews.slice(1, 5).map((news, index) => (
        <div
          key={index}
          className="flex flex-row w-full gap-2 md:flex-col lg:flex-row"
        >
          {/* ===================== image ========================== */}
          <figure className="relative w-full overflow-hidden aspect-square max-w-32 max-h-32">
            <Image
              src={news.thumbnail as string}
              alt={news.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              className="object-cover rounded"
            />
          </figure>

          {/* =================== content ===================== */}
          <div className="flex flex-1 mt-2">
            <div>
              <Link
                href={`/${news.newsType}/${news.category}/${news.slug}`}
                className="text-base font-bold sm:text-xl news__title line-clamp-2"
              >
                {news.title}
              </Link>
              <p className="text-base mt-0.5 text-news-text">
                <span className="font-bold max-sm:text-sm">
                  {news.author.name}
                </span>

                <span className="mx-2">|</span>

                <span className="max-sm:text-sm">
                  {dateFormater(news.createdAt)}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopNewsSection;
