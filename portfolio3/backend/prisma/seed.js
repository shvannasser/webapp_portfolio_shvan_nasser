import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync("data/data.json", "utf-8"));
  console.log("Start seeding...");

  // Seed Users
  for (const user of data.users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        name: user.name,
      },
    });
  }

  // Seed Projects
  for (const project of data.projects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: {},
      create: {
        id: project.id,
        title: project.title,
        image: project.image,
        description: project.description,
        isPublic: project.isPublic,
        createdAt: new Date(project.createdAt),
        status: project.status,
        authorId: project.authorId,
      },
    });
  }

  // Seed Tags
  for (const tag of data.tags) {
    await prisma.projectTag.upsert({
      where: { id: tag.id },
      update: {},
      create: {
        id: tag.id,
        name: tag.name,
      },
    });
  }

  // Seed Project-Tag Relationships
  for (const projectTag of data.projectTags) {
    await prisma.project.update({
      where: { id: projectTag.projectId },
      data: {
        tags: {
          connect: { id: projectTag.tagId },
        },
      },
    });
  }

  // Seed Project Collaborators
  for (const collaborator of data.projectCollaborators) {
    await prisma.projectCollaborator.create({
      data: {
        createdAt: new Date(collaborator.createdAt),
        user: { connect: { id: collaborator.userId } },
        project: { connect: { id: collaborator.projectId } },
      },
    });
  }

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// // seed funksjoner

// const projects = [
//   {
//     title: "Project One",
//     description: "Description for project one",
//     isPublic: true,
//     status: false,
//   },
//   {
//     title: "Project Two",
//     description: "Description for project two",
//     isPublic: true,
//     status: false,
//   },
//   {
//     title: "Project Three",
//     description: "Description for project three",
//     isPublic: true,
//     status: false,
//   },
// ];

// const tags = [
//   { name: "JavaScript" },
//   { name: "TypeScript" },
//   { name: "React" },
//   { name: "Node.js" },
//   { name: "GraphQL" },
//   { name: "Prisma" },
//   { name: "PostgreSQL" },
//   { name: "MongoDB" },
// ];

// // const users = [
// //   { name: "Alice" },
// //   { name: "Bob" },
// //   { name: "Charlie" },
// //   { name: "David" },
// //   { name: "Eve" },
// // ];

// const createProjects = async () => {
//   const projectsPromises = projects.map(async (projects) => {
//     await prisma.project.create({
//       data: {
//         ...projects,
//       },
//     });
//   });

//   console.log(projectsPromises);
//   await Promise.all(projectsPromises);
// };

// // const createProjectTags = async () => {
// //   const projectTagsPromises = tags.map(async (tag) => {
// //     await prisma.projectTag.create({
// //       data: {
// //         ...tag,
// //       },
// //     });
// //   });
// //   console.log(projectTagsPromises);
// //   await Promise.all(projectTagsPromises);
// // };

// // const createUsers = async () => {
// //   const usersPromises = users.map(async (user) => {
// //     await prisma.user.create({
// //       data: {
// //         ...user,
// //       },
// //     });
// //   });

// //   console.log(usersPromises);
// //   await Promise.all(usersPromises);
// // };

// // const createUsersWithProjects = async () => {
// //   await Promise.all(
// //     users.map(async (users, index) => {
// //       await prisma.user.create({
// //         data: {
// //           ...users,
// //           projects: {
// //             create: {
// //               ...projects[index],
// //               tags: {
// //                 create: {
// //                   ...tags[index],
// //                 },
// //               },
// //             },
// //           },
// //         },
// //       });
// //     })
// //   );
// // };

// async function main() {
//   console.log("Start seeding...");
//   // kalle på seed funksjoner
//   await createProjects();
//   // await createUsers();
//   // await createProjectTags();
//   // await createUsersWithProjects();
//   console.log("Seeding finished.");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
