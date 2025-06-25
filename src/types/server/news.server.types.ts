import { Document, Types } from 'mongoose';

// Define reusable types for enums to maintain consistency
export type NewsStatus = "published" | "unpublished";
export type NewsCategoryType = "news" | "life" | "list" | "magazine";
export type NewsPriority = "none" | "isFeatured" | "isEditorsPick" | "isBreaking";
export type NewsCategory = 
  | "world-news" | "innovation" | "billionaires" | "entrepreneurs" | "leadership" 
  | "investing" | "top-10" | "must-read" | "editors-picks" | "travel" | "lifestyle" 
  | "wellness" | "property" | "style" | "motors" | "cover-story" | "exclusive" 
  | "breaking-today";

export interface INews extends Document {
  title: string;
  thumbnail: string;
  slug: string;
  description: string;
  tags: string[];
  category: NewsCategory;
  status: NewsStatus;
  newsType: NewsCategoryType;
  priority: NewsPriority;
  author: Types.ObjectId;
  createdAt: Date; // Automatically added by timestamps
  updatedAt: Date; // Automatically added by timestamps
}