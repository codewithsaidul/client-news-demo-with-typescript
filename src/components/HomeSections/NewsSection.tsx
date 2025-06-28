import { HomeNewsProps } from "@/types/client/news.types";
import { dateFormater } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

const NewsSection = ( { allNews }: HomeNewsProps ) => {
  return (
    <div className="min-[500px]:p-4 bg-news-white-bg xl:shadow-[0_0px_4px_rgba(0,0,0,0.15)] rounded-lg h-fit">
      <div className="flex flex-col w-full gap-5 sm:flex-row xl:flex-col">
        {allNews.slice(5, 7).map((news, index) => (
          <div key={index} className="w-full pr-4">
            <figure className="relative w-full aspect-video max-h-[300px]">
              <Image
                src={news.thumbnail}
                alt={news.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                className="object-center rounded"
              />
            </figure>
            <div className="mt-2">
              <Link
                href={`/${news.newsType}/${news.category}/${news.slug}`}
                className="text-2xl font-bold font-title"
              >
                {news.title}
              </Link>
              <p className="text-lg mt-0.5 text-news-text">
                <span className="font-bold max-sm:text-sm max-md:text-base">
                  {news.author.name}
                </span>

                <span className="mx-2">|</span>

                <span className="max-sm:text-sm max-md:text-base">
                  {dateFormater(news.createdAt)}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewsSection