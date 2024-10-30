export type Result<T> =
  | {
      success: true;
      data: T;
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
  image?: string;
  createdAt: string;
  publishedAt?: string;
  isPublic: boolean;
  status: boolean;
  description: string;
  // tags?: Tag[];
  // collaborators?: Collaborator[];
};

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
