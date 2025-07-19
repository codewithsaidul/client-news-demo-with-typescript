// components/TableBubbleMenu.tsx

import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Columns,
  Rows,
  ArrowDown,
  ArrowRight,
  Combine,
} from "lucide-react";

interface TableBubbleMenuProps {
  editor: Editor;
}

// const initialPosition = { top: -1000, left: -1000 };

export const TableBubbleMenu = ({ editor }: TableBubbleMenuProps) => {
  // const [position, setPosition] = useState(initialPosition);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const handleUpdate = () => {
      const isTable = editor.isActive("table");
      if (!isTable) {
        setIsMenuVisible(false);
        return;
      }

      // const { from } = editor.state.selection;
      // const pos = editor.view.coordsAtPos(from);

      // // 👇 নতুন স্মার্ট পজিশনিং লজিক
      // const menuWidth = 340; // মেন্যুটির আনুমানিক প্রস্থ পিক্সেল-এ
      // const viewportWidth = window.innerWidth;

      // let left = pos.left;

      // // যদি মেন্যুটি ডানদিকে ওভারফ্লো করে
      // if (left + menuWidth > viewportWidth) {
      //   // তাহলে মেন্যুটিকে ডানদিক থেকে নির্দিষ্ট দূরত্বে বসাও
      //   left = viewportWidth - menuWidth - 16; // ডানদিক থেকে ১৬ পিক্সেল প্যাডিং
      // }

      // setPosition({ top: pos.bottom + 10, left }); // লেখার নিচে দেখানোর জন্য pos.bottom ব্যবহার করা হলো
      setIsMenuVisible(true);
    };

    editor.on("selectionUpdate", handleUpdate);
    editor.on("blur", () => setIsMenuVisible(false));

    return () => {
      editor.off("selectionUpdate", handleUpdate);
      editor.off("blur");
    };
  }, [editor]);

  if (!isMenuVisible) return null;

  const menuOptions = [
    {
      action: () => editor.chain().focus().mergeOrSplit().run(),
      icon: <Combine className="size-4" />,
      label: "Merge/Split",
    },
    {
      action: () => editor.chain().focus().addRowAfter().run(),
      icon: <ArrowDown className="size-4" />,
      label: "Add Row After",
    },
    {
      action: () => editor.chain().focus().addColumnAfter().run(),
      icon: <ArrowRight className="size-4" />,
      label: "Add Col After",
    },
    {
      action: () => editor.chain().focus().deleteRow().run(),
      icon: <Rows className="size-4" />,
      label: "Delete Row",
    },
    {
      action: () => editor.chain().focus().deleteColumn().run(),
      icon: <Columns className="size-4" />,
      label: "Delete Col",
    },
    {
      action: () => editor.chain().focus().deleteTable().run(),
      icon: <Trash2 className="size-4" />,
      label: "Delete Table",
    },
  ];

  return (
    <div
      style={{ top: "30px", left: "30px" }}
      className="absolute z-[100] flex items-center gap-1 bg-white border border-slate-200 rounded-md shadow-lg p-1"
    >
      {menuOptions.map((option, index) => (
        <Button
          key={index}
          variant="ghost"
          size="icon"
          onClick={option.action}
          title={option.label}
        >
          {option.icon}
        </Button>
      ))}
    </div>
  );
};
