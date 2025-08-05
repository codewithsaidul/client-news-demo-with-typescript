import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface Heading {
  title: string;
  link: string;
}

const Heading = ({ title, link }: Heading) => {
  return (
    <div className="mb-16 flex justify-between items-center gap-3">
      <h2 className="text-2xl min-[500px]:text-3xl min-sm:text-4xl inline news__title font-bold text-news-headline duration-300 hover:duration-300">
        {title}
      </h2>

      <Link href={link} className="flex items-center gap-1 text-lg">
        View All
        <span>
          <IoIosArrowForward size={20} />
        </span>
      </Link>
    </div>
  );
};

export default Heading;
