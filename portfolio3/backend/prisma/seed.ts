// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// // seed funksjoner
// const users = [
//   { name: "Alice" },
//   { name: "Bob" },
//   { name: "Charlie" },
//   { name: "David" },
//   { name: "Eve" },
// ];

// const projects = [
//   {
//     title: "Project One",
//     description: "Description for project one",
//     isPublic: true,
//   },
//   {
//     title: "Project Two",
//     description: "Description for project two",
//     isPublic: false,
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

// const createProjects = async () => {
//   const projectsPromises = projects.map(async (projects) => {
//     await prisma.project.create({
//       data: {
//         ...projects,
//       },
//     });
//   });

//   // [Promise, Promise, Promise, Promise, Promise, Promise, Promise, Promise]
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
