"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import ToolBar from "./ToolBar";
import Link from "@tiptap/extension-link";
import { TableBubbleMenu } from "./TableBubbleMenu";
import { useEffect } from "react";

// 👇 নতুন ধাপ: Link এক্সটেনশনটিকে extend করে একটি কাস্টম এক্সটেনশন তৈরি করুন
const CustomLink = Link.extend({
  // এইখানে inclusive: false সেট করতে হবে
  inclusive: false,
});

interface RichRextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichRextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-3",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-3",
        },
      }),
      Highlight,
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader, // <-- নিশ্চিত করুন এটি এখানে আছে
      TableCell,
      CustomLink.configure({
        autolink: true,
        openOnClick: false,
        linkOnPaste: true,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "min-h-[300px] border rounded-md bg-slate-50 py-2 px-3",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);


  if (!editor) {
    return null;
  }

  return (
    <div className="editor-container">
      <ToolBar editor={editor} />
      <TableBubbleMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
