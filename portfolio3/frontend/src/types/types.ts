// export type Collaborator = {
//   user: {
//     id: string;
//     name: string;
//   };
//   createdAt: string;
// };

// export type Tag = {
//   id: string;
//   name: string;
// };

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
  image?: string;
  description: string;
  isPublic: boolean;
  createdAt: string;
  publishedAt: string;
  status: boolean;
  // authorId: string;
  // authorName: string;
  // tags: Tag[];
  // collaborators: Collaborator[];
};
