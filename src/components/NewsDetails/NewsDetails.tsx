"use client";
import { useGetSingleNewsQuery } from "@/features/news/getSingleNews/singleNewsAPI";
import { useParams } from "next/navigation";
import { INewsDetails } from "@/types/client/news.types";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import { dateFormater } from "@/utils/utils";
import Image from "next/image";
import LoadingSkeleton from "../loading/LoadingSkeleton";

const NewsDetails = () => {
  const { slug } = useParams();
  const { data: news, isLoading } = useGetSingleNewsQuery(slug as string);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-10 my-10">
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
        <p className="text-3xl font-semibold font-title">News not found</p>
      </div>
    );
  }

  const {
    title,
    description,
    thumbnail,
    tags,
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

  return (
    <div className="mt-20">
      <div>
        <figure className="relative aspect-video w-full max-h-[300px] md:max-h-[400px] lg:max-h-[500px] xl:max-h-[600px]">
          <Image
            src={thumbnail as string}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            className="object-center"
          />
        </figure>

        <div className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32">
          <h1 className="my-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-title font-semibold">
            {title}
          </h1>

          <div className="flex items-center gap-5 mt-5">
            <div className="flex items-center gap-3 flex-wrap">
              {tags.map((tag, index: number) => (
                <span key={index} className="text-gray-400">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 min-[525px]:gap-8 mt-3">
            <p className="text-xl font-medium font-title capitalize">
              Category: <span>{category}</span>
            </p>
            <p className="text-lg font-normal">
              By <span className="font-title font-bold">{author.name}</span>
            </p>
            <span className="text-gray-500">{dateFormater(createdAt)}</span>
          </div>

          <div
            className="text-news-text text-lg mt-8 tiptap-content"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
