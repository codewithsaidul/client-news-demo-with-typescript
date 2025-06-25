export type Category =
  | "world-news"
  | "innovation"
  | "billionaires"
  | "entrepreneurs"
  | "leadership"
  | "investing"
  | "top-10"
  | "must-read"
  | "editors-picks"
  | "travel"
  | "lifestyle"
  | "wellness"
  | "property"
  | "style"
  | "motors"
  | "cover-story"
  | "exclusive"
  | "breaking-today";

export type Status = "published" | "unpublished";
export type CategoryType = "news" | "life" | "list" | "magazine";
export type Priority = "none" | "isFeatured" | "isEditorsPick" | "isBreaking";

export interface IAddNewsForm {
  title: string;
  thumbnail: string;
  description: string;
  tags: string[];
  category: Category;
  status: Status;
  newsType: CategoryType;
  priority: Priority;
  author: {
    name?: string;
    email?: string;
  };
}

export interface INews {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string; // image URL from server
  description: string;
  tags: string[];
  category: Category;
  newsType: CategoryType;
  status: Status;
  priority: Priority;
  // author: {
  //   name?: string;
  //   email?: string;
  // };
  createdAt: string;
}


export interface INewsApiResponse {
  success: boolean;
  message: string;
  data: INews[]; // An array of news items
  total: number; // Example: for pagination
  pages: number; // Example: for pagination
}



// Describes the arguments you can pass to the query
export interface IGetAllNewsParams {
  page?: number;
  category?: string;
  newsType?: string;
  priority?: string;
  authorEmail?: string;
}