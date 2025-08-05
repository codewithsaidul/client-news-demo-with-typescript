import { useGetAllNewsQuery } from "@/features/news/allNews/allNewsAPI";
import { dateFormater } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

interface ISimilarNews {
  category: string;
  newsType: string;
  slug: string;
}

const SimilarNews = ({ category, newsType, slug }: ISimilarNews) => {
  const { data, isLoading } = useGetAllNewsQuery({
    page: 1,
    newsType: newsType,
    category: category,
    limit: 3,
  });

  if (isLoading) return <div>....</div>;

  if (!data) {
    <div>
      <p>No Similar news found!</p>
    </div>;
  }

  const similarNews = data?.data.filter((news) => news.slug !== slug);

  return (
    <div className="grid w-full grid-cols-1 gap-5 mt-16">
      {similarNews?.map((news, index) => (
        <div
          key={news._id}
          className={`flex w-full gap-5 ${
            index === similarNews.length - 1 ? "border-0 pb-0" : "border-b pb-7"
          }`}
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
          <div className="flex mt-2">
            <div className="w-full md:w-[80%]">
              <Link
                href={`/${news.newsType}/${news.category}/${news.slug}`}
                className="text-base font-medium sm:text-xl news__title line-clamp-2"
              >
                {news.title}
              </Link>
              <p className="text-base mt-0.5 text-news-text flex items-center gap-2">
                By
                <span className="font-bold">{news.author.name}</span>
              </p>
              <p className="text-base mt-0.5 text-news-text flex items-center gap-2">
                {dateFormater(news.createdAt)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimilarNews;
