type ProjectObject = {
  id: string;
  title: string;
  description: string;
  createdAt: string | Date;
};

type ProjectArray = ProjectObject[];

const projects: ProjectArray = [
  {
    id: crypto.randomUUID(),
    title: "Project 1",
    description: "This is a project",
    createdAt: new Date("2024-01-01"),
  },
];
