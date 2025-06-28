import { PageHeroProps } from "@/types/client/news.types";
import { stripHtml } from "@/utils/stripHtml";
import Image from "next/image";
import Link from "next/link";

const HeroSection = ({ news }: PageHeroProps) => {


  return (
    <div className="flex flex-col min-[900px]:flex-row min-[900px]:items-center gap-5">
      <Link href={`/${news.newsType}/${news.category}/${news.slug}`} className="w-full min-[900px]:w-[40%]">
        <h2 className="text-news-headline font-bold max-sm:text-4xl text-6xl font-title">
          {news.title}
        </h2>
        <p className="text-xl font-medium text-news-text my-3 line-clamp-5">{stripHtml(news.description)}</p>
        <p className="flex items-center gap-1 text-base">
          <span className="font-bold">by</span>
          {news.author.name}
        </p>
      </Link>

      <Link href="#" className="w-full min-[900px]:w-[60%]">
        <figure className="relative w-full max-h-[600px] aspect-square overflow-hidden">
          <Image
            src={news.thumbnail}
            alt={news.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            className="object-center rounded"
          />
        </figure>
      </Link>
    </div>
  );
};

export default HeroSection;
