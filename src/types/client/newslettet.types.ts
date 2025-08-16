

export interface INewsletterResponse {
  data: INewsletter[]
  pagination: Pagination
}

export interface INewsletter {
  _id: string;
  firstname: string;
  lastname: string
  email: string;
  createdAt: Date;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  published: number;
  totalPages: number;
}


export type INewsletterParams = number