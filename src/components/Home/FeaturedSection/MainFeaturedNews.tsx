import { FeaturedNews } from "@/types/client/news.types";
import { stripHtmlOnServer } from "@/utils/server-utils";
import Image from "next/image";
import Link from "next/link";
import FeatureBottom from "./FeaturedBottom";

const MainFeaturedNews = ({ featuredNews }: FeaturedNews) => {
  const { slug, title, description, category, newsType, thumbnail } =
    featuredNews[0];

  return (
    <div>
      <div className=" relative w-full">
        <Link href={`/${newsType}/${category}/${slug}`} className="w-full">
          <figure className="w-full relative aspect-video  max-h-[300px] sm:max-h-[500px] overflow-hidden">
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              className="object-center rounded"
            />
          </figure>

          <div className="absolute bottom-0 w-full h-[80%] bg__gradient z-[1]" />

          <div className="text-white absolute bottom-4 left-2 min-[540px]:bottom-12 min-[540px]:left-5 z-2 w-[90%] h-auto">
            {/* max-[430px]:text-xl */}
            <span className="text-base capitalize">{category}</span>
            <h2 className="max-[350px]:text-base sm:text-3xl md:text-4xl font-bold font-title my-2 leading-snug break-words">
              {title}
            </h2>

            <p className="text-base font-medium line-clamp-2">
              {stripHtmlOnServer(description)}
            </p>
          </div>
        </Link>
      </div>

      <div className="mt-16 border-t pt-10 flex flex-col lg:flex-row max-lg:gap-8 gap-5">
        {featuredNews
          .slice(1, 3)
          .map(({ _id, title, category, slug, newsType, thumbnail, author }) => (
            <FeatureBottom
              key={_id}
              title={title}
              category={category}
              slug={slug}
              newsType={newsType}
              thumbnail={thumbnail}
              author={author}
            />
          ))}
      </div>
    </div>
  );
};

export default MainFeaturedNews;
