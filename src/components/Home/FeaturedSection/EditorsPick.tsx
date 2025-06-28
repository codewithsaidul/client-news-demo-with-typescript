import { EditorPick } from "@/types/client/news.types";
import Link from "next/link";

const EditorsPick = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/allNews?priority=isEditorsPick`,
    { next: { tags: ["news-list"] } }
  );
  const data = await res.json();

  const editorsPick = data.data;

  return (
    <div className="mt-10 min-md:mt-32">
      <div className="relative inline-block border-b pb-7 w-full mb-5">
        <h2 className="text-3xl text-rose-500">Editor&apos;s Pick</h2>
        <div className="absolute bottom-0 left-0 w-40 h-0.5 bg-rose-500"></div>
      </div>

      {/* ============ Editor's Pick Container ================== */}
      <div className="mt-5">
        {editorsPick.length > 0 &&
          editorsPick
            .slice(0, 3)
            .map(({ _id, slug, category, title }: EditorPick) => (
              <div key={_id} className="border-b mt-8 pb-5">
                <Link
                  href={`/news/${category}/${slug}`}
                  className="text-2xl text-news-text duration-500 hover:text-rose-500 hover:duration-500 line-clamp-2"
                >
                  {title}
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
};

export default EditorsPick;
