"use client";
import LoadingSkeleton from "@/components/loading/LoadingSkeleton";
import NoDataFound from "@/components/Shared/NoDataFound";
import PaginationPage from "@/components/Shared/PaginationPage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllTrashedNewsQuery } from "@/features/news/allTrashedNews/allTrashedNewsAPI";
import { useMoveNewsToTrashMutation } from "@/features/news/moveNewsToTrashAPI/moveNewsToTrashAPI";
import { stripHtml } from "@/utils/stripHtml";
import { cn, dateFormater } from "@/utils/utils";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";

const TrashedNews = () => {
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { data, isLoading } = useGetAllTrashedNewsQuery({ page });
  const [moveNewsToTrash] = useMoveNewsToTrashMutation();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-10 mt-10">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }

  if (!data) return <NoDataFound />;

  const { data: trashedNews, pagination } = data;

  const handleSelectIds = (id: string) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id]
    );
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      // যদি চেক করা হয়, তাহলে বর্তমান পেজের সবগুলোর আইডি state-এ সেট করুন
      const allIds = trashedNews.map((news) => news._id);
      setSelectedIds(allIds);
    } else {
      // যদি আন-চেক করা হয়, তাহলে state খালি করে দিন
      setSelectedIds([]);
    }
  };

  const numSelected = selectedIds.length;
  const rowCount = trashedNews.length;
  const itemsPerPage = 20;

  // ================= move to trash by id =================
  const moveToTrash = async () => {
    try {
      const { data } = await moveNewsToTrash(selectedIds);
      if (data?.success) {
        Swal.fire({
          title: "Moved to Trash!",
          text: data.message,
          icon: "success",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          title: "Failed",
          text: error.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <div>
      <div className="overflow-hidden">
        <div className="mb-10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={
                numSelected > 0 && numSelected < rowCount
                  ? "indeterminate"
                  : numSelected === rowCount && rowCount > 0
              }
              onCheckedChange={handleSelectAllClick}
            />{" "}
            <span>Selected All</span>
          </div>

          <div
            className={cn(
              "flex transition-all duration-300 ease-in-out overflow-hidden", // বেস স্টাইল এবং ট্রানজিশন
              {
                "opacity-100 translate-x-0": selectedIds.length > 0, // দেখানোর জন্য স্টাইল
                "opacity-0 translate-x-full pointer-events-none":
                  selectedIds.length === 0, // লুকানোর জন্য স্টাইল
              }
            )}
          >
            <Button
              onClick={moveToTrash}
              className="bg-red-600 hover:bg-red-600/60 cursor-pointer"
            >
              <Trash2 /> <span>Delete All</span>
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]"></TableHead>
              <TableHead className="w-[100px]">Sl No</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>News Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          {/* ================== table body ================ */}
          <TableBody>
            {trashedNews.slice(0, itemsPerPage).map((news, index) => {
              const isItemSelected = selectedIds.includes(news._id);
              const serialNumber = (page - 1) * itemsPerPage + index + 1;
              return (
                <TableRow key={news._id}>
                  <TableCell>
                    <Checkbox
                      checked={isItemSelected}
                      onCheckedChange={() => handleSelectIds(news._id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{serialNumber}</TableCell>
                  <TableCell className="text-xl font-title font-semibold truncate max-w-[300px]">
                    {news.title}
                  </TableCell>
                  <TableCell className="truncate max-w-[300px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {stripHtml(news.description)}
                  </TableCell>
                  <TableCell className="capitalize">{news.category}</TableCell>
                  <TableCell className="capitalize">{news.newsType}</TableCell>
                  <TableCell>
                    <span
                      className={twMerge(
                        "p-2 rounded-lg capitalize",
                        news.status === "published"
                          ? "bg-[#00C62C]/10 text-[#00C62C]"
                          : "bg-[#FFA82E]/10 text-[#FFA82E]"
                      )}
                    >
                      {news.status}
                    </span>
                  </TableCell>
                  <TableCell>{dateFormater(news.createdAt)}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button className="bg-blue-500">
                      <Link href={`/dashboard/editNews/${news.slug}`}>
                        Edit
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div>
          <PaginationPage
            page={page}
            setPage={setPage}
            totalPages={pagination?.totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default TrashedNews;
