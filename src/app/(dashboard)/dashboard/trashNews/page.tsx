import TrashedNews from "@/components/dashboard/TrashedNews/TrashedNews";


const page = async () => {
  return (
    <div className="p-5">
      <div className="flex justify-between items-center border-b pb-7">
        <h2 className="text-3xl font-bold font-title">Trashed News</h2>
      </div>
      <div className="mt-16">
        <TrashedNews />
      </div>
    </div>
  );
};

export default page;
