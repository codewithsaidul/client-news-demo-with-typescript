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

export interface BaseNews {
  title: string;
  slug?: string;
  thumbnail: string;
  category: Category;
  newsType: CategoryType;
  description?: string;
  tags?: string[];
  status?: Status;
  priority?: Priority;
  author?: {
    name?: string;
    email?: string;
  };
  createdAt?: Date;
}

export interface IAddNewsForm extends BaseNews {
  description: string;
  tags: string[];
  status: Status;
  priority: Priority;
  author: {
    name?: string;
    email?: string;
  };
  createdAt?: Date;
}

export interface INews extends BaseNews {
  _id: string;
  slug: string;
  description: string;
  tags: string[];
  status: Status;
  priority: Priority;
  author: {
    name?: string;
    email?: string;
  };
  createdAt: Date;
}

export interface FeaturedNews {
  featuredNews: INews[];
}

export interface HomePageSection extends BaseNews {
  slug: string;
  author: {
    name?: string;
    email?: string;
  };
  createdAt: Date;
}

export interface BreakingBannerProps {
  news: HomePageSection;
}
export interface HomeNewsProps {
  allNews: HomePageSection[];
}

export interface FeaturedBottom extends BaseNews {
  slug: string;
  author: {
    name?: string;
    email?: string;
  };
}

export interface EditorPick extends BaseNews {
  _id: string;
  slug: string;
}

export interface IArticaleCard extends BaseNews {
  _id: string;
  slug: string;
  description: string;
  author: {
    name?: string;
    email?: string;
  };
}

export interface PageCardProps {
  allNews: IArticaleCard[];
}

export interface PageHeroSection extends BaseNews {
  slug: string;
  description: string;
  author: {
    name?: string;
    email?: string;
  };
}

export interface PageHeroProps {
  news: PageHeroSection;
}

export interface INewsDetails extends BaseNews {
  description: string;
  tags: string[];
  author: {
    name?: string;
    email?: string;
  };
}

export interface INewsApiResponse {
  success: boolean;
  message: string;
  data: INews[]; // An array of news items
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    published: number;
    unpublished: number;
  };
}

export interface OverviewNews extends BaseNews {
  _id: string;
  description: string;
  createdAt: Date;
  status: Status
}

// Describes the arguments you can pass to the query
export interface IGetAllNewsParams {
  page?: number;
  category?: string;
  newsType?: string;
  priority?: string;
  authorEmail?: string;
}
