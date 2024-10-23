import type { Pagination } from "../src/lib/query";

export type Result<T> =
  | {
      success: true;
      data: T;
      pagination?: Pagination;
    }
  | {
      success: false;
      error: {
        code: string;
        message: string;
      };
    };

export type Project = {
  id: string;
  title: string;
  img?: string;
  publishedAt: string;
  isPublic: boolean;
  status: boolean;
  tags?: string[];
  description: string;
};
