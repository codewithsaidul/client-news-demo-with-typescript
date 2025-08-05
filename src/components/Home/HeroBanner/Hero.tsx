import NoDataFound from "@/components/Shared/NoDataFound";
import { HeroProps } from "@/types/client/news.types";
import { stripHtmlOnServer } from "@/utils/server-utils";
import Image from "next/image";
import Link from "next/link";

const Hero = async ({ hero }: HeroProps) => {
  const breakingNews = hero[0];

  if (!breakingNews) {
    return <div>Data nai</div>;
  }

  return (
    <>
      {hero.length > 0 ? (
        <section className="my-20 max-md:mb-60 h-auto lg:h-screen relative">
          <Link
            href={`/${breakingNews.newsType}/${breakingNews.category}/${breakingNews.slug}`}
            className="w-full h-auto"
          >
            <figure className="relative w-full aspect-square h-auto lg:aspect-auto lg:h-screen">
              <Image
                src={breakingNews.thumbnail as string}
                alt={breakingNews.title}
                fill
                priority
                className="object-center h-screen"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              />
            </figure>

            <div
              className="absolute inset-0 bg-black opacity-50"
              style={{
                zIndex: 1, // To ensure overlay is above the background image
              }}
            />

            <div className="absolute max-md:-bottom-40 left-0 max-md:p-2 min-md:bottom-16 min-md:left-5 text-white min-md:right-10 z-2 h-fit space-y-3 min-lg:w-[60%] max-md:bg-black">
              {/* ========================= category ======================= */}
              <span className="max-[430px]:text-xs text-sm mb-3 capitalize">
                {breakingNews.category}
              </span>

              {/* ========================= title ======================= */}
              <h1 className="max-[430px]:text-xl max-[649px]:text-2xl min-[650px]:text-4xl min-[960px]:text-6xl mt-3 mb-7 font-bold news__title duration-500 hover:underline hover:duration-500 line-clamp-2">
                {breakingNews.title}
              </h1>

              {/* ========================= description ======================= */}
              <p className="max-[430px]:text-sm text-base lg:text-2xl line-clamp-2">
                {stripHtmlOnServer(breakingNews.description)}
              </p>
            </div>
          </Link>
        </section>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default Hero;
