"use client";
import { List, Table } from "lucide-react";
import { Toggle } from "../ui/toggle";
import {
  Heading1,
  Heading2,
  Heading3,
  Code,
  Bold,
  Italic,
  Strikethrough,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Highlighter,
  Upload,
  Link as LinkIcon,
} from "lucide-react";
import { ListOrdered } from "lucide-react";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Editor } from "@tiptap/core";
import { Checkbox } from "../ui/checkbox";
import { uploadToImgBB } from "@/utils/uploadImage";

interface ToolBarProps {
  editor: Editor;
}

export default function ToolBar({ editor }: ToolBarProps) {
  // 👇 ফাইল ইনপুটের জন্য একটি ref তৈরি করুন
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  // ইনপুট বক্সের URL রাখার জন্য state
  const [linkUrl, setLinkUrl] = useState("");

  // 👇 টেবিল ডায়ালগের জন্য নতুন state
  const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [withHeader, setWithHeader] = useState(true);

  if (!editor) return null;

  // এই ফাংশনটি আপনার Quill কোডের 'onchange' এর সমতুল্য
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // equivalent to: const url = await uploadToImgBB(file);
      const url = await uploadToImgBB(file); 
      console.log(url)
      
      // equivalent to: q.insertEmbed(range.index, "image", url);
      editor.chain().focus().setImage({ src: url }).run();

    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image");
    }
  };

  // 👇 টেবিল তৈরি করার নতুন ফাংশন
  const handleCreateTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({
        rows: tableRows,
        cols: tableCols,
        withHeaderRow: withHeader,
      })
      .run();
    setIsTableDialogOpen(false);
  };

  // লিংক বাটনে ক্লিক করলে ডায়ালগ বক্স খুলবে
  const handleLinkButtonClick = () => {
    const previousUrl = editor.getAttributes("link").href;
    if (previousUrl) {
      setLinkUrl(previousUrl);
    }
    setIsLinkDialogOpen(true);
  };

  // ডায়ালগ বক্সের "Save" বাটনে ক্লিক করলে লিংক সেট হবে
  const handleSaveLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    setIsLinkDialogOpen(false);
    setLinkUrl("");
  };

  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preesed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      preesed: editor.isActive("code"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive("highlight"),
    },
    {
      icon: <LinkIcon className="size-4" />,
      onClick: () => handleLinkButtonClick(),
      preesed: editor.isActive("link"),
    },
    {
      icon: <Upload className="size-4" />,
      onClick: () => fileInputRef.current?.click(),
      preesed: editor.isActive("image"),
    },
    {
      icon: <Table className="size-4" />,
      onClick: () => setIsTableDialogOpen(true),
      preesed: editor.isActive("table"),
    },
  ];

  return (
    <div className="border rounded-md p-1.5 mb-1 bg-slate-50 space-x-1 sticky  top-10 z-50">
      {Options.map((option, i) => (
        <Toggle
          // variant="outline"
          key={i}
          size="lg"
          pressed={option.preesed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}

      {/* 👇 এই লুকানো ফাইল ইনপুটটিই মূল কাজ করবে */}
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/jpeg, image/png, image/gif, image/webp"
        style={{ display: "none" }}
      />

      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter URL</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Input
              id="link-url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSaveLink();
                }
              }}
            />
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveLink}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* টেবিল ডায়ালগ বক্স */}
      <Dialog open={isTableDialogOpen} onOpenChange={setIsTableDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Table</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            {/* Rows and Columns Input */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="rows">Rows</Label>
              <Input
                id="rows"
                type="number"
                value={tableRows}
                onChange={(e) => setTableRows(parseInt(e.target.value, 10))}
                min="1"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="cols">Columns</Label>
              <Input
                id="cols"
                type="number"
                value={tableCols}
                onChange={(e) => setTableCols(parseInt(e.target.value, 10))}
                min="1"
              />
            </div>
          </div>
          {/* 👇 নতুন চেকবক্স */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="header-row"
              checked={withHeader}
              onCheckedChange={(checked) => setWithHeader(checked as boolean)}
            />
            <Label htmlFor="header-row">Include header row</Label>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleCreateTable}>
              Create Table
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
