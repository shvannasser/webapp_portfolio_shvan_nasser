export type ProjectReuse = {
  title: string;
  image?: string;
  description: string;
  isPublic: boolean;
  status: boolean;
};

export type Project = {
  id: string;
  title: string;
  image: string;
  description: string;
  isPublic: boolean;
  createdAt: string;
  publishedAt: string;
  status: boolean;
};
