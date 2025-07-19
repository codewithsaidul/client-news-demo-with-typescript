import { INews } from "@/types/server/news.server.types";
import { slugifyUnique } from "@/utils/slugify";
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

const DraftNewsSchema = new Schema<INews & { originalId: Schema.Types.ObjectId }>(
  {
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

DraftNewsSchema.pre("save", async function (next) {
  // pre hook-এ সবসময় next() কল করা উচিত
  if (!this.isModified("title")) {
    return next();
  }
  
  try {
    // এখানে this.constructor ব্যবহার করা হয়েছে
    const DraftNewsModel = this.constructor as typeof Draft;

    async function isSlugExists(slug: string) {
      // "News.findOne" এর বদলে "NewsModel.findOne"
      const existing = await DraftNewsModel.findOne({ slug });
      return !!existing;
    }
  
    this.slug = await slugifyUnique(this.title, 50, isSlugExists);
    next();
  } catch {
    next();
  }
});

export const Draft = models.Draft || model<INews & { originalId: Schema.Types.ObjectId }>("Draft", DraftNewsSchema);
