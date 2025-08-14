import { FeaturedBottom } from "@/types/client/news.types";
import Image from "next/image";
import Link from "next/link";

const FeatureBottom = ({
  title,
  category,
  slug,
  newsType,
  thumbnail,
  author,
}: FeaturedBottom) => {
  return (
    <div className="relative w-full max-lg:border-b max-lg:pb-8">
      <Link href={`/${newsType}/${category}/${slug}`} className="">
        <figure className="w-full relative aspect-video max-h-[300px] max-lg:hidden">
          <Image
            src={thumbnail as string}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            className="object-center rounded"
          />
        </figure>

        <div
          className="max-lg:hidden absolute bottom-0 w-full h-[70%] bg__gradient"
          style={{
            zIndex: 1, // To ensure overlay is above the background image
          }}
        />

        <div className="text-news-headline lg:text-white lg:absolute lg:bottom-5 lg:left-5 px-5 lg:z-2  w-full h-fit">
          <span className="text-sm capitalize">{category}</span>
          <h2 className="text-2xl font-bold news__title my-1">{title}</h2>
          <p className="text-base">
            <span className="max-lg:text-gray-500">by</span> {author.name}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default FeatureBottom;
