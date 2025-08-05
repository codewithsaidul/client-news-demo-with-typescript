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
import { useDeleteDraftNewsMutation } from "@/features/news/deleteDraft/deleteDraftNewsAPI";
import { useGetAllDratQuery } from "@/features/news/getAllDraft/getAllDraftAPI";
import { deleteNewsHandler } from "@/utils/deleteNews";
import { stripHtml } from "@/utils/stripHtml";
import { cn, dateFormater } from "@/utils/utils";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";

const DraftNews = () => {
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { data, isLoading } = useGetAllDratQuery({ page });
  const [deleteDraftNews] = useDeleteDraftNewsMutation();

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

  const { data: draftNews, pagination } = data;

  const handleSelectIds = (id: string) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id]
    );
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const allIds = draftNews.map((news) => news._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const numSelected = selectedIds.length;
  const rowCount = draftNews.length;
  const itemsPerPage = 20;

  console.log(draftNews);

  // ================= permanent delete by id or ids =================
  const handlePermanentDeleteNews = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await deleteNewsHandler(selectedIds, deleteDraftNews, () => {
        setSelectedIds([]); // ✅ selectedIds reset
      });
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

          {/* ============= delete & resote btn */}
          {draftNews.length > 0 && (
            <div className="flex items-center gap-3">
              {/* ================= delete btn */}
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
                  onClick={handlePermanentDeleteNews}
                  className="bg-red-600 hover:bg-red-600/60 cursor-pointer"
                >
                  <Trash2 /> <span>Delete All</span>
                </Button>
              </div>
            </div>
          )}
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
            {draftNews.slice(0, itemsPerPage).map((news, index) => {
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
                  <TableCell className="text-xl news__title font-semibold truncate max-w-[300px]">
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
                    <Button className="bg-green-500 hover:bg-green-500">
                      <Link href={`/dashboard/updateDraft/${news.slug}`}>
                        Re-Post
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {draftNews.length === 0 && <NoDataFound />}

        {draftNews.length > 19 && (
          <div>
            <PaginationPage
              page={page}
              setPage={setPage}
              totalPages={pagination?.totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DraftNews;
