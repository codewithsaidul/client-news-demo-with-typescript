import { INews } from "@/types/server/news.server.types";
import { model, models, Schema } from "mongoose";

const validCategories = [
  "world-news",
  "innovation",
  "billionaires",
  "entrepreneurs",
  "leadership",
  "investing",
  "top-10",
  "must-read",
  "editors-picks",
  "travel",
  "lifestyle",
  "wellness",
  "property",
  "style",
  "motors",
  "cover-story",
  "exclusive",
  "breaking-today",
];

const TrashNewsSchema = new Schema<INews & { originalId: Schema.Types.ObjectId }>(
  {
    originalId: {
      type: Schema.Types.ObjectId, // টাইপ হবে ObjectId
      ref: "News", // এটি 'News' মডেলকে নির্দেশ করছে (ঐচ্ছিক কিন্তু ভালো অভ্যাস)
      required: true, // এটি অবশ্যই থাকতে হবে
      unique: true, // প্রতিটি ট্র্যাশ আইটেম একটি ইউনিক মূল আইটেমকে নির্দেশ করবে
      index: true, // দ্রুত খোঁজার জন্য ইন্ডেক্স করা হলো
    },
    // News Title
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [10, "Title must be at least 10 characters"],
      trim: true, // Automatically remove whitespace from start and end
    },

    slug: String,

    // Thumbnail URL (string)
    thumbnail: {
      type: String,
      required: [true, "Thumbnail URL is required"],
    },

    // Description (textarea)
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [50, "Description must be at least 50 characters"],
    },

    // Tags (array of strings)
    tags: {
      type: [String],
      // Custom validation to ensure the array is not empty
      validate: {
        validator: function (v: unknown) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one tag is required",
      },
    },

    // Category (dropdown)
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: validCategories,
        message: "Invalid category selected",
      },
    },

    // Status (dropdown)
    status: {
      type: String,
      enum: ["published", "unpublished"],
      default: "unpublished", // Default status when a new document is created
    },

    // Category Type (radio group)
    newsType: {
      type: String,
      required: [true, "News type is required"],
      enum: ["news", "life", "list", "magazine"],
    },

    // Priority (radio group)
    priority: {
      type: String,
      enum: ["none", "isFeatured", "isEditorsPick", "isBreaking"],
      default: "none", // Default priority
    },

    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const TrashNews =
  models.TrashNews || model<INews & { originalId: Schema.Types.ObjectId }>("TrashNews", TrashNewsSchema);
