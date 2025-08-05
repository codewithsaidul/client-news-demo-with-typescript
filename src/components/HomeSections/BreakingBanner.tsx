import { Button } from "@/components/ui/button";
import { BreakingBannerProps } from "@/types/client/news.types";
import { dateFormater } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

const BreakingBanner = ({ news }: BreakingBannerProps) => {
  return (
    <div>
      <figure className="relative aspect-video w-full max-h-[300px] sm:max-h-[500px]">
        <Image
          src={news.thumbnail as string}
          alt={news.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          className="object-center rounded"
        />
        <Button className="text-xl news__title py-5 px-7 absolute -bottom-4  left-1/2 transform -translate-x-1/2 capitalize">
          {news.category}
        </Button>
      </figure>

      <div className="text-center mt-8">
        <Link
          href={`/${news.newsType}/${news.category}/${news.slug}`}
          className="text-2xl min-[350px]:text-3xl md:text-5xl font-bold news__title text-news-headline"
        >
          {news.title}
        </Link>

        <p className="text-lg mt-5 text-news-text">
          <span className="font-bold">{news.author.name}</span>

          <span className="mx-2">|</span>

          <span>{dateFormater(news.createdAt)}</span>
        </p>
      </div>
    </div>
  );
};

export default BreakingBanner;
