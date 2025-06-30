import DashboardAllNews from "@/components/dashboard/DashboardAllNews/DashboardAllNews";
import Header from "@/components/dashboard/DashboardAllNews/Header";



const page = async () => {
  
  return (
    <div className="p-5">
      <Header />
      <div className="mt-16">
        <DashboardAllNews />
      </div>
    </div>
  );
};

export default page;
