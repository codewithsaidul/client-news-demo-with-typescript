"use client";
import { useGetSingleNewsQuery } from "@/features/news/getSingleNews/singleNewsAPI";
import { INewsDetails } from "@/types/client/news.types";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import { dateFormater } from "@/utils/utils";
import { CircleUserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import SimilarNews from "./SimilarNews";
import ShareBtn from "./ShareBtn";

const topicsData = [
  { name: "Innovation", href: "/category/innovation" },
  { name: "Entrepreneurs", href: "/category/entrepreneurs" },
  { name: "Leadership", href: "/category/leadership" },
  { name: "Investing", href: "/category/investing" },
  { name: "Billionaires", href: "/category/billionaires" },
];

const NewsDetails = () => {
  const { slug } = useParams();
  const { data: news, isLoading } = useGetSingleNewsQuery(slug as string);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-10 my-10 min-h-screen mt-32">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="flex justify-center items-center min-h-[90vh]">
        <p className="text-3xl font-semibold news__title">News not found</p>
      </div>
    );
  }

  const {
    title,
    slug: newsSlug,
    description,
    thumbnail,
    newsType,
    // tags,
    category,
    createdAt,
    author,
  }: INewsDetails = news;

  // const cleanDescription = sanitizeHtml(description, {
  //   allowedTags: [
  //     "p",
  //     "b",
  //     "i",
  //     "em",
  //     "strong",
  //     "ul",
  //     "ol",
  //     "li",
  //     "a",
  //     "img",
  //     "h1",
  //     "h2",
  //     "h3",
  //     "br",
  //   ],
  //   allowedAttributes: {
  //     img: ["src", "alt", "width", "height", "style"],
  //     a: ["href", "target", "rel"],
  //   },
  //   transformTags: {
  //     a: (_tagName: string, attribs: Record<string, string>) => {
  //       return {
  //         tagName: "a",
  //         attribs: {
  //           ...attribs,
  //           target: "_blank",
  //           rel: "noopener noreferrer",
  //         },
  //       };
  //     },
  //   },
  // });

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${newsType}/${category}/${slug}`

  return (
    <div className="mt-32 min-h-screen">
      <div className="px-4 container mx-auto">
        <div>
          <p className="text-base sm:text-lg font-normal font-news-title text-news-headline capitalize">
            {category}
          </p>
          <h1 className="my-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl news__title font-semibold">
            {title}
          </h1>

          <div className="flex items-center gap-1">
            <div>
              <CircleUserIcon size={20} />
            </div>

            <p className="text-xs text-news-headline">
              By{" "}
              <span className="font-news-title font-semibold">
                {author.name}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="border-b flex justify-between items-center pb-5">
            <span className="text-news-headline">{dateFormater(createdAt)}</span>

            {/* <div className="flex items-center gap-3 flex-wrap">
              {tags.map((tag, index: number) => (
                <span key={index} className="text-news-headline">
                  #{tag}
                </span>
              ))}
            </div> */}

            <ShareBtn title={title} url={shareUrl} />
          </div>
        </div>

        <div className="mt-10">
          {/* ===================== image ============================== */}
          <figure className="relative aspect-video w-full max-h-[300px] min-h-[200px] md:max-h-[400px] lg:max-h-[500px] xl:max-h-[600px]">
            <Image
              src={thumbnail as string}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              className="object-center"
            />
          </figure>

          {/* =============== description ====================== */}
          <div
            className="text-news-headline text-lg mt-8 tiptap-content"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }}
          />

          {/* ================== similar News =============== */}
          <div className="my-10">
            <h2 className="text-3xl text-news-headline font-bold">More From Forbes</h2>
            <SimilarNews
              slug={newsSlug}
              category={category}
              newsType={newsType}
            />
          </div>

          {/* ============ news detail footer ============= */}
          <div className="border-t pt-10">
            <div className="flex items-center gap-2">
              <div>
                <CircleUserIcon size={24} />
              </div>

              <p className="text-base sm:text-lg font-normal">
                By <span className="news__title font-bold">{author.name}</span>
              </p>
            </div>

            <div className="border-t border-b border-red-500 py-5 mt-10">
              <div className="flex flex-wrap justify-center items-center gap-5">
                {topicsData.map((topic, idx) => (
                  <Link
                    key={idx}
                    href={topic.href}
                    className="text-base md:text-lg hover:text-rose-500"
                  >
                    {topic.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
