"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryMap, CategoryMapKey } from "@/constants/data";
import { useAddDraftMutation } from "@/features/news/addDraft/addDraftAPI";
import { useAddNewsMutation } from "@/features/news/addNews/addNewsAPI";
import { useGetCurrentUserQuery } from "@/features/user/currentUser/currentUserAPI";
import { addFormSchema, NewsFormData } from "@/schema/schema";
import { Category, Status } from "@/types/client/news.types";
import { uploadToImgBB } from "@/utils/uploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { NewsPreviewModal } from "./PrevewNews";
import RichTextEditor from "@/components/RichTextEditor/TextEditor";

const AddNewsForm = () => {
  const { data: currUser } = useGetCurrentUserQuery(undefined);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [addNews] = useAddNewsMutation();
  const [addDraft] = useAddDraftMutation();
  const [loadingAction, setLoadingAction] = useState<"post" | "draft" | null>(
    null
  );
  const [categoryType, setCategoryType] = useState<CategoryMapKey>("news");
  const [isModalOpen, setModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState<NewsFormData | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const router = useRouter();

  // get the react hook form with default values
  const form = useForm({
    resolver: zodResolver(addFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      title: "",
      thumbnail: undefined, // For file input
      description: "",
      tags: [], // This should be updated as user adds tags
      category: "world-news",
      categoryType: "news",
      status: "published", // Or leave as "" if it's mandatory to select
      priority: "none", // Default radio value
      author: { name: "", email: "" },
    },
  });

  // Cleanup the object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [thumbnailPreview]);

  // Sync tags state with form value
  useEffect(() => {
    form.setValue("tags", tags, { shouldValidate: false });
  }, [tags, form]);

  // for adding tags
  // For adding tag:
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim().replace(/,$/, "");
      if (!tags.includes(newTag)) {
        const newTags = [...tags, newTag];
        setTags(newTags);
        form.setValue("tags", newTags, { shouldValidate: true }); // Sync immediately
      }
      setInputValue("");
    }
  };

  // For removing tag:
  const removeTag = (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
    form.setValue("tags", updatedTags, { shouldValidate: true }); // Sync immediately
  };

  // preview handler
  const onPreview: SubmitHandler<FieldValues> = async (data) => {
    const file = data.thumbnail[0];
    const imgUrl = await uploadToImgBB(file);
    setThumbnailPreview(imgUrl);

    setPreviewData({
      title: data.title,
      description: data.description,
      tags: data.tags,
      thumbnail: imgUrl,
      category: data.category,
      categoryType: data.categoryType,
      status: data.status,
      priority: data.priority,
      author: currUser._id,
    });
    setModalOpen(true);
  };

  // ====================== submit news data on db ====================
  // const onSubmit: SubmitHandler<FieldValues> = async (values) => {
  //   setIsLoading(true);
  //   const file = values.thumbnail[0];
  //   const imgUrl = await uploadToImgBB(file);

  //   const newsData = {
  //     title: values.title,
  //     thumbnail: imgUrl,
  //     description: values.description,
  //     tags: values.tags,
  //     category: values.category,
  //     newsType: values.categoryType,
  //     status: values.status,
  //     priority: values.priority,
  //     author: {
  //       name: currUser.name,
  //       email: currUser.email,
  //     },
  //   };

  //   try {
  //     const res = await addNews(newsData).unwrap();

  //     if (res.acknowledged) {
  //       Swal.fire({
  //         title: "News Added successfully!",
  //         icon: "success",
  //       });
  //       setIsLoading(false);
  //       router.push("/dashboard/allNews");
  //     }
  //   } catch {
  //     Swal.fire({
  //       title: "Failed to add news",
  //       icon: "error",
  //     });
  //     setIsLoading(false);
  //   }
  // };

  const handleFinalSubmit = async (status: Status) => {
    setModalOpen(false); // 🟢 modal বন্ধ
    if (!previewData) return;
    const action = status === "published" ? "post" : "draft";
    setLoadingAction(action);

    const newsData = {
      ...previewData,
      newsType: previewData.categoryType,
    };
    try {
      const successMessage =
        action === "post"
          ? "News Added successfully!"
          : "News Added on draft successfully!";
      const res =
        action === "post"
          ? await addNews(newsData).unwrap()
          : await addDraft(newsData).unwrap();
      if (res.acknowledged) {
        Swal.fire({
          title: "Successfully!",
          text: successMessage,
          icon: "success",
        });
        if (action === "post") {
          router.push("/dashboard/allNews");
        } else {
          router.push("/dashboard/allDraftNews");
        }
      }
    } catch {
      setLoadingAction(null)
      const errorMessage =
        status === "published"
          ? "News Posting failed"
          : "Failed to added news on draft";
      Swal.fire({
        title: "Failed",
        text: errorMessage,
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onPreview)}
          className="bg-white shadow-lg w-[70%] p-10 space-y-10"
        >
          {/* news title */}
          <div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>News Title</FormLabel>
                  <FormControl>
                    <Input placeholder="enter news title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* news image */}
          <div className="grid w-full items-center">
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files)} // pass FileList directly}
                      // {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* tags */}
          <div>
            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2 border rounded-md p-2 min-h-[3rem] focus-within:ring-2 ring-primary">
                      {tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="ml-1 text-red-600 hover:text-red-800"
                            aria-label={`Remove tag ${tag}`}
                          >
                            <X size={16} />
                          </button>
                        </Badge>
                      ))}

                      <Input
                        className="border-none shadow-none focus-visible:ring-0 w-auto flex-1 p-0 text-lg"
                        placeholder="Type a tag and press Enter"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* news  type */}
          <div>
            <FormField
              control={form.control}
              name="categoryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Category Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        setCategoryType(value as CategoryMapKey);
                        form.setValue("category", "world-news");
                      }}
                      value={field.value || "news"}
                      className="flex items-center gap-16"
                    >
                      <div className="flex items-center gap-x-3">
                        <RadioGroupItem value="news" />
                        <Label>News</Label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <RadioGroupItem value="life" />
                        <Label>Life</Label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <RadioGroupItem value="list" />
                        <Label>List</Label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <RadioGroupItem value="magazine" />
                        <Label>Magazine</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* news category & status */}
          <div className="flex items-center gap-5">
            {/* news category */}
            {/* Category */}
            <div className="w-full">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value as Category)
                      }
                      value={field.value}
                      defaultValue=""
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
                          {categoryMap &&
                            categoryMap[categoryType].map((cat, idx) => (
                              <SelectItem
                                key={idx}
                                value={cat.toLowerCase().replace(/\s/g, "-")}
                              >
                                {cat}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* news status */}
            <div className="w-full">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue=""
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="published" className="text-lg">
                            Published
                          </SelectItem>
                          <SelectItem value="unpublished" className="text-lg">
                            Unpublished
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* news priority */}
          <div>
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Set Priority Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex items-center gap-16"
                    >
                      <div className="flex items-center gap-x-3">
                        <RadioGroupItem value="none" />
                        <Label>None</Label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <RadioGroupItem value="isFeatured" />
                        <Label>Featured</Label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <RadioGroupItem value="isEditorsPick" />
                        <Label>EditorsPick</Label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <RadioGroupItem value="isBreaking" />
                        <Label>Breaking</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          <div className="mt-20">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* submit button */}
          <div className="w-full mt-20">
            <Button
              type="submit"
              className="w-full text-xl font-medium font-title text-news-white-bg bg-news-dark p-7"
            >
              Add News
            </Button>
          </div>
        </form>
      </Form>

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        {previewData && (
          <NewsPreviewModal
            newsData={previewData}
            thumbnailPreviewUrl={thumbnailPreview}
            onPost={() => handleFinalSubmit("published")}
            onSaveDraft={() => handleFinalSubmit("unpublished")}
            loadingAction={loadingAction}
          />
        )}
      </Dialog>
    </div>
  );
};

export default AddNewsForm;
