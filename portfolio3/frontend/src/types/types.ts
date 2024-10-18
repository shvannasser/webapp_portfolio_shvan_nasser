export type Project = {
  id: string;
  title: string;
  image?: string;
  publishedAt: string;
  isPublic: boolean;
  tags: string[];
  status: boolean;
  description: string;
};
