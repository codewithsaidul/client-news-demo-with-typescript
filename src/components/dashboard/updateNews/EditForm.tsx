"use client";
import RichTextEditor from "@/components/RichTextEditor/TextEditor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { useDraftToRePostMutation } from "@/features/news/draftToRePost/draftToRePostAPI";
import { useUpdateNewsMutation } from "@/features/news/update/updateNewsAPI";
import { editFormSchema } from "@/schema/schema";
import { INews } from "@/types/client/news.types";
import { uploadToImgBB } from "@/utils/uploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface UpdateNewsParams {
  singleNews: INews;
  actionType: "post" | "update";
}

const EditForm = ({ singleNews, actionType }: UpdateNewsParams) => {
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [categoryType, setCategoryType] = useState<CategoryMapKey>(
    singleNews?.newsType || "news"
  );

  const [updateNews] = useUpdateNewsMutation();
  const [draftToRePost] = useDraftToRePostMutation();
  const router = useRouter();

  // get the react hook form with default values
  const form = useForm({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      title: "",
      thumbnail: undefined,
      description: "",
      tags: [],
      category: singleNews?.category || "",
      categoryType: singleNews?.newsType || "",
      status: singleNews?.status || "unpublished",
      priority: "isFeatured",
    },
  });

  // add value on form
  useEffect(() => {
    if (singleNews) {
      form.reset({
        title: singleNews.title,
        thumbnail: singleNews.thumbnail,
        description: singleNews.description,
        tags: singleNews.tags || [],
        category: singleNews.category || "",
        categoryType: singleNews?.newsType || "",
        status: singleNews.status,
        priority: singleNews.priority,
      });
      setTags(singleNews.tags || []);
    }
  }, [singleNews, form]);

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

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);
    let imgUrl = singleNews.thumbnail; // thumbnail url from db

    if (
      values.thumbnail &&
      values.thumbnail.length > 0 &&
      values.thumbnail[0] instanceof File
    ) {
      const file = values.thumbnail[0];
      imgUrl = await uploadToImgBB(file); // new thumbnail url
    }

    // slug: slugify(values.title),
    const newsData = {
      title: values.title,
      thumbnail: imgUrl as string,
      description: values.description,
      tags: values.tags,
      category: values.category,
      newsType: values.categoryType,
      status: values.status,
      priority: values.priority,
      author: singleNews.author,
    };

    try {
      let res;

      if (actionType === "post") {
        res = await draftToRePost({
          id: singleNews._id,
          data: newsData,
        }).unwrap();
      } else {
        res = await updateNews({ id: singleNews._id, newsData }).unwrap();
      }

      const message =
        actionType === "post"
          ? "News has been re-published successfully!"
          : "News has been updated successfully";

      if (res.success || res.message === "News has been added successfully") {
        Swal.fire({
          title: "successfully!",
          text: message,
          icon: "success",
        });
        setIsLoading(false);
        router.push("/dashboard/allNews");
      }
    } catch {
      const errorMessage =
        actionType === "post"
          ? "Failed to re-publish the news!"
          : "Failed to update the news!";
      Swal.fire({
        title: "News update failed",
        text: errorMessage,
        icon: "error",
      });

      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white shadow-lg w-full lg:w-[90%] xl:w-[70%] p-6 lg:p-10 space-y-10"
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
                        form.setValue("category", "");
                      }}
                      value={field.value || categoryType}
                      className="flex max-sm:flex-wrap items-center gap-5 mt-5 min-sm:gap-16"
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
          <div className="flex max-sm:flex-wrap  items-center gap-5">
            {/* news category */}
            <div className="w-full">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue=""
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
                          {categoryMap[categoryType]?.map((cat, idx) => (
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
                    <Select value={field.value} onValueChange={field.onChange}>
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
                      className="flex max-sm:flex-wrap items-center gap-5 mt-5 min-sm:gap-16"
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

          {/* news description */}
          <div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* submit button */}
          <div className="w-full">
            <Button
              type="submit"
              className="w-full text-xl font-medium news__title text-news-white-bg bg-news-dark p-7"
            >
              {isLoading
                ? "Loading..."
                : actionType === "update"
                ? "Update News"
                : "Post News"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditForm;
