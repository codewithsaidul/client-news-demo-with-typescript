import Banner from "@/components/Shared/Banner";
import AllMagazine from "./AllMagazine";

const page = () => {
  return (
    <div>
      <Banner title="magazine" color="bg-news-headline" />
      {/* all news */}
      <AllMagazine />
    </div>
  );
};

export default page;
