import AllNewsletter from "@/components/dashboard/newsletter/AllNewsletter";

export default function page () {
  return (
     <div className="p-5">
      <div className="flex justify-between items-center border-b pb-7">
        <h2 className="text-3xl font-bold news__title">Newsletter</h2>
      </div>

      <div className="mt-16">
        <AllNewsletter />
      </div>
    </div>
  );
};
