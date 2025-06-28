import LoadingSkeleton from "@/components/loading/LoadingSkeleton";
import Search from "@/components/SearchPage/Search";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense
      fallback={
        <div>
          <LoadingSkeleton />
        </div>
      }
    >
      <Search />
    </Suspense>
  );
};

export default page;
