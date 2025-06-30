"use client";

import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Quill's default snow theme CSS
import { uploadToImgBB } from "@/utils/uploadImage";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  const editorRef = useRef(null);
  const [quill, setQuill] = useState<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quill) {
      const q = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["image", "link"],
            ], // Use external toolbar
            handlers: {
              image: async function () {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.click();

                input.onchange = async () => {
                  if (input.files && input.files[0]) {
                    const file = input.files[0];
                    if (file) {
                      try {
                        const range = q.getSelection(true);
                        // Upload image to ImgBB
                        const url = await uploadToImgBB(file);
                        // Insert image into editor at cursor position
                        q.insertEmbed(range.index, "image", url);
                        // Move cursor after image
                        q.setSelection(range.index + 1);
                      } catch (error) {
                        console.error("Image upload failed:", error);
                        alert("Failed to upload image");
                      }
                    }
                  }
                };
              },
            },
          },
        },
      });

      q.on("text-change", () => {
        onChange(q.root.innerHTML);
      });

      if (value) {
        q.root.innerHTML = value;
      }

      setQuill(q);
    }
  }, [editorRef, quill, onChange, value]);

  // Sync from parent value
  useEffect(() => {
    if (quill && value !== quill.root.innerHTML) {
      quill.root.innerHTML = value || "";
    }
  }, [value, quill]);

  return (
    <div className="bg-white rounded-md p-2">
      {/* Editor Container */}
      <div
        ref={editorRef}
        className="min-h-[140px] max-h-[300px] overflow-auto"
        style={{ outline: "none" }}
      />
    </div>
  );
}
