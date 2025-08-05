import DraftNews from "@/components/dashboard/draft/DraftNews";

const page = () => {
  return (
    <div className="p-5">
      <div className="flex justify-between items-center border-b pb-7">
        <h2 className="text-3xl font-bold news__title">Draft</h2>
      </div>

      <div className="mt-16">
        <DraftNews />
      </div>
    </div>
  );
};

export default page;
