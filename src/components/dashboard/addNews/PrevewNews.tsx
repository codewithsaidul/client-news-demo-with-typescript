import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NewsPreviewModalProps } from "@/types/client/news.types";
import Image from "next/image";
import React from "react";

 export const NewsPreviewModal: React.FC<NewsPreviewModalProps> = ({ newsData, thumbnailPreviewUrl, onPost, onSaveDraft, loadingAction }) => {
  const { title, category, description, tags } = newsData;
    const isAnyActionLoading = loadingAction !== null;
  return (
    <DialogContent className="sm:max-w-5xl w-full max-h-[90vh] flex flex-col p-0">
      <DialogHeader className="p-6 pb-0 flex flex-col items-center text-center">
        <DialogTitle className="text-2xl text-center">News Preview</DialogTitle>
        <DialogDescription>
          See How look the news
        </DialogDescription>
      </DialogHeader>
      
      <div className="flex-grow overflow-y-auto mt-20">
        <figure className="relative aspect-video w-full">
          <Image
            src={thumbnailPreviewUrl}
            alt={title || 'Thumbnail preview'}
            fill
            className="w-full h-full object-cover"
          />
        </figure>

        <div className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 py-8">
          <h1 className="my-5 text-3xl sm:text-4xl md:text-5xl font-semibold line-clamp-2">
            {title || 'News Title'}
          </h1>

          <div className="flex items-center gap-5 mt-5">
            <div className="flex items-center gap-3 flex-wrap">
              {tags && tags.map((tag, index: number) => (
                <span key={index} className="text-gray-500">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 min-[525px]:gap-8 mt-3 border-b pb-4 mb-8">
            <p className="text-lg font-medium capitalize">
              Category: <span className="font-semibold">{category.replace(/-/g, ' ')}</span>
            </p>
            <p className="text-md">
              Writter: <span className="font-bold">Admin</span>
            </p>
            <p className="text-gray-500 text-sm">Date: <span className="font-bold">01-01-1970</span></p>
          </div>

          <div
            className="prose max-w-none text-lg"
            dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br />') }}
          />
        </div>
      </div>

      <DialogFooter   className="border-t p-6 bg-gray-50">
        <Button variant="outline" onClick={onSaveDraft} disabled={isAnyActionLoading} className="cursor-pointer">
          {loadingAction === "draft" ? 'Adding on Draft' : 'Draft'}
        </Button>
        <Button onClick={onPost} disabled={isAnyActionLoading} className="cursor-pointer">
          {loadingAction === "post" ? 'Adding News' : 'Post'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};


