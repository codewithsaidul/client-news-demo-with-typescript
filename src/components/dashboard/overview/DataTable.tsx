"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OverviewNews } from "@/types/client/news.types";
import { stripHtml } from "@/utils/stripHtml";
import { dateFormater } from "@/utils/utils";
import { twMerge } from "tailwind-merge";


interface OverviewProps {
  allNews: OverviewNews[]
}

const DataTable = ( { allNews }: OverviewProps) => {


  return (
    <div className="mt-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allNews.slice(0, 15).map((news, index) => (
            <TableRow key={news._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="text-xl font-title font-semibold truncate max-w-[300px]">{news.title}</TableCell>
              <TableCell className="truncate max-w-[300px]">{stripHtml(news.description)}</TableCell>
              <TableCell className="capitalize">{news.newsType}</TableCell>
              <TableCell>{dateFormater(news.createdAt)}</TableCell>
              <TableCell className="text-right">
                <span className={twMerge("p-2 rounded-lg capitalize",
                    news.status === "published" ? "bg-[#00C62C]/10 text-[#00C62C]" : "bg-[#FFA82E]/10 text-[#FFA82E]"
                )}>
                    {news.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
