import { PageCardProps } from "@/types/client/news.types";
import { stripHtml } from "@/utils/stripHtml";
import Image from "next/image";
import Link from "next/link";

const ArticaleCard = ({ allNews }: PageCardProps) => {
  return (
    <div className="grid grid-cols-1 gap-10 mt-16">
      {allNews.slice(4, 8).map((news) => (
        <div key={news._id} className="pb-10 border-b">
          <Link
            href={`/${news.newsType}/${news.category}/${news.slug}`}
            className="flex items-center gap-5"
          >
            <div className="w-[20%]">
              <figure className="relative w-full overflow-hidden max-h-60 aspect-square">
                <Image
                  src={news.thumbnail as string}
                  alt={news.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-center rounded"
                />
              </figure>
            </div>

            <div className="mt-5 space-y-2 w-[80%]">
              <h2 className="font-bold tex-xl sm:text-2xl news__title ">
                {news.title}
              </h2>
              <p className="text-lg font-medium text-gray-400 line-clamp-4">
                {stripHtml(news.description)}
              </p>
              <p className="flex items-center gap-1 text-gray-400">
                by
                <span className="font-bold news__title">
                  {news.author.name}
                </span>
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ArticaleCard;
