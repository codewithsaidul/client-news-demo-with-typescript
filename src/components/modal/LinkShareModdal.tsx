"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CopyIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShareModalProps {
  url: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LinkShareModdal = ({
  url,
  open,
  setOpen,
}: ShareModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);

    // Close modal after short delay (optional: give user time to see "Copied")
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this news</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md">
            <input
              type="text"
              readOnly
              value={url}
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <Button size="sm" onClick={handleCopy}>
              {copied ? "Copied" : <div className="cursor-pointer"><CopyIcon className="w-4 h-4 cursor-pointer" /></div>}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkShareModdal;
