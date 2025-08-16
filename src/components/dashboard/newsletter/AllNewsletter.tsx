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
import {
  useDeleteNewsLetterMutation,
  useGetAllNewsletterQuery,
} from "@/features/newsletter/newsletterApi";
import { deleteNewsHandler } from "@/utils/deleteNews";
import { stripHtml } from "@/utils/stripHtml";
import { cn, dateFormater } from "@/utils/utils";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const AllNewsletter = () => {
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { data, isLoading } = useGetAllNewsletterQuery(page);
  const [deleteNewsLetter] = useDeleteNewsLetterMutation();

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

  const { data: newsletters, pagination } = data;

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
      const allIds = newsletters.map((newsletter) => newsletter._id);
      setSelectedIds(allIds);
    } else {
      // যদি আন-চেক করা হয়, তাহলে state খালি করে দিন
      setSelectedIds([]);
    }
  };

  const numSelected = selectedIds.length;
  const rowCount = newsletters.length;
  const itemsPerPage = 20;

  // ================= move to trash by id =================
  const moveToTrash = async () => {
    deleteNewsHandler(selectedIds, deleteNewsLetter, () => {
      setSelectedIds([]); // ✅ selectedIds reset
    });
  };


  return (
    <div>
      {newsletters.length > 0 ? (
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
                <TableHead>name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            {/* ================== table body ================ */}
            <TableBody>
              {newsletters.slice(0, itemsPerPage).map((newsletter, index) => {
                const isItemSelected = selectedIds.includes(newsletter._id);
                const serialNumber = (page - 1) * itemsPerPage + index + 1;
                return (
                  <TableRow key={newsletter._id}>
                    <TableCell>
                      <Checkbox
                        checked={isItemSelected}
                        onCheckedChange={() => handleSelectIds(newsletter._id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {serialNumber}
                    </TableCell>
                    <TableCell className="text-xl news__title font-semibold truncate max-w-[300px]">
                      {newsletter.name}
                    </TableCell>
                    <TableCell className="truncate max-w-[300px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {stripHtml(newsletter.email)}
                    </TableCell>

                    <TableCell>{dateFormater(newsletter.createdAt)}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        className="bg-red-500 cursor-pointer"
                        onClick={() => handleSelectIds(newsletter._id)}
                      >
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {newsletters.length > 20 && (
            <div>
              <PaginationPage
                page={page}
                setPage={setPage}
                totalPages={pagination?.totalPages}
              />
            </div>
          )}
        </div>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};

export default AllNewsletter;
