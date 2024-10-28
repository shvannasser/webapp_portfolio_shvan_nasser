export type Collaborator = {
  user: {
    id: string;
    name: string;
  };
  createdAt: string;
};

export type Tag = {
  id: string;
  name: string;
};

export type Project = {
  id: string;
  title: string;
  image?: string;
  publishedAt: string;
  isPublic: boolean;
  status: boolean;
  description: string;
  authorId: string;
  authorName: string;
  tags: Tag[];
  collaborators: Collaborator[];
};
